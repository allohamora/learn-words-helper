import { FC, PropsWithChildren } from 'react';
import ContentEditable from 'react-contenteditable';
import { styled } from '@linaria/react';
import { Title } from './title';
import { media } from '../utils/media';

const TableHolderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
  ${media.mobile} {
    width: 100%;
  }
`;

const TableHolder = styled(ContentEditable)`
  overflow: auto;
  display: inline-block;

  min-width: 500px;
  min-height: 500px;
  padding: 10px;

  color: var(--input-text-color);
  white-space: normal !important;

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

  ${media.mobile} {
    width: 100%;
    min-width: 100%;
    min-height: 400px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 5px;

  button {
    width: 45%;
    margin-bottom: 10px;
  }
`;

export type ParsedText = {
  full: string;
  items: string[];
};

export type WordListItem = {
  word: ParsedText;
  translation: ParsedText;
};

const TRANSLATION_TRASH = /«|»/gi;
const WORD_TRASH = /(\[.+?\])|(Am\.E\.)/gi;
const MANY_SPLIT_SYMBOL = ',';

const parseText = (text: string, trashRegexp: RegExp): ParsedText => {
  const full = text.replace(trashRegexp, '').trim().replace(/\s/gi, ' ');
  const items = full.split(MANY_SPLIT_SYMBOL).map((value) => value.trim());

  return {
    full,
    items,
  };
};

const parseTable = (target: HTMLDivElement) => {
  const words: ParsedText[] = [];
  const translations: ParsedText[] = [];

  target.querySelectorAll('td').forEach((td, i) => {
    if (i % 2 === 0) {
      words.push(parseText(td.innerText, WORD_TRASH));
    } else {
      translations.push(parseText(td.innerText, TRANSLATION_TRASH));
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

  table: string;
  setTable: (table: string) => void;
};

export const TableInput: FC<PropsWithChildren<Props>> = ({ setWordList, table, setTable, children }) => {
  return (
    <div>
      <Title>Enter your table here:</Title>
      <TableHolderWrapper>
        <FormWrapper>
          <TableHolder
            html={table}
            onChange={(e) => {
              setWordList(parseTable(e.nativeEvent.target as HTMLDivElement));
              setTable(e.target.value);
            }}
          />

          {children}
        </FormWrapper>
      </TableHolderWrapper>
    </div>
  );
};
