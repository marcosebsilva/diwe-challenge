import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 504px;
  max-height: 468px;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  h1, h2 {

    text-align: center;
  }
`;
