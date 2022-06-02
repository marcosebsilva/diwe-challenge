import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import deleteIcon from 'assets/icons/trash.svg';
import editIcon from 'assets/icons/edit.svg';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as Contacts from 'services/contacts';
import useToken from 'hooks/useToken';
import * as Styled from './style';

export default function ContactTable({ contacts, refetch }) {
  const [toggleSort, setToggleSort] = useState('asc');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [token] = useToken();
  const timeoutRef = useRef();
  const {
    isError,
    isSuccess,
    mutate,
  } = useMutation(Contacts.remove);

  const [sortKey, setSortKey] = useState('id');
  const navigate = useNavigate();

  const headersSort = [
    { name: '#', key: 'id' },
    { name: 'Nome', key: 'name' },
    { name: 'Celular', key: 'mobile' },
    { name: 'Email', key: 'email' },
  ];
  const formatPhoneNumber = (number) => (
    `(${number.toString().slice(0, 2)}) ${number.toString().slice(3, 7)} - ${number.toString().slice(8)}`
  );
  const handleEdit = (e, contact) => {
    e.stopPropagation();
    navigate(`edit/${contact.id}`);
  };
  const handleAdd = () => {
    navigate('add');
  };
  const handleRemove = (contact) => {
    mutate({ token, id: contact.id });
  };
  const handleSort = (key) => {
    setSortKey(key);
    if (key === sortKey) {
      setToggleSort((previous) => (previous === 'asc' ? 'desc' : 'asc'));
    } else {
      setToggleSort('asc');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }

    if (isError) {
      setShowErrorMsg(true);
      const THREE_SECONDS = 3000;
      setTimeout(() => setShowErrorMsg(false), THREE_SECONDS);
    }

    return () => clearTimeout(timeoutRef);
  }, [isSuccess, isError]);

  useEffect(() => {
    contacts.sort((a, b) => {
      if (typeof a[sortKey] === 'string') {
        return toggleSort === 'asc'
          ? a[sortKey].localeCompare(b[sortKey])
          : b[sortKey].localeCompare(a[sortKey]);
      }
      return toggleSort === 'asc'
        ? a[sortKey] - b[sortKey]
        : b[sortKey] - a[sortKey];
    });
  }, [toggleSort, sortKey]);

  return (
    <Styled.Wrapper>
      { showErrorMsg && <Styled.ErrorMsg>Falha ao remover o usuário.</Styled.ErrorMsg>}
      <Styled.TitleAndButtonWrapper>
        <h1>Listagem de produtos</h1>
        <button type="button" onClick={handleAdd}>Adicionar novo contato</button>
      </Styled.TitleAndButtonWrapper>
      <Styled.Table>
        <thead>
          <tr>
            {headersSort.map((header, index) => (
              <th
                key={`${header.key}`}
                onClick={() => handleSort(header.key)}
                onKeyDown={() => handleSort(header.key)}
                role="button"
                tabIndex={index}
              >
                <div>
                  {header.name}
                  <Styled.ArrowDown />
                </div>
              </th>

            ))}
            <th>
              <div>
                Ações
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.mobile && formatPhoneNumber(contact.mobile)}</td>
              <td>{contact.email}</td>
              <td>
                <Styled.OptionsWrapper>
                  <button
                    type="button"
                    onClick={(e) => handleEdit(e, contact)}
                    onKeyDown={(e) => handleEdit(e, contact)}
                  >
                    <img
                      src={editIcon}
                      alt="Edit contact"
                    />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(contact)}
                    onKeyDown={() => handleRemove(contact)}
                  >
                    <img
                      src={deleteIcon}
                      alt="Delete contact"
                    />
                    Excluir
                  </button>
                </Styled.OptionsWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </Styled.Table>
    </Styled.Wrapper>
  );
}

ContactTable.propTypes = {
  contacts: PropTypes.arrayOf(Object),
  refetch: PropTypes.func,
}.isRequired;
