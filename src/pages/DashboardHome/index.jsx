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
  } = useQuery('allContacts', () => Contacts.getAll(token), { retry: 1 });

  const navigate = useNavigate();

  useEffect(() => {
    const ONE_SECOND = 1000;
    if (isError) {
      setTimeout(() => {
        navigate('/');
      }, ONE_SECOND);
    }
  }, [isError]);

  const renderComponent = () => {
    if (isLoading) return <Loading />;
    if (isError) return <p>Redirecionando...</p>;
    data.data.sort((a, b) => a.id - b.id);
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
