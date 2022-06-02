import React, { useEffect } from 'react';
import ContactTable from 'components/Dashboard/ContactTable';
import * as Contacts from 'services/contacts';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import DashboardHeader from 'components/Dashboard/DashboardHeader';
import Loading from 'components/UI/Loading';
import useToken from 'hooks/useToken';
import * as Styled from './styles';

export default function Dashboard() {
  const [token] = useToken();
  const {
    data, isError, refetch, isLoading,
  } = useQuery('allContacts', () => Contacts.getAll(token));

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError]);

  const renderComponent = () => {
    if (isLoading) return <Loading />;

    if (isError) return <h1>Redirecionando...</h1>;

    return <ContactTable contacts={data.data} refetch={refetch} />;
  };

  return (
    <>
      <DashboardHeader />
      <Styled.Wrapper>
        {renderComponent()}
      </Styled.Wrapper>
    </>
  );
}
