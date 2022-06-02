import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styles';

export default function BaseButton({ children, handleClick, testid }) {
  return (
    <Styled.Button
      data-testid={testid}
      onClick={handleClick}
    >
      { children }
    </Styled.Button>
  );
}

BaseButton.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
  testid: PropTypes.string,
}.isRequired;
