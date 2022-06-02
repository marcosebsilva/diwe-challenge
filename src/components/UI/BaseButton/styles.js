import styled from 'styled-components';
import colors from 'styles/colors.json';

// eslint-disable-next-line import/prefer-default-export
export const Button = styled.button`
  height: 56px;
  border-radius: 6px;
  color: white;
  background-color: ${colors['primary-dark']};
  font-size: 1rem;
  transition: 100ms;
  width: 100%;

  &:hover{
    filter: brightness(130%);
  }
`;
