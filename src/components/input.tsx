import { styled } from '@linaria/react';

export const Input = styled.input`
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);

  &:focus {
    outline: none;
  }
`;
