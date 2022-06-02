import React from 'react';
import DashboardHeader from 'components/Shared/Header';
import { Outlet } from 'react-router-dom';
import * as Styled from './style';

export default function DashboardLayout() {
  return (
    <>
      <DashboardHeader />
      <Styled.Wrapper>
        <Outlet />
      </Styled.Wrapper>
    </>
  );
}
