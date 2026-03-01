'use client';

import React from 'react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { ConjugationPanel } from '@/components/organisms/ConjugationPanel/ConjugationPanel';
import { getBoxCount, getNextVerb, submitAnswer } from '../actions/verbs';
import { Mode, Tense } from '@/lib/type';

interface ConjugationPanelWrapperProps {
  userId: number;
  initBoxes: Array<{
    rest: number;
    total: number;
  }>;
  initVerb?: { infinitive: string; mode: Mode; tense: Tense };
}

export function ConjugationPanelWrapper({ userId, initBoxes, initVerb }: ConjugationPanelWrapperProps) {
  const [selectedBox, setSelectedBox] = useState(0);
  const [boxes, setBoxes] = useState(initBoxes);
  const [inputVerb, setInputVerb] = useState(initVerb);
  const [update, setUpdate] = useState(true); // update box after submit if true

  async function updateBoxes() {
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
    setBoxes(initBoxes);
  }

  async function submitAction(
    prevState: { success: boolean; correct?: boolean; error?: string } | null,
    formData: FormData
  ) {
    if (!inputVerb) {
      return { success: false, error: "No verb to conjugate" };
    }
    const result = await submitAnswer(userId, inputVerb.infinitive, inputVerb.mode, inputVerb.tense, update, null, formData);
    if (result.success) {
      // After submitting the answer, we should get the next word if answer is correct
      if (result.correct) {
        const nextVerb = await getNextVerb(userId, selectedBox);
        if (nextVerb.success) {
          setInputVerb(nextVerb.verb as { infinitive: string; mode: Mode; tense: Tense });
          setUpdate(true);
        }
      }
      else {
        setUpdate(false);
      }
      await updateBoxes();
    }
    return result;
  }
  
  const [state, formAction] = useFormState(submitAction, null);
  
  async function handleChangeBox(newBox: number) {
    setSelectedBox(newBox);
    const result = await getNextVerb(userId, newBox);
    if (result.success) {
      setInputVerb(result.verb as { infinitive: string; mode: Mode; tense: Tense });
    }
  }

  return (
    <ConjugationPanel
      boxes={boxes}
      selectedBox={selectedBox}
      setSelectedBox={handleChangeBox}
      inputVerb={inputVerb}
      formAction={formAction}
      state={state}
    />
  );
}