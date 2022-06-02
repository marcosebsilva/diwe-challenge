import { createServer, Model, Response } from 'miragejs';
import mockContacts from './contacts.json';

export const VALID_USER = {
  email: 'valid.email@gmail.com',
  password: 'valid.password',
  token: 'iamavalidtokenfearme',
};

export function makeServer({ environment = 'development' } = {}) {
  const newServer = createServer({
    environment,
    models: {
      contact: Model,
      auth: Model,
    },
    seeds: (server) => {
      mockContacts.forEach((contact) => {
        server.create('contact', contact);
      });

      server.create('auth', VALID_USER);
    },
    routes() {
      this.urlPrefix = 'https://contacts-api.prd.parceirodaconstrucao.com.br';
      this.post('/auth/login', (schema, request) => {
        const body = JSON.parse(request.requestBody);

        const foundUser = schema.auths.findBy({ email: body.email, password: body.password });

        if (foundUser) {
          return { token: foundUser.token };
        }
        return new Response(401);
      });
      this.get('/contacts', (schema, request) => {
        const { Authorization } = request.requestHeaders;
        const validUser = schema.auths.first();
        if (Authorization.replace('Bearer', '').trim() === validUser.token) {
          return schema.contacts.all().models;
        }
        return new Response(401);
      });
      this.post('/contacts', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const { Authorization } = request.requestHeaders;
        const validUser = schema.auths.first();

        if (Authorization.replace('Bearer', '').trim() !== validUser.token) {
          return new Response(401);
        }

        const bodyKeys = Object.keys(body).sort();
        const expectedKeys = ['email', 'mobile', 'name'];
        const bodyHasAllKeys = bodyKeys.every((key, index) => key === expectedKeys[index]);

        if (!bodyHasAllKeys) {
          return new Response(400);
        }

        schema.contacts.create(body);
        return new Response(201);
      });
      this.delete('/contacts/:id', (schema, request) => {
        const { Authorization } = request.requestHeaders;
        const validUser = schema.auths.first();
        if (Authorization.replace('Bearer', '').trim() === validUser.token) {
          const { id } = request.params;
          return schema.contacts.find(id).destroy();
        }
        return new Response(401);
      });
    },
  });
  return newServer;
}
