import { verifySession } from "@/lib/dal";
import { DictionaryWrapper } from "./DictionaryWrapper";
import { getWordsByOrder, getTotalWordsCount } from "../actions/words";

export default async function DictionaryPage() {
  const session = await verifySession();
  const userId = Number(session?.userId) || 0;

  const order = 'it'; // or 'fr', depending on how you want to order the dictionary

  const initWordsResult = await getWordsByOrder(userId, order, 0,100);

  const wordsCountResult = await getTotalWordsCount(userId);

  return (
    <main className="flex-1 flex-col items-center justify-between px-56">
      <DictionaryWrapper 
        userId={userId}
        initOrder={order}
        initWords={initWordsResult.success ? initWordsResult.words : undefined}
        wordsCount={wordsCountResult.success ? (wordsCountResult.total ?? 0) : 0}
      />
    </main>
  );
}
