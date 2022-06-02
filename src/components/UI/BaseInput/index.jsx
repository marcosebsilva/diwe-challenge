import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

export default function BaseInput({
  label, testid, required, autoComplete, handleChange, placeholder, value, maxlength, name, type = 'text',
}) {
  const id = useMemo(() => `${name}-input`, [name]);
  return (
    <div>
      <Styled.Label htmlFor={id} className="base-input">
        {label}
      </Styled.Label>
      <Styled.Input
        required={required}
        data-testid={testid || id}
        maxLength={maxlength}
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
  autoComplete: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  maxlength: PropTypes.number,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string,
};

BaseInput.defaultProps = {
  required: false,
  maxlength: 524288,
  placeholder: '',
  autoComplete: '',
  type: 'text',
  testid: false,
};
