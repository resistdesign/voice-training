import { PersistableItem } from './Utils/JSONLocalStorage';

export type FiveLongCompletedRepetitionList = [boolean, boolean, boolean, boolean, boolean];

export type ThreeLongCompletedRepetitionList = [boolean, boolean, boolean];

export type Sheet = PersistableItem & {
  name: string;
  semioccluded: FiveLongCompletedRepetitionList;
  sustainedPitch: FiveLongCompletedRepetitionList;
  functionalPhrases: ThreeLongCompletedRepetitionList;
  carryover: {
    complete: boolean;
    quote: string;
  };
  notes: string;
};
