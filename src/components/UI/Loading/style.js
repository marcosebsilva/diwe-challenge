import styled, { keyframes } from 'styled-components';
import colors from 'styles/colors.json';
// all this came from https://loading.io/css/

const rotate = keyframes`
0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

export const Loading = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    border: 4px solid ${colors['primary-dark']};
    opacity: 1;
    border-radius: 50%;
    animation: ${rotate} 1.5s cubic-bezier(0, 0.2, 0.2, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.7s;
  }    
`;
