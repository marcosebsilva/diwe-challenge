/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { TokenProvider } from 'hooks/useToken';
import { QueryClientProvider, QueryClient } from 'react-query';

const mockedQueryClient = new QueryClient();

function AllTheProviders({ children }) {
  return (
    <BrowserRouter>
      <TokenProvider>
        <QueryClientProvider client={mockedQueryClient}>
          {children}
        </QueryClientProvider>
      </TokenProvider>
    </BrowserRouter>
  );
}
export default function renderWithRouter(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders }),
  };
}
