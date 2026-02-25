import { verifySession } from "@/lib/dal";
import { LearnPanelWrapper } from "./LearnPanelWrapper";
import { getBoxCount, getNextWord } from "@/app/actions/words";


export default async function Learn() {
  const session = await verifySession();

  const mode = "it"; // or "fr", this should be determined by user selection
  const userId = Number(session?.userId) || 0;

  const boxesCountResults = []
  for (let i = 0; i < 8; i++) {
    boxesCountResults.push(await getBoxCount(userId, i));
  }
  const initBoxes = [
    { rest: boxesCountResults[0].success && boxesCountResults[0].rest ? boxesCountResults[0].rest : 0, total: boxesCountResults[0].success && boxesCountResults[0].total ? boxesCountResults[0].total : 0, selected: true },
    { rest: boxesCountResults[1].success && boxesCountResults[1].rest ? boxesCountResults[1].rest : 0, total: boxesCountResults[1].success && boxesCountResults[1].total ? boxesCountResults[1].total : 0, selected: false },
    { rest: boxesCountResults[2].success && boxesCountResults[2].rest ? boxesCountResults[2].rest : 0, total: boxesCountResults[2].success && boxesCountResults[2].total ? boxesCountResults[2].total : 0, selected: false },
    { rest: boxesCountResults[3].success && boxesCountResults[3].rest ? boxesCountResults[3].rest : 0, total: boxesCountResults[3].success && boxesCountResults[3].total ? boxesCountResults[3].total : 0, selected: false },
    { rest: boxesCountResults[4].success && boxesCountResults[4].rest ? boxesCountResults[4].rest : 0, total: boxesCountResults[4].success && boxesCountResults[4].total ? boxesCountResults[4].total : 0, selected: false },
    { rest: boxesCountResults[5].success && boxesCountResults[5].rest ? boxesCountResults[5].rest : 0, total: boxesCountResults[5].success && boxesCountResults[5].total ? boxesCountResults[5].total : 0, selected: false },
    { rest: boxesCountResults[6].success && boxesCountResults[6].rest ? boxesCountResults[6].rest : 0, total: boxesCountResults[6].success && boxesCountResults[6].total ? boxesCountResults[6].total : 0, selected: false },
  ];

  const initWordResult = await getNextWord(userId, 0, mode, []);



  return (
    <main className="flex-1 flex flex-col items-center justify-between px-56 pb-3">
        <div className="flex flex-1 w-full bg-[var(--color-neutral-lightest)]">
          <LearnPanelWrapper
            mode={mode}
            userId={userId}
            initBoxes={initBoxes}
            initWord={initWordResult.success ? initWordResult.word : ""}
          />
        </div>
    </main>
  );
}
