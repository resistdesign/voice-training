import { Sheet } from './Types';

export const DEFAULT_SHEET: Omit<Sheet, 'id'> = {
  name: '',
  semioccluded: [false, false, false, false, false],
  sustainedPitch: [false, false, false, false, false],
  functionalPhrases: [false, false, false],
  carryover: {
    complete: false,
    quote: '',
  },
  notes: '',
};
