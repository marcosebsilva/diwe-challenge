import styled from 'styled-components';
import colors from 'styles/colors.json';

export const Table = styled.table`
  margin-top: 62px;
  background-color: white;
  width: 100%;
  position: relative;
  border-collapse: collapse;
  th {
    text-align: left;
    &:hover {
      filter: brightness(150%);
    }
    div {
      pointer-events: none;
      color: ${colors['primary-medium']};
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 120%;
      display: flex;
      gap: 9px;
      align-items: center;
    }
  }
  
  tr, td, th {
    max-height: 64px;
    padding-inline: 30px;
  }

  /* headers */
  
  /* every even, including headers */
  tbody {
    td:first-child {
      color: ${colors['neutral-dark']};
    }
    tr:nth-child(odd) {
      background-color: ${colors['neutral-light']};
    }
  }
  
  thead {
    tr {
      font-weight: 500;
      color: ${colors['neutral-dark']};
      border-bottom: 2px solid rgba(173, 181, 189, 0.64);
    }
  }


  td:first-child,
  th:first-child {
  padding-top:20px;
  padding-bottom:20px;
  padding-left:20px;
}

`;

export const Wrapper = styled.div`
  height: 100%;
  border-radius: 8px;
  position: relative;
  overflow-y: auto;
  padding: 40px 37px 43px;
  background-color: white;
  box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.04);
`;

export const TitleAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.5rem;
  }
  button {
    background-color: ${colors['focus-dark']};
    padding: 24px 16px;
    border-radius: 8px;
    font-weight: 500;
    color: white;
    font-size: 1rem;
    line-height: 148%;
    height: 56px;
    display: flex;
    align-items: center;
    &:hover {
      filter: brightness(105%);
    }
  }
`;

// Both arrows came from https://css-tricks.com/snippets/css/css-triangle/
export const ArrowDown = styled.div`
  width: 0; 
  height: 0; 
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid ${colors['primary-medium']};
`;

export const ArrowUp = styled.div`
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;
`;

export const OptionsWrapper = styled.div`
  display: flex;
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

export const ErrorMsg = styled.span`
  position: absolute;
  top: 15px;
  color: red;
`;
