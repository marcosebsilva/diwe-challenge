import styled from 'styled-components';

export const Header = styled.header`
  height: 88px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  margin-bottom: 4px;
  padding-inline: 64.3px;
  z-index: 10000;
  display: flex;
  button {
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 8px;
    img {
      width: 40px;
      aspect-ratio: 1 / 1;
      opacity: 0.64;
    }
  }
`;
