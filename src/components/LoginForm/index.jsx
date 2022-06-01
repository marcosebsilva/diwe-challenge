import React, { useCallback, useState } from 'react';
import BaseInput from 'components/UI/BaseInput';
import BaseButton from 'components/UI/BaseButton';
import { useNavigate } from 'react-router-dom';
import useToken from 'hooks/useToken';
import * as Auth from 'services/auth';
import * as Styled from './style';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setToken] = useToken();
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const navigate = useNavigate();

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
      <Styled.TitleWrapper>
        <h1>Bem-vindo!</h1>
        <h2>Faça login para acessar nossa plataforma</h2>
      </Styled.TitleWrapper>
      <Styled.Form>
        <BaseInput
          value={email}
          handleChange={handleChange}
          placeholder="Digite seu email"
          label="Email"
          name="email"
        />
        <BaseInput
          value={password}
          type="password"
          handleChange={handleChange}
          placeholder="Digite sua senha"
          label="Senha"
          name="password"
        />
      </Styled.Form>
      {showErrorMsg && (
        <Styled.ErrorMsg data-testid="login-error-msg">
          Credenciais inválidas.
        </Styled.ErrorMsg>
      )}
      <BaseButton
        handleClick={handleLogin}
        data-testid="login-button"
      >
        Fazer login
      </BaseButton>
    </Styled.Wrapper>
  );
}
