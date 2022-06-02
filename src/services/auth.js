import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://contacts-api.prd.parceirodaconstrucao.com.br/auth',
});

export async function login(body) {
  const response = await authInstance.post('/login', body);
  return response.data;
}
