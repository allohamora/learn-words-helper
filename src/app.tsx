import { FC, useState } from 'react';
import { TableInput, ActionsWrapper, WordListItem } from './components/table-input';
import { Container } from './components/container';
import { CardItem, Cards } from './components/cards';
import { Button } from './components/button';
import { shuffle } from './utils/shuffle';
import './global.css';

const enum AppStatus {
  WAITING = 'WAITING',
  STARTED = 'STARTED',
}

export const enum AppSort {
  Default = 'Default',
  Shuffle = 'Shuffle',
}

export const enum AppMode {
  Words = 'Words',
  Translations = 'Translations',
}

const toCardItems = (wordList: WordListItem[], mode: AppMode): CardItem[] => {
  return wordList.map(({ word, translation }) => {
    if (mode === AppMode.Words) {
      return { question: translation, answer: word };
    }

    return { question: word, answer: translation };
  });
};

const sortItems = (items: CardItem[], sort: AppSort) => {
  if (sort === AppSort.Default) {
    return items;
  }

  return shuffle(items);
};

export const App: FC = () => {
  const [table, setTable] = useState<string>();
  const [wordList, setWordList] = useState<WordListItem[] | null>(null);
  const [cardItems, setCardItems] = useState<CardItem[]>();
  const [status, setStatus] = useState(AppStatus.WAITING);
  const [sort, setSort] = useState(AppSort.Default);
  const [mode, setMode] = useState(AppMode.Words);

  const onFinish = () => {
    setStatus(AppStatus.WAITING);
  };

  const onStart = () => {
    setCardItems(sortItems(toCardItems(wordList as WordListItem[], mode), sort));
    setStatus(AppStatus.STARTED);
  };

  const toggleSort = () => {
    const nextSort = sort === AppSort.Default ? AppSort.Shuffle : AppSort.Default;

    setSort(nextSort);
  };

  const toggleMode = () => {
    const nextMode = mode === AppMode.Words ? AppMode.Translations : AppMode.Words;

    setMode(nextMode);
  };

  return (
    <Container as="main">
      {status === AppStatus.WAITING && (
        <TableInput table={table} setTable={setTable} setWordList={setWordList}>
          <ActionsWrapper>
            <Button onClick={toggleSort}>Sort: {sort.toLowerCase()}</Button>
            <Button onClick={toggleMode}>Mode: {mode.toLowerCase()}</Button>
          </ActionsWrapper>

          <Button onClick={onStart} disabled={!wordList}>
            Start
          </Button>
        </TableInput>
      )}
      {status === AppStatus.STARTED && <Cards items={cardItems as CardItem[]} onFinish={onFinish} />}
    </Container>
  );
};
