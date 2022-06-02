import React from 'react';
import arrowLeft from 'assets/icons/arrow-left.svg';
import { useNavigate } from 'react-router-dom';
import * as Styled from './style';

export default function DashboardHeader() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <Styled.Header>
      <button type="button" onClick={handleClick}>
        <img src={arrowLeft} alt="Arrow icon" />
        <h2>Voltar</h2>
      </button>
    </Styled.Header>
  );
}
