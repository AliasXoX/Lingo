import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import { Dictionary } from './Dictionary';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Organisms/Dictionary',
  component: Dictionary,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
  render: (args) => (
    <div className="flex w-full h-screen px-5 py-3">
      <Dictionary {...args} />
    </div>
  ),
} satisfies Meta<typeof Dictionary>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    words: [
        { it: "Ciao", fr: "Bonjour" },
        { it: "Mela", fr: "Pomme" },
        { it: "Libro", fr: "Livre" },
    ],
    page: 1,
    nextPage: fn(),
    prevPage: fn(),
    disableNext: false,
    disablePrev: true,
    editAction: fn(),
    deleteAction: fn(),
    addAction: fn(),
    onChangeOrder: fn(),
  },
};