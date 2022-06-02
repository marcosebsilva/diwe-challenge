import React, {
  useState, useEffect, useRef, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import deleteIcon from 'assets/icons/trash.svg';
import editIcon from 'assets/icons/edit.svg';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as Contacts from 'services/contacts';
import useToken from 'hooks/useToken';
import formatPhoneNumber from 'utils/functions/formatPhoneNumber';
import * as Styled from './style';

export default function ContactTable({ contacts, refetch }) {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [token] = useToken();
  const timeoutRef = useRef();
  const {
    isError,
    isSuccess,
    mutate,
  } = useMutation(Contacts.remove);

  const sortedContacts = useMemo(() => {
    const sortable = [...contacts];
    const { key, direction } = sortConfig;
    if (key !== null) {
      sortable.sort((a, b) => {
        if (typeof a[key] === 'string') {
          return direction === 'asc'
            ? b[key].localeCompare(a[key])
            : a[key].localeCompare(b[key]);
        }
        return direction === 'asc'
          ? b[key] - a[key]
          : a[key] - b[key];
      });
    }
    return sortable;
  }, [sortConfig, contacts]);

  const navigate = useNavigate();

  const headersSort = [
    { name: '#', key: 'id' },
    { name: 'Nome', key: 'name' },
    { name: 'Celular', key: 'mobile' },
    { name: 'Email', key: 'email' },
  ];

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
    let direction = 'asc';
    if (key === sortConfig.key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }

    if (isError) {
      setShowErrorMsg(true);
      const THREE_SECONDS = 3000;
      timeoutRef.current = setTimeout(() => setShowErrorMsg(false), THREE_SECONDS);
    }

    return () => clearTimeout(timeoutRef);
  }, [isSuccess, isError]);

  return (
    <Styled.Wrapper>
      { showErrorMsg && <Styled.ErrorMsg>Falha ao remover o usuário.</Styled.ErrorMsg>}
      <Styled.TitleAndButtonWrapper>
        <h1>Listagem de produtos</h1>
        <button
          data-testid="add-contact-action"
          type="button"
          onClick={handleAdd}
        >
          Adicionar novo contato

        </button>
      </Styled.TitleAndButtonWrapper>
      <Styled.Table>
        <thead>
          <tr>
            {headersSort.map((header, index) => (
              <th
                data-testid={`sort-${header.key}`}
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
          {sortedContacts.map((contact) => (
            <tr key={contact.id} data-testid="table-item">
              <td data-testid="table-item-id">{contact.id}</td>
              <td data-testid="table-item-name">{contact.name}</td>
              <td data-testid="table-item-mobile">{formatPhoneNumber(contact.mobile)}</td>
              <td data-testid="table-item-email">{contact.email}</td>
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
                    data-testid="delete-item"
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
