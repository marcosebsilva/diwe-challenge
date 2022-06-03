import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://contacts-api.prd.parceirodaconstrucao.com.br/contacts',
});

export async function getAll(token) {
  const response = await contactsInstance.get('/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function remove({ token, id }) {
  const response = await contactsInstance.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function register({ token, contact }) {
  const response = await contactsInstance.post('/', contact, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function edit({ token, contact }) {
  const { id, ...body } = contact;
  const response = await contactsInstance.put(`/${contact.id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
