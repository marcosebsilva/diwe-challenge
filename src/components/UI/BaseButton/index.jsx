import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styles';

export default function BaseButton({ children, handleClick }) {
  return (
    <Styled.Button
      onClick={handleClick}
      data-testid="login-button"
    >
      { children }
    </Styled.Button>
  );
}

BaseButton.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
}.isRequired;
