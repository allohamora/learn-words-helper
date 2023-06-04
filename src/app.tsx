import { FC, useState } from 'react';
import { TableInput, WordListItem } from './components/table-input';
import { Container } from './components/container';
import { Cards } from './components/cards';
import './global.css';

const enum AppStatus {
  WAITING = 'WAITING',
  STARTED = 'STARTED',
}

export const App: FC = () => {
  const [table, setTable] = useState<string>();
  const [wordList, setWordList] = useState<WordListItem[] | null>();
  const [status, setStatus] = useState<AppStatus>(AppStatus.WAITING);

  const onFinish = () => {
    setStatus(AppStatus.WAITING);
  };

  return (
    <Container as="main">
      {status === AppStatus.WAITING && (
        <TableInput
          table={table}
          setTable={setTable}
          setWordList={setWordList}
          startDisabled={!wordList}
          onStart={() => setStatus(AppStatus.STARTED)}
        />
      )}
      {status === AppStatus.STARTED && <Cards wordList={wordList as WordListItem[]} onFinish={onFinish} />}
    </Container>
  );
};
