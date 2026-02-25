import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import React, { useState } from 'react';
import { LearnPanel } from './LearnPanel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Organisms/LearnPanel',
  component: LearnPanel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
  render: (args) => {
    const [mode, setMode] = useState("it");

    return (
      <div className="flex w-full h-screen px-5 py-3">
        <LearnPanel {...args} mode={mode} handleChangeMode={() => setMode(mode === "it" ? "fr" : "it")} />
      </div>
    );
  }
} satisfies Meta<typeof LearnPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    mode: "it",
    selectedBox: 0,
    setSelectedBox: fn(),
    boxes: [
        { rest: 3, total: 10 },
        { rest: 5, total: 10 },
        { rest: 2, total: 10 },
        { rest: 7, total: 10 },
        { rest: 1, total: 10 },
        { rest: 0, total: 10 },
        { rest: 4, total: 10 },
    ],
    inputWord: "Hello",
    formAction: fn(),
    state: null,
  },
};

export const WithError: Story = {
  args: {
    mode: "it",
    selectedBox: 0,
    setSelectedBox: fn(),
    boxes: [
        { rest: 3, total: 10 },
        { rest: 5, total: 10 },
        { rest: 2, total: 10 },
        { rest: 7, total: 10 },
        { rest: 1, total: 10 },
        { rest: 0, total: 10 },
        { rest: 4, total: 10 },
    ],
    inputWord: "Hello",
    formAction: fn(),
    state: {
      success: false,
      error: "Incorrect answer. Try again!"
    }
  },
};

export const WithCorrectAnswer: Story = {
  args: {
    mode: "it",
    selectedBox: 0,
    setSelectedBox: fn(),
    boxes: [
        { rest: 3, total: 10 },
        { rest: 5, total: 10 },
        { rest: 2, total: 10 },
        { rest: 7, total: 10 },
        { rest: 1, total: 10 },
        { rest: 0, total: 10 },
        { rest: 4, total: 10 },
    ],
    inputWord: "Hello",
    formAction: fn(),
    state: {
      success: true,
      correct: true,
    }
  },
};

export const WithIncorrectAnswer: Story = {
  args: {
    mode: "it",
    selectedBox: 0,
    setSelectedBox: fn(),
    boxes: [
        { rest: 3, total: 10 },
        { rest: 5, total: 10 },
        { rest: 2, total: 10 },
        { rest: 7, total: 10 },
        { rest: 1, total: 10 },
        { rest: 0, total: 10 },
        { rest: 4, total: 10 },
    ],
    inputWord: "Hello",
    formAction: fn(),
    state: {
      success: true,
      correct: false,
    }
  },
};
