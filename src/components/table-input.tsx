import { FC, FormEvent, useState } from 'react';
import { styled } from '@linaria/react';

const Title = styled.h1`
  color: black;
`;

const TableHolderWrapper = styled.div`
  display: flex;
`;

const TableHolder = styled.div`
  min-width: 50%;
  border: 2px solid black;
`;

const WordListHolder = styled.div`
  margin-top: 30px;
`;

type WordListItem = {
  word: string;
  translation: string;
};

export const TableInput: FC = () => {
  const [wordList, setWordList] = useState<WordListItem[] | null>();

  const parseTable = (e: FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    const words: string[] = [];
    const translations: string[] = [];

    target.querySelectorAll('td').forEach((td, i) => {
      if (i % 2 === 0) {
        words.push(td.innerText);
      } else {
        translations.push(td.innerText);
      }
    });

    const result = words.map((word, i) => ({ word, translation: translations[i] }));

    if (!result.length) {
      setWordList(null);
    } else {
      setWordList(result);
    }
  };

  return (
    <div>
      <Title>Enter your table here:</Title>
      <TableHolderWrapper>
        <TableHolder onInput={parseTable} contentEditable />
        {wordList && <WordListHolder>{JSON.stringify(wordList, null, 2)}</WordListHolder>}
      </TableHolderWrapper>
    </div>
  );
};
