import { createServer, Model, Response } from 'miragejs';
import mockContacts from './contacts.json';

export function makeServer({ environment = 'test' } = {}) {
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

      server.create('auth', {
        email: 'valid.email@gmail.com',
        password: 'valid.password',
        token: 'iamavalidtokenfearme',
      });
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
    },
  });
  return newServer;
}
