import React from 'react';

export function ArrowLeft({ className, onClick }) {
  return (
    <svg
      className={className}
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='2em'
      width='2em'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
    >
      <path d='M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z'></path>
    </svg>
  );
}

export function ArrowRight({ className, onClick }) {
  return (
    <svg
      className={className}
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='2em'
      width='2em'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
    >
      <path d='M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z'></path>
    </svg>
  );
}
