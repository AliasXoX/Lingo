
import React, { useState } from 'react';

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
  handleSkip?: () => Promise<string[] | void>;
  handleNext?: () => void;
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
  handleSkip,
  handleNext,
  className = '',
  ...props
}: LearnPanelProps) => {

  const [skip, setSkip] = useState<string[] | null>(null);

  return (
    <div
      className={"relative flex-1 flex w-full bg-[var(--color-neutral-lightest)] " + className}
      style={{ backgroundColor : backgroundColor }}
      {...props}
    >
      <div className="absolute top-5 right-5 flex gap-2 z-10">
        <button className={`text-white text-sm md:text-base font-bold py-2 px-4 rounded-lg cursor-pointer ${mode === "it" ? "bg-[var(--color-action-dark)] hover:bg-[var(--color-action-darker)]" : "bg-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-darker)]"}`} onClick={() => mode !== "it" && handleChangeMode && handleChangeMode()} disabled={ skip !== null }>
          FR to IT
        </button>
        <button className={`text-white text-sm md:text-base font-bold py-2 px-4 rounded-lg cursor-pointer ${mode === "fr" ? "bg-[var(--color-action-dark)] hover:bg-[var(--color-action-darker)]" : "bg-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-darker)]"}`} onClick={() => mode !== "fr" && handleChangeMode && handleChangeMode()} disabled={ skip !== null }>
          IT to FR
        </button>
      </div>
      <div className="flex flex-col items-center justify-between h-full w-1/4 md:text-2xl font-bold text-gray-900">
        {boxes.map((box, index) => (
          <div key={index} className={`flex flex-1 w-full flex-col items-center justify-center shadow-md border-2 cursor-pointer ${selectedBox === index ? 'border-[var(--color-primary)] bg-amber-500 hover:bg-amber-600' : 'border-gray-300 bg-white hover:bg-[var(--color-neutral-light)]'}`} onClick={() => setSelectedBox(index)}>
            <span className="md:text-5xl font-bold">{`Box ${index + 1}`}</span>
            <span>{`${box.rest} / ${box.total}`}</span>
          </div>
        ))}
      </div>
      <form action={formAction} className="relative flex-1 flex flex-col items-center justify-center gap-5 text-center text-lg md:text-2xl">
        <div className="absolute top-5 left-5 flex">
          {!skip && (
            <div onClick={async () => {
              const skipped = await handleSkip?.();
              setSkip(skipped || null);
            }} className="flex md:w-auto bg-[var(--color-danger-light)] hover:bg-[var(--color-danger-dark)] font-bold py-1 px-3 rounded-lg cursor-pointer">
              <span className="text-xs md:text-lg text-[var(--color-neutral-lightest)]">Skip</span>
            </div>
          )}
          {skip && (
            <div onClick={() => {
              handleNext?.();
              setSkip(null);
            }} className="flex md:w-auto bg-gray-300 hover:bg-gray-400 font-bold py-1 px-3 rounded-lg cursor-pointer">
              <span className="text-xs md:text-lg text-gray-500">Next</span>
            </div>
          )}
        </div>
        <div className="flex flex-col md:w-1/2 gap-2 px-1 md:px-0">
          <label htmlFor='translate'>Translate the following word:</label>
          <input
            className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full pointer-events-none"
            type="text"
            readOnly
            name='translate'
            value={inputWord}
          />
        </div>
        <div className="flex flex-col md:w-1/2 gap-2 px-1 md:px-0">
          <label htmlFor='answer'>Your answer:</label>
          {!skip && (<input
            className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full"
            type="text"
            name='answer'
            required
          />)}
          {skip && (<input
            className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full"
            type="text"
            name='answer'
            disabled
            value={skip.join(" || ")}
          />)}
        </div>
        <button
          type="submit"
          className="bg-[var(--color-action-dark)] hover:bg-[var(--color-action-darker)] text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          disabled={skip !== null}
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
