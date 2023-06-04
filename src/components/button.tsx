import { styled } from '@linaria/react';

export const Button = styled.button`
  cursor: pointer;

  padding: 5px;

  color: var(--text-color);

  background-color: var(--secondary-color);
  border: none;
  border-radius: var(--border-radius);

  transition: 0.5s;

  &:hover {
    opacity: 0.75;
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--text-disabled);
  }
`;
