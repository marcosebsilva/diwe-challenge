import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

export default function BaseInput({
  label, autoComplete, handleChange, placeholder, value, name, type = 'text',
}) {
  const id = useMemo(() => `${name}-input`, [name]);
  return (
    <div>
      <Styled.Label htmlFor={id} className="base-input">
        {label}
      </Styled.Label>
      <Styled.Input
        data-testid={id}
        type={type}
        id={id}
        autoComplete={autoComplete}
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
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
}.required;
