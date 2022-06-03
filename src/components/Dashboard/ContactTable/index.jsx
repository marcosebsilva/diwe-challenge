import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { EditModeProvider } from 'hooks/useEditMode';
import * as Styled from './style';
import ContactTableItem from '../ContactTableItem';

export default function ContactTable({ contacts }) {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

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

  const handleAdd = () => {
    navigate('add');
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (key === sortConfig.key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Styled.Wrapper>
      <Styled.TitleAndButtonWrapper>
        <h1>Listagem de produtos</h1>
        <button
          data-testid="go-to-add-contact"
          type="button"
          onClick={handleAdd}
        >
          Adicionar novo contato
        </button>
      </Styled.TitleAndButtonWrapper>
      <EditModeProvider>
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
              <ContactTableItem key={contact.id} contact={contact} />
            ))}
          </tbody>
        </Styled.Table>
      </EditModeProvider>
    </Styled.Wrapper>
  );
}

ContactTable.propTypes = {
  contacts: PropTypes.arrayOf(Object),
  refetch: PropTypes.func,
}.isRequired;
