import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const TokenContext = React.createContext('');

export function TokenProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const providerValue = useMemo(() => ([authToken, setAuthToken]), [authToken, setAuthToken]);
  return (
    <TokenContext.Provider value={providerValue}>
      {children}
    </TokenContext.Provider>
  );
}

export default function useToken() {
  return useContext(TokenContext);
}

TokenProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
