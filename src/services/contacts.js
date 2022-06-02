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
