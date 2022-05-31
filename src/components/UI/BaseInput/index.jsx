import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

export default function BaseInput({
  label, handleChange, placeholder, value, name,
}) {
  const id = useMemo(() => `${name}-input`, [name]);
  return (
    <div data-testid={id}>
      <Styled.Label htmlFor={id} className="base-input">
        {label}
      </Styled.Label>
      <Styled.Input
        id={id}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

BaseInput.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
}.required;
