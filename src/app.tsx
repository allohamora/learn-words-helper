import { FC, useState } from 'react';
import { TableInput, ButtonsWrapper, WordListItem } from './components/table-input';
import { Container } from './components/container';
import { CardItem, Cards } from './components/cards';
import { Button } from './components/button';
import { shuffle } from './utils/shuffle';
import './global.css';

const enum AppStatus {
  WAITING = 'WAITING',
  STARTED = 'STARTED',
}

const enum AppSort {
  Default = 'Default',
  Shuffle = 'Shuffle',
}

const enum AppTarget {
  Words = 'Words',
  Translations = 'Translations',
}

const enum AppMode {
  One = 'One',
  All = 'All',
}

const filteredByTarget = ({ word, translation }: WordListItem, target: AppTarget) => {
  if (target === AppTarget.Words) {
    return { question: translation, answer: word };
  }

  return { question: word, answer: translation };
};

const toCardItems = (wordList: WordListItem[], target: AppTarget, mode: AppMode): CardItem[] => {
  return wordList.map((wordListItem) => {
    const filtered = filteredByTarget(wordListItem, target);

    if (mode === AppMode.All) {
      return { question: filtered.question.full, answers: [filtered.answer.full] };
    }

    return { question: filtered.question.full, answers: filtered.answer.items };
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
  const [target, setTarget] = useState(AppTarget.Words);
  const [mode, setMode] = useState(AppMode.One);

  const onFinish = () => {
    setStatus(AppStatus.WAITING);
  };

  const onStart = () => {
    setCardItems(sortItems(toCardItems(wordList as WordListItem[], target, mode), sort));
    setStatus(AppStatus.STARTED);
  };

  const toggleSort = () => {
    const nextSort = sort === AppSort.Default ? AppSort.Shuffle : AppSort.Default;

    setSort(nextSort);
  };

  const toggleTarget = () => {
    const nextTarget = target === AppTarget.Words ? AppTarget.Translations : AppTarget.Words;

    setTarget(nextTarget);
  };

  const toggleMode = () => {
    const nextMode = mode === AppMode.All ? AppMode.One : AppMode.All;

    setMode(nextMode);
  };

  return (
    <Container as="main">
      {status === AppStatus.WAITING && (
        <TableInput table={table} setTable={setTable} setWordList={setWordList}>
          <ButtonsWrapper>
            <Button onClick={toggleSort}>Sort: {sort.toLowerCase()}</Button>
            <Button onClick={toggleTarget}>Target: {target.toLowerCase()}</Button>
            <Button onClick={toggleMode}>Mode: {mode.toLowerCase()}</Button>
            <Button onClick={onStart} disabled={!wordList}>
              Start
            </Button>
          </ButtonsWrapper>
        </TableInput>
      )}
      {status === AppStatus.STARTED && <Cards items={cardItems as CardItem[]} onFinish={onFinish} />}
    </Container>
  );
};
