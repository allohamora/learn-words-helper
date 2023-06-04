import { persistentMap } from '@nanostores/persistent';
import { WordListItem } from '../components/table-input';

export const enum AppSort {
  Default = 'Default',
  Shuffle = 'Shuffle',
}

export const enum AppTarget {
  Words = 'Words',
  Translations = 'Translations',
}

export const enum AppMode {
  One = 'One',
  All = 'All',
}

type Config = {
  wordList: WordListItem[] | null;
  sort: AppSort;
  target: AppTarget;
  mode: AppMode;
};

export const configStore = persistentMap<Config>(
  'config',
  {
    wordList: null,
    sort: AppSort.Default,
    target: AppTarget.Words,
    mode: AppMode.One,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);
