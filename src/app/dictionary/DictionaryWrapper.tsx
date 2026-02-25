'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { Dictionary } from '@/components/organisms/Dictionary/Dictionary';
import { getWordsByOrder, addWord, deleteWord, editWord } from '../actions/words';

interface DictionaryWrapperProps {
    userId: number;
    order: string;
    initWords?: Array<{
        it: string;
        fr: string;
    }>;
    wordsCount: number;
}

export function DictionaryWrapper({
    userId,
    order,
    initWords,
    wordsCount
}: DictionaryWrapperProps) {

    const [words, setWords] = useState(initWords || []);
    const [page, setPage] = useState(0);

    async function submitAddAction (
        prevState: { success: boolean; error?: string } | null,
        formData: FormData
    ) {
        const result = await addWord(userId, formData);
        if (result.success) {
            // After adding the word, we should refresh the page to show the new word in the dictionary
            const refreshResult = await getWordsByOrder(userId, order, page * 100, 100);
            if (refreshResult.success) {
                setWords(refreshResult.words as Array<{ it: string; fr: string }>);
            }
        }
        return result;
    }
    const [addFormState, addFormAction] = useFormState(submitAddAction, null);

    async function submitEditAction (
        prevState: { success: boolean; error?: string } | null,
        formData: FormData
    ) {
        const it = formData.get("it") as string;
        const fr = formData.get("fr") as string;
        const originalIt = formData.get("originalIt") as string;
        const originalFr = formData.get("originalFr") as string;

        const result = await editWord(userId, originalIt, originalFr, it, fr);
        if (result.success) {
            // After editing the word, we should refresh the page to show the updated word in the dictionary
            const refreshResult = await getWordsByOrder(userId, order, page * 100, 100);
            if (refreshResult.success) {
                setWords(refreshResult.words as Array<{ it: string; fr: string }>);
            }
        }
        return result;
    }
    const [editFormState, editFormAction] = useFormState(submitEditAction, null);

    async function handleDeleteAction(word: { it: string; fr: string }) {
        const result = await deleteWord(userId, word.it, word.fr);
        if (result.success) {
            // After deleting the word, we should refresh the page to remove the deleted word from the dictionary
            const refreshResult = await getWordsByOrder(userId, order, page * 100, 100);
            if (refreshResult.success) {
                setWords(refreshResult.words as Array<{ it: string; fr: string }>);
            }
        }
        return result;
    }

    async function handleNextPage() {
        const nextPage = page + 1;
        const result = await getWordsByOrder(userId, order, nextPage * 100, 100);
        if (result.success) {
            setWords(result.words as Array<{ it: string; fr: string }>);
            setPage(nextPage);
        }
    }
    const disableNext = (page + 1) * 100 >= wordsCount;

    async function handlePrevPage() {
        const nextPage = Math.max(0, page - 1);
        const result = await getWordsByOrder(userId, order, nextPage * 100, 100);
        if (result.success) {
            setWords(result.words as Array<{ it: string; fr: string }>);
            setPage(nextPage);
        }
    }
    const disablePrev = page === 0;

    return (
    <main className="flex-1 flex-col items-center justify-between px-56">
        <Dictionary
            words={words}
            page={page}
            nextPage={handleNextPage}
            prevPage={handlePrevPage}
            disableNext={disableNext}
            disablePrev={disablePrev}
            editAction={editFormAction}
            deleteAction={handleDeleteAction}
            addAction={addFormAction}
        />
    </main>
    );
}