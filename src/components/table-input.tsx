import { FC, FormEvent } from 'react';
import { styled } from '@linaria/react';
import { Button } from './button';
import { Title } from './title';

const TableHolderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TableHolder = styled.div`
  overflow: auto;
  display: inline-block;

  min-width: 500px;
  min-height: 500px;
  padding: 10px;

  color: var(--input-text-color);

  background-color: var(--input-background);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);

  div {
    white-space: normal !important;
    background-color: var(--input-background) !important;
  }

  table td span {
    color: var(--input-text-color) !important;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export type WordListItem = {
  word: string;
  translation: string;
};

const TRANSLATION_TRASH = /«|»/gi;
const WORD_TRASH = /(\[.+?\])|(Am\.E\.)/gi;

const parseTable = (e: FormEvent<HTMLDivElement>) => {
  const target = e.target as HTMLDivElement;

  const words: string[] = [];
  const translations: string[] = [];

  target.querySelectorAll('td').forEach((td, i) => {
    if (i % 2 === 0) {
      words.push(td.innerText.replace(WORD_TRASH, '').trim());
    } else {
      translations.push(td.innerText.replace(TRANSLATION_TRASH, '').trim());
    }
  });

  const result = words.map((word, i) => ({ word, translation: translations[i] }));

  if (!result.length) {
    return null;
  }

  return result;
};

type Props = {
  setWordList: (value: WordListItem[] | null) => void;
  startDisabled: boolean;
  onStart: () => void;
  table?: string;
  setTable: (table: string) => void;
};

export const TableInput: FC<Props> = ({ setWordList, onStart, startDisabled, table, setTable }) => {
  const props: {
    dangerouslySetInnerHTML?: { __html: string };
  } = {};

  if (table) {
    props.dangerouslySetInnerHTML = { __html: table };
  }

  return (
    <div>
      <Title>Enter your table here:</Title>
      <TableHolderWrapper>
        <div>
          <TableHolder
            onInput={(e) => {
              setWordList(parseTable(e));
              setTable((e.target as HTMLDivElement).innerHTML);
            }}
            contentEditable
            {...props}
          />

          <ButtonWrapper>
            <Button onClick={() => onStart()} disabled={startDisabled}>
              Start
            </Button>
          </ButtonWrapper>
        </div>
      </TableHolderWrapper>
    </div>
  );
};
