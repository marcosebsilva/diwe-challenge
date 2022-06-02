import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 100%;
  max-height: 543px;
  padding: 49px 32px 40px;
  max-width: 808px;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  min-width: 100%;
  gap: 0 22px;
  div:nth-child(-1n+3) {
    flex-grow: 2;
  }
  div:nth-child(1) {
    min-width: 100%;
  }
  button {
    margin-top: auto;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  h2 {
    font-size: 1rem;
  }
`;

export const Feedback = styled.span`
  color: ${(props) => props.color};
  position: absolute;
  top: 20%;
  text-align: center;
  width: 100%;
  display: block;
`;
