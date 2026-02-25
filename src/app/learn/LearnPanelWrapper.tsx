'use client';

import React from 'react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { LearnPanel } from '@/components/organisms/LearnPanel/LearnPanel';
import { submitAnswer, getNextWord, getBoxCount } from '@/app/actions/words';

interface LearnPanelWrapperProps {
  mode: string;
  userId: number;
  initBoxes: Array<{
    rest: number;
    total: number;
  }>;
  initWord: string;
}

export function LearnPanelWrapper({ mode, userId, initBoxes, initWord }: LearnPanelWrapperProps) {
  const [selectedBox, setSelectedBox] = useState(0);
  const [boxes, setBoxes] = useState(initBoxes);
  const [inputWord, setInputWord] = useState(initWord);
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
    const result = await submitAnswer(mode, userId, update, null, formData);
    if (result.success) {
      // After submitting the answer, we should get the next word if answer is correct
      if (result.correct) {
        const nextWord = await getNextWord(userId, selectedBox, mode, []);
        if (nextWord.success) {
          setInputWord(nextWord.word);
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
    const result = await getNextWord(userId, newBox, mode, []);
    if (result.success) {
      setInputWord(result.word);
    }
  }

  return (
    <LearnPanel
      boxes={boxes}
      selectedBox={selectedBox}
      setSelectedBox={handleChangeBox}
      inputWord={inputWord}
      formAction={formAction}
      state={state}
    />
  );
}