import React from 'react';

// Reusable form field component - single responsibility for rendering a form input

const FormField = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  error,
  disabled,
  required = false
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
        disabled={disabled}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormField;
