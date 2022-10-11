import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
// Styles
import styles from './hourpicker.module.css';

export function Hour({ hour, reserved, onClick, className }) {
  const statusClass = reserved ? styles.reserved : styles.available;
  return (
    <div className={`${className} ${statusClass} ${styles.hour}`} onClick={onClick}>
      <span>{hour}:00</span>
      <span>{reserved ? 'Reserved' : <BiChevronRight />}</span>
    </div>
  );
}

Hour.defaultProps = {
  hour: 0,
  reserved: false,
  onClick: () => {},
  className: '',
};
