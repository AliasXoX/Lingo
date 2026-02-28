
import React, { useState } from 'react';
import { ModalWrapper } from '@/components/molecules/ModalWrapper/ModalWrapper';
import { Icon } from '@/components/atoms/Icon/Icon';
import { Verb, ConjugatedVerb, modeToPronouns, Mode, Tense } from '../../../lib/type';
import { DropdownWrapper } from '@/components/molecules/DropdownWrapper/DropdownWrapper';

export interface VerbDictionaryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** What background color to use */
    backgroundColor?: string;
    verbs: Verb[];
    page: number;
    nextPage?: () => void;
    prevPage?: () => void;
    disableNext?: boolean;
    disablePrev?: boolean;
    editAction?: (formData: FormData) => void;
    deleteAction?: (verb: { infinitive: string, tense: string, mode: string}) => void;
    addAction?: (formData: FormData) => void;
    handleTrain?: () => void;
}

const EditModal = ({ verb, isOpen, editAction, onClose }: { verb: ConjugatedVerb; isOpen: boolean; editAction?: (formData: FormData) => void; onClose?: () => void }) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await editAction?.(formData);
        onClose?.();
    };

    const pronouns = modeToPronouns(verb.mode);

    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="relative flex flex-col items-center justify-center rounded-2xl bg-white px-3 py-2">
                <span className="font-bold text-xl mb-5">Edit Verb</span>
                <button className="absolute top-2 right-2 p-1 rounded-full cursor-pointer hover:bg-[var(--color-neutral-lighter)]" onClick={() => onClose?.()}>
                    <Icon name="cross" className="w-5"/>
                </button>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
                    <input type="hidden" name="infinitive" value={verb.infinitive} />
                    <input type="hidden" name="mode" value={verb.mode} />
                    <input type="hidden" name="tense" value={verb.tense} />
                    <div className="grid grid-flow-col grid-rows-6 gap-5">
                        {pronouns.map((pronoun, index) => (
                            <label key={`pronoun-${index}`} htmlFor={`conjugation-${index}`} className="capitalize flex items-center justify-end text-nowrap">{pronoun}</label>
                        ))}
                        {pronouns.map((_, index) => (
                            <input key={`input-${index}`} name={`conjugation-${index}`} type="text" className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" required defaultValue={verb.conjugation[index] || ''} />
                        ))}
                    </div>
                    <button type="submit" className="bg-[var(--color-action-dark)] px-3 py-1 rounded-lg cursor-pointer text-md text-white font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)] mt-2">
                        Save
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}

const Delete = ({ verb, isOpen, deleteAction, onClose }: { verb: { infinitive: string; tense: string; mode: string }; isOpen: boolean; deleteAction?: (verb: { infinitive: string; tense: string; mode: string }) => void; onClose?: () => void }) => {
    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="relative flex flex-col items-center justify-center rounded-2xl bg-white px-3 py-2">
                <span className="font-bold text-xl">Delete Verb</span>
                <button className="absolute top-2 right-2 p-1 rounded-full cursor-pointer hover:bg-[var(--color-neutral-lighter)]" onClick={() => onClose?.()}>
                    <Icon name="cross" className="w-5"/>
                </button>
                <p className="mt-2">Are you sure you want to delete this verb?</p>
                <p className="font-bold">{`${verb.infinitive} - ${verb.tense} - ${verb.mode}`}</p>
                <div className="flex gap-3 mt-3">
                    <button 
                        className="bg-[var(--color-danger)] px-3 py-1 rounded-lg cursor-pointer text-md text-white font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)]"
                        onClick={async () => {
                            await deleteAction?.(verb);
                            onClose?.();
                        }}
                    >
                        Confirm
                    </button>
                    <button 
                        className="bg-[var(--color-neutral-dark)] px-3 py-1 rounded-lg cursor-pointer text-md text-white font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-neutral-darker)]"
                        onClick={() => onClose?.()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}

const AddModal = ({ isOpen, addAction, onClose }: { isOpen: boolean; addAction?: (formData: FormData) => void; onClose?: () => void }) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await addAction?.(formData);
        onClose?.();
    };

    const tenseForMode = (mode: Mode) => {
        switch (mode) {
            case 'indicativo':
                return ['presente', 'imperfetto', 'passato prossimo', 'futuro', 'trapassato prossimo', 'passato remoto', 'trapassato remoto', 'futuro anteriore'];
            case 'congiuntivo':
                return ['presente', 'imperfetto', 'passato', 'trapassato'];
            case 'condizionale':
                return ['presente', 'passato'];
            case 'imperativo':
                return ['presente'];
            case 'gerundio':
                return ['presente', 'passato'];
            case 'participio':
                return ['presente', 'passato'];
        }
    }

    const [mode, setMode] = useState<Mode>('indicativo');

    const [tense, setTense] = useState<Tense>('presente');

    const pronouns = modeToPronouns(mode);

    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="relative flex flex-col items-center justify-center rounded-2xl bg-white px-3 py-2">
                <span className="font-bold text-xl">Add Word</span>
                <button className="absolute top-2 right-2 p-1 rounded-full cursor-pointer hover:bg-[var(--color-neutral-lighter)]" onClick={() => onClose?.()}>
                    <Icon name="cross" className="w-5"/>
                </button>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="infinitive" className="block text-sm font-medium text-gray-700">Infinitive</label>
                        <input required type="text" name="infinitive" className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Mode</label>
                        <select required name="mode" className="capitalize border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" onChange={(e) => setMode(e.target.value as Mode)}>
                            <option value="indicativo">Indicativo</option>
                            <option value="congiuntivo">Congiuntivo</option>
                            <option value="condizionale">Condizionale</option>
                            <option value="imperativo">Imperativo</option>
                            <option value="gerundio">Gerundio</option>
                            <option value="participio">Participio</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="tense" className="block text-sm font-medium text-gray-700">Tense</label>
                        <select required name="tense" className="capitalize border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" onChange={(e) => setTense(e.target.value as Tense)}>
                            {tenseForMode(mode)?.map(tense => (
                                <option key={tense} value={tense}>{tense}</option>
                            ))}
                        </select>
                    </div>
                    {tense && (
                        <div className="grid grid-flow-col grid-rows-6 gap-5">
                            {pronouns.map((pronoun, index) => (
                                <label key={`pronoun-${index}`} htmlFor={`conjugation-${index}`} className="capitalize flex items-center justify-end text-nowrap">{pronoun}</label>
                            ))}
                            {pronouns.map((_, index) => (
                                <input key={`input-${index}`} name={`conjugation-${index}`} type="text" className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" required />
                            ))}
                            
                        </div>
                    )}
                    <button type="submit" className="bg-[var(--color-action-dark)] px-3 py-1 rounded-lg cursor-pointer text-md text-white font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)] mt-2">
                        Add
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}

/** Primary UI component for user interaction */
export const VerbDictionary = ({
  backgroundColor,
  verbs,
  page,
  nextPage,
  prevPage,
  disableNext,
  disablePrev,
  editAction,
  deleteAction,
  addAction,
  handleTrain,
  className = '',
  ...props
}: VerbDictionaryProps) => {

  const modes = ['indicativo', 'condizionale', 'congiuntivo', 'imperativo', 'gerundio', 'participio']

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editVerb, setEditVerb] = useState<ConjugatedVerb>({ infinitive: '', tense: 'presente', mode: 'indicativo', conjugation: [] });
  const [deleteVerb, setDeleteVerb] = useState<{ infinitive: string; tense: string; mode: string } >({ infinitive: '', tense: 'presente', mode: 'indicativo' });

  function handleEdit(verb: ConjugatedVerb) {
    setEditVerb(verb);
    setIsEditModalOpen(true);
  }

  function handleDelete(verb: { infinitive: string; tense: string; mode: string }) {
    setDeleteVerb(verb);
    setIsDeleteModalOpen(true);
  }

  return (
    <div
      className={"relative flex-1 flex flex-col w-full bg-[var(--color-neutral-lightest)] px-3 py-2 " + className}
      style={{ backgroundColor : backgroundColor }}
      {...props}
    >
        <div className="flex justify-between items-center">
            <button 
                className="bg-[var(--color-action-dark)] px-5 py-1 rounded-lg cursor-pointer text-xl text-white text-center font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)]"
                onClick={() => setIsAddModalOpen(true)}
            >
               + Add Verb
            </button>
            <div className="flex items-center gap-5 ml-5">
                <span onClick={handleTrain} className="cursor-pointer hover:underline font-[family-name:var(--font-header)] text-xl font-bold">Train</span>
                <button 
                    className={`flex items-center justify-center px-3 py-1 rounded-lg text-xl font-[family-name:var(--font-header)] font-bold ${disablePrev ? 'bg-[var(--color-neutral-lighter)] text-[var(--color-neutral-dark)]' : 'cursor-pointer hover:bg-[var(--color-neutral-lighter)] bg-[var(--color-neutral-light)]'}`}
                    onClick={prevPage}
                    disabled={disablePrev}
                >
                    &lt;
                </button>
                <span>Page {page + 1}</span>
                <button
                    className={`flex items-center justify-center px-3 py-1 rounded-lg text-xl font-[family-name:var(--font-header)] font-bold ${disableNext ? 'bg-[var(--color-neutral-lighter)] text-[var(--color-neutral-dark)]' : 'cursor-pointer hover:bg-[var(--color-neutral-lighter)] bg-[var(--color-neutral-light)]'}`}
                    onClick={nextPage}
                    disabled={disableNext}
                >
                    &gt;
                </button>
            </div>
        </div>
        <div className="flex flex-col w-full border-2 border-gray-300 rounded-lg px-5 py-3 mt-5 gap-5">
            {verbs.map((verb, index) => {
                return (
                    <div key={verb.infinitive} className="flex flex-col">
                        <DropdownWrapper header={verb.infinitive}>
                            <>
                                {modes.map((mode) => {
                                    const conjugatedVerbs = verb.conjugations.filter(c => c.mode === mode);
                                    const pronouns = modeToPronouns(mode as Mode);
                                    if (!conjugatedVerbs || conjugatedVerbs.length === 0) return null;
                                    return (
                                        <div key={mode} className="flex flex-col items-start gap-2">
                                            <span className="capitalize text-xl border-b-2 border-b-black w-full">{mode}</span>
                                            <div className="flex flex-wrap gap-1 w-full">
                                                {conjugatedVerbs.map((c, i) => (
                                                    <div key={`${mode}-${c.tense}`} className="flex flex-col gap-1 bg-[var(--color-neutral-light)] px-2 py-1 rounded-lg">
                                                        <div className="flex min-w-52 justify-between items-center border-b-2 border-black">
                                                            <span className="capitalize">{c.tense}</span>
                                                            <div className="flex">
                                                                <button
                                                                    className="p-1 rounded-full cursor-pointer hover:bg-[var(--color-neutral-lighter)]"
                                                                    onClick={() => { console.log(verb); handleEdit(c); }}
                                                                >
                                                                    <Icon name="edit" className="w-5"/>
                                                                </button>
                                                                <button
                                                                    className="p-1 rounded-full cursor-pointer hover:bg-[var(--color-neutral-lighter)]"
                                                                    onClick={() => handleDelete({ infinitive: verb.infinitive, tense: c.tense, mode })}
                                                                >
                                                                    <Icon name="delete" className="w-5"/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            {c.conjugation.map((conj, j) => (
                                                                <span key={`${mode}-${c.tense}-${j}`} className="capitalize text-nowrap">{pronouns[j]}  {conj}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        </DropdownWrapper>
                    </div>
                );
            })}
        </div>

        <EditModal verb={editVerb} isOpen={isEditModalOpen} editAction={editAction} onClose={() => setIsEditModalOpen(false)} />
        <Delete verb={deleteVerb} isOpen={isDeleteModalOpen} deleteAction={deleteAction} onClose={() => setIsDeleteModalOpen(false)} />
        <AddModal isOpen={isAddModalOpen} addAction={addAction} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
