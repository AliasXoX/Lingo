import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Molecules/ModalWrapper',
  component: ModalWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col w-full h-screen px-5 py-3">
            <button
                className="bg-[var(--color-action-dark)] px-3 py-1 rounded-lg cursor-pointer text-sm font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-primary-dark)]"
                onClick={() => setIsOpen(true)}
            >
                Open Modal
            </button>
            <ModalWrapper {...args} isOpen={isOpen}>
                <div className="bg-yellow-400 p-5 rounded-lg">
                    This is a modal. Click <span className="text-[var(--color-action)] cursor-pointer" onClick={() => setIsOpen(false)}>here</span> to close it.
                </div>
            </ModalWrapper>
        </div>
    )
  },
} satisfies Meta<typeof ModalWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: (
        <div className="bg-white p-5 rounded-lg">
            Open Modal
        </div>
    ),
  },
};
