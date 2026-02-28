import type { Meta, StoryObj } from '@storybook/nextjs';

import { DropdownWrapper } from './DropdownWrapper';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Molecules/DropdownWrapper',
  component: DropdownWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    header: "Dropdown Title",
    children: (
      <div className="p-4">
        <p>This is the content of the dropdown.</p>
        <p>You can put any React node here.</p>
      </div>
    )
  },
};