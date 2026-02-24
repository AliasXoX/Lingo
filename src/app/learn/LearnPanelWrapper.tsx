'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { LearnPanel } from '@/components/organisms/LearnPanel/LearnPanel';
import { submitAnswer, getNextWord } from '@/app/actions/words';

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
  const [update, setUpdate] = useState(true);
  
  const [state, formAction] = useFormState(
    submitAnswer.bind(null, mode, userId, update),
    null
  );

  useEffect(() => {
    const fetchNextWord = async () => {
      const result = await getNextWord(userId, selectedBox, mode, []);
      if (result.success) {
        setInputWord(result.word);
      }
    };
    fetchNextWord();
  }, [selectedBox, userId, mode]);

  return (
    <LearnPanel
      boxes={boxes}
      selectedBox={selectedBox}
      setSelectedBox={setSelectedBox}
      inputWord={inputWord}
      formAction={formAction}
      state={state}
    />
  );
}