import { rest } from 'msw';
import { setupServer } from 'msw/node';

const BASE_URL = 'https://contacts-api.prd.parceirodaconstrucao.com.br';
export const VALID_USER = {
  email: 'valid.email@gmail.com',
  password: 'valid.password',
};

export default setupServer(
  rest.post(`${BASE_URL}/auth/login`, (req, res, ctx) => res(ctx.status(400))),
);
