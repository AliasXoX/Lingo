import { verifySession } from "@/lib/dal";
import { VerbsWrapper } from "./VerbsWrapper";
import { getVerbsByOrder, getTotalVerbsCount } from "../actions/verbs";

export default async function DictionaryPage() {
  const session = await verifySession();
  const userId = Number(session?.userId) || 0;

  const initVerbsResult = await getVerbsByOrder(userId, 0,10);

  const verbsCountResult = await getTotalVerbsCount(userId);

  return (
    <main className="flex-1 flex-col items-center justify-between px-56">
      <VerbsWrapper 
        userId={userId}
        initVerbs={initVerbsResult.success ? (initVerbsResult.verbs ?? []) : []}
        verbsCount={verbsCountResult.success ? (verbsCountResult.total ?? 0) : 0}
      />
    </main>
  );
}
