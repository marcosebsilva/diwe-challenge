import styled from 'styled-components';
import colors from 'styles/colors.json';

export const Label = styled.label`
  display: block;
  color: ${colors['primary-dark']};
  font-weight: 700;
  font-style: normal;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  display: block;
  padding: 16px;
  height: 56px;
  background-color: ${colors['neutral-light']};
  border-radius: 8px;
  width: 100%;
  &::placeholder {
    opacity: 0.64;
    font-weight: 500;
    font-size: 1rem;
  }
`;
