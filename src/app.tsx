import { FC, useState } from 'react';
import { TableInput, WordListItem } from './components/table-input';
import { Container } from './components/container';
import './global.css';

export const App: FC = () => {
  const [wordList, setWordList] = useState<WordListItem[] | null>();

  return (
    <Container as="main">
      <TableInput setWordList={setWordList} startDisabled={!wordList} onStart={() => console.log('start')} />
    </Container>
  );
};
