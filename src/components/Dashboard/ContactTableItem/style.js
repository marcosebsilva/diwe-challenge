import styled from 'styled-components';
import colors from 'styles/colors.json';

export const OptionsWrapper = styled.td`
  display: flex;
  align-items: center;
  max-width: 100px;
  gap: 16px;
  button {
    display: flex;
    background-color: transparent;
    color: ${colors['neutral-dark']};
    gap: 8px;
    font-size: 0.87rem;
    line-height: 144%;
    :hover {
      filter: brightness(50%);
    }
    img {
      pointer-events: none;
      max-width: 18px;
    }
  }
`;

export const Wrapper = styled.tr`
  filter: ${(props) => (props.blur ? 'blur(1px) brightness(85%) grayscale(1)' : 'none')};

  font-weight: 500;
  input {
    font-weight: 500;
    line-height: 148%;
    background-color: transparent;
    border: none;
    font-size: 1rem;
    margin: 0;
    overflow: hidden;
  }
`;
