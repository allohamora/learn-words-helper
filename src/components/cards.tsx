import { FC, useState } from 'react';
import { Title } from './title';
import { Button } from './button';
import { Input } from './input';
import { styled } from '@linaria/react';
import { Tooltip } from 'react-tooltip';
import { media } from '../utils/media';

const Form = styled.form`
  width: 400px;
  margin: 0 auto;

  input {
    display: inline-block;
    width: 100%;
  }

  ${media.mobile} {
    width: 100%;
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export type CardItem = {
  question: string;
  answers: string[];
};

type Props = {
  items: CardItem[];
  onFinish: () => void;
};

const MAX_WRONG_ANSWERS = 3;

export const Cards: FC<Props> = ({ items, onFinish }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');

  const active = items[activeIdx] as CardItem;

  const onSubmit = () => {
    if (!active.answers.includes(answer)) {
      const newWrongAnswers = wrongAnswers + 1;
      setWrongAnswers(newWrongAnswers);

      if (newWrongAnswers >= MAX_WRONG_ANSWERS) {
        return alert(`wrong answer, the right answer is "${active.answers.join('" or "')}"`);
      }

      return alert(`wrong answer`);
    }

    if (activeIdx + 1 >= items.length) {
      return onFinish();
    }

    setAnswer('');
    setWrongAnswers(0);
    setActiveIdx(activeIdx + 1);
  };

  return (
    <div>
      <Title>Enter the answer of that:</Title>
      <div>
        <Title data-tooltip-id="question" data-tooltip-content={`"${active.answers.join('" or "')}"`} as="h3">
          {active.question}
        </Title>
        <Tooltip id="question" />

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
