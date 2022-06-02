import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import arrowLeft from 'assets/icons/arrow-left.svg';
import useToken from 'hooks/useToken';
import * as Styled from './style';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setToken] = useToken();

  const handleClick = () => {
    if (location.pathname.includes('add')) {
      navigate('', { replace: true });
    } else {
      setToken(null);
      navigate('/');
    }
  };

  return (
    <>
      <Styled.Header>
        <button type="button" onClick={handleClick} data-testid="go-back">
          <img src={arrowLeft} alt="Arrow icon" />
          <h2>Voltar</h2>
        </button>
      </Styled.Header>
      <Styled.Wrapper>
        <Outlet />
      </Styled.Wrapper>
    </>
  );
}
