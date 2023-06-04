import { FC } from 'react';
import { TableInput } from './components/table-input';
import { Container } from './components/container';
import './global.css';

export const App: FC = () => {
  return (
    <Container as="main">
      <TableInput />
    </Container>
  );
};
