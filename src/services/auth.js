import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://contacts-api.prd.parceirodaconstrucao.com.br/auth',
});

export async function login(body) {
  try {
    const response = await authInstance.post('/login', body);
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.message);
    }
    throw new Error('Unexpected request error.');
  }
}
