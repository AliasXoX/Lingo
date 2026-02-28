import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import { Verb } from '../../../lib/type';

import { VerbDictionary } from './VerbDictionary';

const verbsExample: Verb[] = [
    {
        infinitive: "parlare",
        conjugations: [
            {
                infinitive: "parlare",
                tense: "presente",
                mode: "indicativo",
                conjugation: ["parlo", "parli", "parla", "parliamo", "parlate", "parlano"]
            },
            {
                infinitive: "parlare",
                tense: "imperfetto",
                mode: "indicativo",
                conjugation: ["parlavo", "parlavi", "parlava", "parlavamo", "parlavate", "parlavano"]
            }
        ]
    },
    {
        infinitive: "credere",
        conjugations: [
            {
                infinitive: "credere",
                tense: "presente",
                mode: "indicativo",
                conjugation: ["credo", "credi", "crede", "crediamo", "credete", "credono"]
            },
            {
                infinitive: "credere",
                tense: "imperfetto",
                mode: "indicativo",
                conjugation: ["credevo", "credevi", "credeva", "credevamo", "credevate", "credevano"]
            }
        ]
    },
    {
        infinitive: "dormire",
        conjugations: [
            {
                infinitive: "dormire",
                tense: "presente",
                mode: "indicativo",
                conjugation: ["dormo", "dormi", "dorme", "dormiamo", "dormite", "dormono"]
            },
            {
                infinitive: "dormire",
                tense: "passato",
                mode: "condizionale",
                conjugation: ["avrei dormito", "avresti dormito", "avrebbe dormito", "avremmo dormito", "avreste dormito", "avrebbero dormito"]
            }
        ]
    }
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Organisms/VerbDictionary',
  component: VerbDictionary,
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
      <VerbDictionary {...args} />
    </div>
  ),
} satisfies Meta<typeof VerbDictionary>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    verbs: verbsExample,
    page: 1,
    nextPage: fn(),
    prevPage: fn(),
    disableNext: false,
    disablePrev: true,
    editAction: fn(),
    deleteAction: fn(),
    addAction: fn(),
  },
};