
import React, { useState } from 'react';
import { ModalWrapper } from '@/components/molecules/ModalWrapper/ModalWrapper';
import { Icon } from '@/components/atoms/Icon/Icon';

export interface DictionaryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** What background color to use */
    backgroundColor?: string;
    words: Array<{
        it: string;
        fr: string;
    }>;
    nextPage?: () => void;
    prevPage?: () => void;
    disableNext?: boolean;
    disablePrev?: boolean;
    editAction?: (formData: FormData) => void;
    deleteAction?: (word: { it: string; fr: string }) => void;
    addAction?: (formData: FormData) => void;
}

const EditModal = ({ word, isOpen, editAction, onClose }: { word: { it: string; fr: string }; isOpen: boolean; editAction?: (formData: FormData) => void; onClose?: () => void }) => {
    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="relative flex flex-col items-center justify-center rounded-2xl bg-white px-3 py-2">
                <span className="font-bold text-xl">Edit Word</span>
                <button className="absolute top-2 right-2 p-1 rounded-full cursor-pointer hover:bg-[var(--color-neutral-lighter)]" onClick={() => onClose?.()}>
                    <Icon name="cross" className="w-5"/>
                </button>
                <form action={editAction} className="flex flex-col w-full gap-3">
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="it" className="block text-sm font-medium text-gray-700">Italian</label>
                        <input type="text" name="it" defaultValue={word.it} className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="fr" className="block text-sm font-medium text-gray-700">French</label>
                        <input type="text" name="fr" defaultValue={word.fr} className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" />
                    </div>
                    <button type="submit" className="bg-[var(--color-action-dark)] px-3 py-1 rounded-lg cursor-pointer text-md text-white font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)] mt-2">
                        Save
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}

const Delete = ({ word, isOpen, deleteAction, onClose }: { word: { it: string; fr: string }; isOpen: boolean; deleteAction?: (word: { it: string; fr: string }) => void; onClose?: () => void }) => {
    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="relative flex flex-col items-center justify-center rounded-2xl bg-white px-3 py-2">
                <span className="font-bold text-xl">Delete Word</span>
                <button className="absolute top-2 right-2 p-1 rounded-full cursor-pointer hover:bg-[var(--color-neutral-lighter)]" onClick={() => onClose?.()}>
                    <Icon name="cross" className="w-5"/>
                </button>
                <p className="mt-2">Are you sure you want to delete this word?</p>
                <p className="font-bold">{`${word.it} - ${word.fr}`}</p>
                <div className="flex gap-3 mt-3">
                    <button 
                        className="bg-[var(--color-danger)] px-3 py-1 rounded-lg cursor-pointer text-md text-white font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)]"
                        onClick={() => {
                            deleteAction?.(word);
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
    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="relative flex flex-col items-center justify-center rounded-2xl bg-white px-3 py-2">
                <span className="font-bold text-xl">Add Word</span>
                <button className="absolute top-2 right-2 p-1 rounded-full cursor-pointer hover:bg-[var(--color-neutral-lighter)]" onClick={() => onClose?.()}>
                    <Icon name="cross" className="w-5"/>
                </button>
                <form action={addAction} className="flex flex-col w-full gap-3">
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="it" className="block text-sm font-medium text-gray-700">Italian</label>
                        <input type="text" name="it" className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="fr" className="block text-sm font-medium text-gray-700">French</label>
                        <input type="text" name="fr" className="border-2 border-gray-300 rounded-lg px-4 py-2 font-[family-name:var(--font-input)] text-gray-900 w-full" />
                    </div>
                    <button type="submit" className="bg-[var(--color-action-dark)] px-3 py-1 rounded-lg cursor-pointer text-md text-white font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)] mt-2">
                        Add
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}

/** Primary UI component for user interaction */
export const Dictionary = ({
  backgroundColor,
  words,
  nextPage,
  prevPage,
  disableNext,
  disablePrev,
  editAction,
  deleteAction,
  addAction,
  className = '',
  ...props
}: DictionaryProps) => {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editWord, setEditWord] = useState<{ it: string; fr: string }>({ it: '', fr: '' });
  const [deleteWord, setDeleteWord] = useState<{ it: string; fr: string }>({ it: '', fr: '' });

  function handleEdit(word: { it: string; fr: string }) {
    setEditWord(word);
    setIsEditModalOpen(true);
  }

  function handleDelete(word: { it: string; fr: string }) {
    setDeleteWord(word);
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
               + Add Word
            </button>
            <div className="flex items-center gap-5 ml-5">
                <button 
                    className={`flex items-center justify-center px-3 py-1 rounded-lg text-xl font-[family-name:var(--font-header)] font-bold ${disablePrev ? 'bg-[var(--color-neutral-lighter)] text-[var(--color-neutral-dark)]' : 'cursor-pointer hover:bg-[var(--color-neutral-lighter)] bg-[var(--color-neutral-light)]'}`}
                    onClick={prevPage}
                    disabled={disablePrev}
                >
                    &lt;
                </button>
                <span>Page 1</span>
                <button
                    className={`flex items-center justify-center px-3 py-1 rounded-lg text-xl font-[family-name:var(--font-header)] font-bold ${disableNext ? 'bg-[var(--color-neutral-lighter)] text-[var(--color-neutral-dark)]' : 'cursor-pointer hover:bg-[var(--color-neutral-lighter)] bg-[var(--color-neutral-light)]'}`}
                    onClick={nextPage}
                    disabled={disableNext}
                >
                    &gt;
                </button>
            </div>
        </div>
        <table className="w-full mt-5 text-left">
            <thead>
                <tr>
                    <th className="border-b-2 border-gray-300 px-4 py-2">Italian</th>
                    <th className="border-b-2 border-gray-300 px-4 py-2">French</th>
                    <th className="border-b-2 border-gray-300 px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {words.map((word, index) => (
                    <tr key={index}>
                        <td className="border-b border-gray-300 px-4 py-2">{word.it}</td>
                        <td className="border-b border-gray-300 px-4 py-2">{word.fr}</td>
                        <td className="border-b border-gray-300 px-4 py-2">
                            <button 
                                className="bg-[var(--color-action-dark)] px-3 py-1 rounded-lg cursor-pointer text-sm text-white font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)]"
                                onClick={() => handleEdit(word)}
                            >
                                Edit
                            </button>
                            <button 
                                className="bg-[var(--color-danger)] px-3 py-1 rounded-lg cursor-pointer text-sm text-white font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)] ml-2"
                                onClick={() => handleDelete(word)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <EditModal word={editWord} isOpen={isEditModalOpen} editAction={editAction} onClose={() => setIsEditModalOpen(false)} />
        <Delete word={deleteWord} isOpen={isDeleteModalOpen} deleteAction={deleteAction} onClose={() => setIsDeleteModalOpen(false)} />
        <AddModal isOpen={isAddModalOpen} addAction={addAction} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
