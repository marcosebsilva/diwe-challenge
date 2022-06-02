import React, { useEffect, useRef } from 'react';
import ContactTable from 'components/Dashboard/ContactTable';
import * as Contacts from 'services/contacts';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from 'components/UI/Loading';
import useToken from 'hooks/useToken';

export default function Dashboard() {
  const [token] = useToken();
  const {
    data, isError, refetch, isLoading,
  } = useQuery('allContacts', () => Contacts.getAll(token), { retry: 1 });
  const timeoutRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const ONE_SECOND = 1000;

    if (isError) {
      timeoutRef.current = setTimeout(() => {
        navigate('/');
      }, ONE_SECOND);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isError]);

  const renderComponent = () => {
    if (isLoading) return <Loading />;
    if (isError) return <p>Redirecionando...</p>;
    data.data.sort((a, b) => a.id - b.id);
    return <ContactTable contacts={data.data} refetch={refetch} />;
  };

  return (
    <>
      {renderComponent()}
    </>
  );
}
