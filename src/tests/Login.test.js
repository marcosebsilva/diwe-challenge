/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React, { screen, waitFor } from '@testing-library/react';
import { createServer, Response } from 'miragejs';
import Login from 'pages/Login';
import renderWithRouter from './helpers/renderWithRouter';

describe('1.When rendering login page', () => {
  let server;
  let eventCaller;
  let emailInput;
  let loginButton;
  let passwordInput;
  beforeEach(() => {
    const { user } = renderWithRouter(<Login />);
    server = createServer({
      environment: 'test',
      urlPrefix: 'https://contacts-api.prd.parceirodaconstrucao.com.br',
    });
    emailInput = screen.getByTestId('email-input');
    loginButton = screen.getByTestId('login-button');
    passwordInput = screen.getByTestId('password-input');
    eventCaller = user;
  });
  afterEach(() => server.shutdown());

  test('shows error message if credentials are wrong', async () => {
    server.post('/auth/login', () => new Response(401));

    await eventCaller.type(emailInput, 'user@gmail.com');
    await eventCaller.type(passwordInput, '12345');

    await eventCaller.click(loginButton);
    await waitFor(() => {
      expect(screen.getByTestId('login-error-msg')).toBeInTheDocument();
      expect(screen.getByTestId('login-error-msg')).toHaveTextContent('Credenciais inválidas.');
    });
  });
  test('does not show error messagge if credentials are right', async () => {
    server.post('/auth/login', () => ({ token: '12345' }));

    await eventCaller.type(emailInput, 'user@gmail');
    await eventCaller.type(passwordInput, '12345');

    await eventCaller.click(loginButton);

    await waitFor(() => {
      expect(screen.queryByText('Credenciais inválidas.')).toBeNull();
    });
  });
});
