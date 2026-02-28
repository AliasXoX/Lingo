import type { Meta, StoryObj } from '@storybook/nextjs';

import { Icon } from './Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Atoms/Icon',
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Cross: Story = {
  args: {
    name: "cross"
  },
  render: (args) => (
    <div className="w-10">
      <Icon {...args} />
    </div>
  )
};

export const Delete: Story = {
  args: {
    name: "delete"
  },
  render: (args) => (
    <div className="w-10">
      <Icon {...args} />
    </div>
  )
};

export const Edit: Story = {
  args: {
    name: "edit"
  },
  render: (args) => (
    <div className="w-10">
      <Icon {...args} />
    </div>
  )
};

export const Dropdown: Story = {
  args: {
    name: "dropdown"
  },
  render: (args) => (
    <div className="w-10">
      <Icon {...args} />
    </div>
  )
};
