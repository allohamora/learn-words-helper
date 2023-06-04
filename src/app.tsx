import { FC, useState } from 'react';
import { TableInput, ButtonsWrapper, WordListItem } from './components/table-input';
import { Container } from './components/container';
import { CardItem, Cards } from './components/cards';
import { Button } from './components/button';
import { shuffle } from './utils/shuffle';
import { useStore } from '@nanostores/react';
import { AppMode, AppSort, AppTarget, configStore } from './stores/config.store';
import { tableStore } from './stores/table.store';
import './global.css';

const enum AppStatus {
  WAITING = 'WAITING',
  STARTED = 'STARTED',
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
  const [status, setStatus] = useState(AppStatus.WAITING);
  const [cardItems, setCardItems] = useState<CardItem[]>();

  const config = useStore(configStore);
  const table = useStore(tableStore);

  const onFinish = () => {
    setStatus(AppStatus.WAITING);
  };

  const onStart = () => {
    setCardItems(sortItems(toCardItems(config.wordList as WordListItem[], config.target, config.mode), config.sort));
    setStatus(AppStatus.STARTED);
  };

  const toggleSort = () => {
    const nextSort = config.sort === AppSort.Default ? AppSort.Shuffle : AppSort.Default;

    configStore.setKey('sort', nextSort);
  };

  const toggleTarget = () => {
    const nextTarget = config.target === AppTarget.Words ? AppTarget.Translations : AppTarget.Words;

    configStore.setKey('target', nextTarget);
  };

  const toggleMode = () => {
    const nextMode = config.mode === AppMode.All ? AppMode.One : AppMode.All;

    configStore.setKey('mode', nextMode);
  };

  const setTable = (newTable: string) => {
    tableStore.set(newTable);
  };

  const setWordList = (wordList: WordListItem[] | null) => {
    configStore.setKey('wordList', wordList);
  };

  return (
    <Container as="main">
      {status === AppStatus.WAITING && (
        <TableInput table={table} setTable={setTable} setWordList={setWordList}>
          <ButtonsWrapper>
            <Button onClick={toggleSort}>Sort: {config.sort.toLowerCase()}</Button>
            <Button onClick={toggleTarget}>Target: {config.target.toLowerCase()}</Button>
            <Button onClick={toggleMode}>Mode: {config.mode.toLowerCase()}</Button>
            <Button onClick={onStart} disabled={!config.wordList}>
              Start
            </Button>
          </ButtonsWrapper>
        </TableInput>
      )}
      {status === AppStatus.STARTED && <Cards items={cardItems as CardItem[]} onFinish={onFinish} />}
    </Container>
  );
};
