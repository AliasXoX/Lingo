'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Verb } from '../../lib/type';
import { VerbDictionary } from '@/components/organisms/VerbDictionary/VerbDictionary';
import { getVerbsByOrder, editVerb, addVerb, deleteVerb } from '../actions/verbs';

interface VerbsWrapperProps {
    userId: number;
    initVerbs: Array<Verb>;
    verbsCount: number;
}

export function VerbsWrapper({
    userId,
    initVerbs,
    verbsCount
}: VerbsWrapperProps) {

    const router = useRouter();

    const [verbs, setVerbs] = useState(initVerbs);
    const [page, setPage] = useState(0);

    const disableNext = (page + 1) * 10 >= verbsCount;
    async function handleNextPage() {
        if (disableNext) return;
        const newPage = page + 1;
        // Fetch the next page of verbs
        await getVerbsByOrder(userId, newPage * 10, 10).then(result => {
            if (result.success) {
                setVerbs(result.verbs as Array<Verb>);
            }
        });

        setPage(newPage);
    }

    const disablePrev = page === 0;
    async function handlePrevPage() {
        if (disablePrev) return;
        const newPage = page - 1;
        // Fetch the previous page of verbs
        await getVerbsByOrder(userId, newPage * 10, 10).then(result => {
            if (result.success) {
                setVerbs(result.verbs as Array<Verb>);
            }
        });
        setPage(newPage);
    }

    async function submitEditAction (
        prevState: { success: boolean; error?: string } | null,
        formData: FormData
    ) {
        const result = await editVerb(userId, formData);
        if (result.success) {
            // After editing the verb, we should refresh the page to show the updated verb in the dictionary
            const refreshResult = await getVerbsByOrder(userId, page * 10, 10);
            if (refreshResult.success) {
                setVerbs(refreshResult.verbs as Array<Verb>);
            }
        }
        return result;
    }
    const [editFormState, editFormAction] = useFormState(submitEditAction, null);

    async function submitAddAction (
        prevState: { success: boolean; error?: string } | null,
        formData: FormData
    ) {
        const result = await addVerb(userId, formData);
        if (result.success) {
            // After adding the verb, we should refresh the page to show the new verb in the dictionary
            const refreshResult = await getVerbsByOrder(userId, page * 10, 10);
            if (refreshResult.success) {
                setVerbs(refreshResult.verbs as Array<Verb>);
            }
        }
        return result;
    }
    const [addFormState, addFormAction] = useFormState(submitAddAction, null);

    async function handleDeleteAction(verb: { infinitive: string; mode: string; tense: string }) {
        const result = await deleteVerb(userId, verb.infinitive, verb.mode, verb.tense);
        if (result.success) {
            // After deleting the verb, we should refresh the page to remove the deleted verb from the dictionary
            const refreshResult = await getVerbsByOrder(userId, page * 10, 10);
            if (refreshResult.success) {
                setVerbs(refreshResult.verbs as Array<Verb>);
            }
        }
        return result;
    }

    return (
        <main className="flex-1 flex-col items-center justify-between px-56">
            <VerbDictionary
                verbs={verbs}
                page={page}
                nextPage={handleNextPage}
                prevPage={handlePrevPage}
                disableNext={disableNext}
                disablePrev={disablePrev}
                editAction={editFormAction}
                deleteAction={handleDeleteAction}
                addAction={addFormAction}
                handleTrain={() => router.push('/conjugation')}
            />
        </main>
    );
}