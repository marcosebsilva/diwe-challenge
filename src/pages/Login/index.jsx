import React from 'react';
import LoginForm from 'components/LoginForm';
import loginImage from 'assets/login-image.svg';
import * as Styled from './styles';

export default function Login() {
  return (
    <Styled.Wrapper>
      <img src={loginImage} alt="Very cool" />
      <LoginForm />
    </Styled.Wrapper>
  );
}
