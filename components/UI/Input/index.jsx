import React, { useEffect, useState } from 'react';
// Styles
import styles from './input.module.css';

const INPUT_TYPES = ['text', 'number', 'password', 'email', 'checkbox', 'file', 'tel'];

export function Input({ id, field, type, onChange, initial, options, placeholder, ...rest }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  const handleChange = (e) => {
    let value = e.target.value;
    setValue(value);
    onChange(value);
  };

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{field}:</label>
      {INPUT_TYPES.indexOf(type) > -1 ? (
        <input
          id={field}
          name='id'
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...rest}
        />
      ) : undefined}
      {type === 'select' && (
        <select id={field} name='id' value={value} onChange={handleChange} {...rest}>
          {options.map(({ id, name: value }) => (
            <option key={id} value={id}>
              {value}
            </option>
          ))}
        </select>
      )}
      {type === 'textarea' && (
        <textarea
          id={field}
          name='id'
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...rest}
        ></textarea>
      )}
    </div>
  );
}

Input.defaultProps = {
  id: '',
  field: '',
  type: 'text',
  placeholder: '',
  initial: '',
  onChange: () => {},
  options: [],
};
