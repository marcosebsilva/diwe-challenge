/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React, { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import interceptApi from './helpers/interceptApi';
import Login from '../pages/Login';

describe('1.When rendering login page', () => {
  let eventCaller;
  let emailInput;
  let loginButton;
  let passwordInput;
  beforeEach(() => {
    const { user } = renderWithRouter(<Login />);
    emailInput = screen.getByTestId('email-input');
    loginButton = screen.getByTestId('login-button');
    passwordInput = screen.getByTestId('password-input');
    eventCaller = user;
  });
  beforeAll(() => interceptApi.listen());
  afterEach(() => interceptApi.resetHandlers());
  afterAll(() => interceptApi.close());

  test('shows error message if credentials are wrong', async () => {
    await eventCaller.type(emailInput, 'wrongLogin@gmail.com');
    await eventCaller.type(passwordInput, 'wrong-password');

    await eventCaller.click(loginButton);
    await waitFor(() => {
      expect(screen.getByTestId('login-error-msg')).toBeInTheDocument();
      expect(screen.getByTestId('login-error-msg')).toHaveTextContent('Credenciais inválidas.');
    });
  });
});
