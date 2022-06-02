import React from 'react';
import LoginForm from 'components/Login/LoginForm';
import loginImage from 'assets/images/login-image.svg';
import * as Styled from './styles';

export default function Login() {
  return (
    <Styled.Wrapper>
      <img src={loginImage} alt="Guy using a notebook in a very blue-ish scenario." />
      <LoginForm />
    </Styled.Wrapper>
  );
}
