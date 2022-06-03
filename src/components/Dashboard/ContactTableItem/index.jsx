// /* eslint-disable*/
import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useEditMode from 'hooks/useEditMode';
import deleteIcon from 'assets/icons/trash.svg';
import editIcon from 'assets/icons/edit.svg';
import * as Contacts from 'services/contacts';
import { useMutation } from 'react-query';
import useToken from 'hooks/useToken';
import { queryClient } from 'index';
import formatPhoneNumber from 'utils/functions/formatPhoneNumber';
import * as Styled from './style';

export default function ContactTableItem({ contact }) {
  const [editMode, toggleEditMode] = useEditMode();
  const [newEmail, setNewEmail] = useState(contact.email);
  const [newName, setNewName] = useState(contact.name);

  const isContactBeingEdited = useMemo(() => (
    editMode.open && (editMode.item === contact.id)
  ), [contact, editMode]);

  const [newPhone, setNewPhone] = useState(contact.mobile);
  const [token] = useToken();
  const {
    mutate: removeContactMutation,
    isSuccess: isRemoveSuccess,
  } = useMutation(Contacts.remove);

  const {
    mutate: editContactMutation,
    isSuccess: isEditSuccess,
  } = useMutation(Contacts.edit);

  const handleRemove = () => {
    removeContactMutation({ token, id: contact.id });
  };
  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setNewName(e.target.value);
    } else if (e.target.name === 'email') {
      setNewEmail(e.target.value);
    } else if (e.target.name === 'phone') {
      setNewPhone(e.target.value);
    }
  };
  const handleEdit = () => {
    editContactMutation({
      token,
      contact: {
        id: contact.id,
        name: newName,
        email: newEmail,
        mobile: newPhone,
      },
    });
    toggleEditMode();
  };
  const renderDefaultButtons = () => (
    <>
      <button
        type="button"
        onClick={() => toggleEditMode(contact.id)}
        onKeyDown={() => toggleEditMode(contact.id)}
        disabled={editMode.open && !isContactBeingEdited}
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
        disabled={editMode.open && !isContactBeingEdited}
      >
        <img
          src={deleteIcon}
          alt="Delete contact"
        />
        Excluir
      </button>
    </>
  );
  const renderEditModeButtons = () => (
    <>
      <button
        type="button"
        onClick={() => handleEdit(contact.id)}
        onKeyDown={() => handleEdit(contact.id)}
      >
        Confirmar
      </button>
      <button
        type="button"
        onClick={() => toggleEditMode()}
        onKeyDown={() => toggleEditMode()}
      >
        Cancelar
      </button>
    </>
  );

  useEffect(() => {
    if (isEditSuccess || isRemoveSuccess) {
      queryClient.refetchQueries(['allContacts']);
    }
  }, [isEditSuccess, isRemoveSuccess]);
  return (
    <Styled.Wrapper
      blur={editMode.open && !isContactBeingEdited}
      key={contact.id}
      data-testid="table-item"
    >
      <td data-testid="table-item-id">{contact.id}</td>
      <td data-testid="table-item-name">
        { isContactBeingEdited ? (
          <input
            name="name"
            onChange={handleChange}
            value={newName}
          />
        )
          : contact.name}
      </td>
      <td data-testid="table-item-mobile">
        { isContactBeingEdited ? (
          <input
            name="phone"
            onChange={handleChange}
            value={newPhone}
          />
        )
          : formatPhoneNumber(contact.mobile)}
      </td>
      <td data-testid="table-item-email">
        { isContactBeingEdited ? (
          <input
            name="email"
            onChange={handleChange}
            value={newEmail}
          />
        )
          : contact.email}
      </td>
      <Styled.OptionsWrapper>
        {isContactBeingEdited ? renderEditModeButtons() : renderDefaultButtons()}
      </Styled.OptionsWrapper>
    </Styled.Wrapper>
  );
}

ContactTableItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    mobile: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    email: PropTypes.string,
  }).isRequired,
};
