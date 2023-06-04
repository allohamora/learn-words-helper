import { FC, useState } from 'react';
import { WordListItem } from './table-input';
import { Title } from './title';
import { Button } from './button';
import { Input } from './input';
import { styled } from '@linaria/react';

const Form = styled.form`
  width: 400px;
  margin: 0 auto;

  input {
    display: inline-block;
    width: 100%;
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

type Props = {
  wordList: WordListItem[];
  onFinish: () => void;
};

const MAX_WRONG_ANSWERS = 3;

export const Cards: FC<Props> = ({ wordList, onFinish }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');

  const active = wordList[activeIdx] as WordListItem;

  const onSubmit = () => {
    if (active.word !== answer) {
      const newWrongAnswers = wrongAnswers + 1;
      setWrongAnswers(newWrongAnswers);

      if (newWrongAnswers >= MAX_WRONG_ANSWERS) {
        return alert(`wrong answer, the right answer is "${active.word}"`);
      }

      return alert(`wrong answer`);
    }

    if (activeIdx + 1 >= wordList.length) {
      return onFinish();
    }

    setAnswer('');
    setWrongAnswers(0);
    setActiveIdx(activeIdx + 1);
  };

  return (
    <div>
      <Title>Enter the translation of that:</Title>
      <div>
        <Title as="h3">{active.translation}</Title>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <SubmitWrapper>
            <Button type="submit">submit</Button>
          </SubmitWrapper>
        </Form>
      </div>
    </div>
  );
};
