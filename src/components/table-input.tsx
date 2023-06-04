import { FC, FormEvent, useState } from 'react';
import { styled } from '@linaria/react';

const Title = styled.h1`
  text-align: center;
`;

const TableHolderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TableHolder = styled.div`
  overflow: auto;

  min-width: 500px;
  min-height: 500px;
  padding: 10px;

  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);

  table td span {
    color: var(--text-color) !important;
  }

  table {
    border: 1px solid var(--border-color) !important;
    border-radius: var(--border-radius) !important;
  }

  table td {
    border-color: var(--border-color) !important;
  }

  &:focus {
    outline: none;
  }
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
      </TableHolderWrapper>

      {wordList && <WordListHolder>{JSON.stringify(wordList, null, 2)}</WordListHolder>}
    </div>
  );
};
