
import React from 'react';
import { Button } from '../../atoms/Button/Button';

export interface LearnPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** What background color to use */
  backgroundColor?: string;
  mode: string;
  handleChangeMode?: () => void;
  boxes: Array<{
    rest: number;
    total: number;
  }>;
  selectedBox: number;
  setSelectedBox: (index: number) => void;
  inputWord: string;
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
export const LearnPanel = ({
  backgroundColor,
  mode,
  handleChangeMode,
  boxes,
  selectedBox,
  setSelectedBox,
  inputWord,
  formAction,
  state,
  className = '',
  ...props
}: LearnPanelProps) => {

  return (
    <div
      className={"relative flex-1 flex w-full bg-[var(--color-neutral-lightest)] " + className}
      style={{ backgroundColor : backgroundColor }}
      {...props}
    >
      <div className="absolute top-5 right-5 flex gap-2">
        <button className={`text-white font-bold py-2 px-4 rounded-lg cursor-pointer ${mode === "it" ? "bg-[var(--color-action-dark)] hover:bg-[var(--color-action-darker)]" : "bg-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-darker)]"}`} onClick={() => mode !== "it" && handleChangeMode && handleChangeMode()}>
          FR to IT
        </button>
        <button className={`text-white font-bold py-2 px-4 rounded-lg cursor-pointer ${mode === "fr" ? "bg-[var(--color-action-dark)] hover:bg-[var(--color-action-darker)]" : "bg-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-darker)]"}`} onClick={() => mode !== "fr" && handleChangeMode && handleChangeMode()}>
          IT to FR
        </button>
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
        <div className="flex flex-col w-1/2 gap-2">
          <label htmlFor='translate'>Translate the following word:</label>
          <input
            className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full pointer-events-none"
            type="text"
            readOnly
            name='translate'
            value={inputWord}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <label htmlFor='answer'>Your answer:</label>
          <input
            className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full"
            type="text"
            name='answer'
            required
          />
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
