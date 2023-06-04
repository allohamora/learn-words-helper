import { persistentAtom } from '@nanostores/persistent';

export const tableStore = persistentAtom<string>('table', '');
