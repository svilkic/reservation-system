import React, { useState } from 'react';
import { Input } from '/components/UI/Input';
// Styles
import styles from './reservationform.module.css';
import { VerificationButton } from '../VerificationButton';
import { useVerificationToken } from 'hooks/useVerificationToken';

export function ReservationForm({ onReserve }) {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    verificationToken: '',
  });

  const { checkIfTokenValid, ...rest } = useVerificationToken();

  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    if (!checkIfTokenValid(data.verificationToken)) {
      alert('Wrong Verification Token');
      return;
    }
    if (data.firstName && data.lastName && data.phone && data.email && data.verificationToken) onReserve(data);
    else {
      alert('Please fill in all fields');
      return;
    }
  };

  const handleProductInput = (value, field) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className={styles.section}>
      <div className={styles.form}>
        {inputFileds.map((field) => (
          <Input
            key={field.id}
            id={field.id}
            field={field.field}
            type={field.type}
            initial={field.initial}
            onChange={(e) => {
              handleProductInput(e, field.id);
            }}
          />
        ))}
        <VerificationButton email={data.email} {...rest} />
        <Input
          id='verification'
          field='Verifikacioni kod'
          type='text'
          onChange={(value) => {
            setData((prev) => ({ ...prev, ['verificationToken']: value }));
          }}
        />
        <button className={styles.btn} onClick={handleSubmit}>
          Reserve
        </button>
      </div>
    </section>
  );
}

const inputFileds = [
  { id: 1, id: 'firstName', field: 'ime', type: 'text', placeholder: '' },
  { id: 2, id: 'lastName', field: 'prezime', type: 'text', placeholder: '' },
  { id: 3, id: 'phone', field: 'telefon', type: 'tel', placeholder: '' },
  { id: 4, id: 'email', field: 'email', type: 'email', placeholder: '' },
];
