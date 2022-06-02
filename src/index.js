/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from './styles/globalStyle';
import App from './App';
import { TokenProvider } from './hooks/useToken';
import reportWebVitals from './reportWebVitals';

import { makeServer } from './server/mirageServer';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TokenProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
