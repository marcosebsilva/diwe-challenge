import React, { useCallback, useEffect, useState } from 'react';
import BaseInput from 'components/UI/BaseInput';
import BaseButton from 'components/UI/BaseButton';
import { useNavigate } from 'react-router-dom';
import useToken from 'hooks/useToken';
import * as Auth from 'services/auth';
import * as Styled from './style';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useToken();
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('dashboard');
    }
  }, []);

  const handleChange = useCallback((event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  });

  const handleLogin = async (event) => {
    setShowErrorMsg(false);
    event.preventDefault();
    try {
      const data = await Auth.login({ email, password });
      setToken(data.token);
      navigate('dashboard');
    } catch (error) {
      setShowErrorMsg(true);
    }
  };

  return (
    <Styled.Wrapper>
      <h1>{token}</h1>
      <Styled.TitleWrapper>
        <h1>Bem-vindo!</h1>
        <h2>Faça login para acessar nossa plataforma</h2>
      </Styled.TitleWrapper>
      <Styled.Form>
        <BaseInput
          autoComplete="email"
          value={email}
          handleChange={handleChange}
          placeholder="Digite seu email"
          label="Email"
          name="email"
        />
        <BaseInput
          autoComplete="current-password"
          value={password}
          type="password"
          handleChange={handleChange}
          placeholder="Digite sua senha"
          label="Senha"
          name="password"
        />
      </Styled.Form>
      {showErrorMsg && (
        <Styled.ErrorMsg data-testid="login-error-message">
          Credenciais inválidas.
        </Styled.ErrorMsg>
      )}
      <BaseButton
        testid="login-action"
        handleClick={handleLogin}
      >
        Fazer login
      </BaseButton>
    </Styled.Wrapper>
  );
}
