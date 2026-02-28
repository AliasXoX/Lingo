
import React from 'react';
import { Verb, modeToPronouns } from '../../../lib/type';

export interface ConjugationPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** What background color to use */
  backgroundColor?: string;
  boxes: Array<{
    rest: number;
    total: number;
  }>;
  selectedBox: number;
  setSelectedBox: (index: number) => void;
  inputVerb: Verb; // Infinitive form of the verb to be conjugated
  formAction?: (formData: FormData) => void;
  state: {
    success: boolean;
    correct: boolean;
    error?: undefined;
  } | {
      success: boolean;
      error: string;
      correct?: undefined;
  } | null;
}

/** Primary UI component for user interaction */
export const ConjugationPanel = ({
  backgroundColor,
  boxes,
  selectedBox,
  setSelectedBox,
  inputVerb,
  formAction,
  state,
  className = '',
  ...props
}: ConjugationPanelProps) => {

  const pronouns = modeToPronouns(inputVerb.mode);

  return (
    <div
      className={"relative flex-1 flex w-full bg-[var(--color-neutral-lightest)] " + className}
      style={{ backgroundColor : backgroundColor }}
      {...props}
    >
      <div className="absolute top-5 left-1/4 flex flex-col gap-2 ml-5">
        <span className="text-2xl capitalize">Verb: {inputVerb.infinitive}</span>
        <span className="text-lg capitalize">Tense: {inputVerb.tense} | {inputVerb.mode}</span>
      </div>
      <div className="flex flex-col items-center justify-between h-full w-1/4 text-2xl font-bold text-gray-900">
        {boxes.map((box, index) => (
          <div key={index} className={`flex flex-1 w-full flex-col items-center justify-center shadow-md border-2 cursor-pointer ${selectedBox === index ? 'border-[var(--color-primary)] bg-amber-500 hover:bg-amber-600' : 'border-gray-300 bg-white hover:bg-[var(--color-neutral-light)]'}`} onClick={() => setSelectedBox(index)}>
            <span className="text-5xl font-bold">{`Box ${index + 1}`}</span>
            <span>{`${box.rest} / ${box.total}`}</span>
          </div>
        ))}
      </div>
      <form action={formAction} className="flex-1 flex flex-col items-center justify-center gap-5 text-2xl">
        <div className="grid grid-flow-col grid-rows-6 gap-10 w-1/2 px-5">
            {pronouns.map((pronoun, index) => (
                <label key={`pronoun-${index}`} htmlFor={`conjugation-${index}`} className="capitalize flex items-center justify-end text-nowrap">{pronoun}</label>
            ))}
            {pronouns.map((_, index) => (
                <input key={`input-${index}`} name={`conjugation-${index}`} type="text" className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" />
            ))}
            
        </div>
        <button
          className="bg-[var(--color-action-dark)] hover:bg-[var(--color-action-darker)] text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
        >
          Submit Answer
        </button>

        {state?.error && <span className="text-red-500">{state.error}</span>}
        {state?.success && state.correct && <span className="text-green-500">Correct!</span>}
        {state?.success && state.correct === false && <span className="text-red-500">Incorrect!</span>}
      </form>
    </div>
  );
};
