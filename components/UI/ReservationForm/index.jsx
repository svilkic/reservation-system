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
    e.preventDefault();
    console.log(data);
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

  return (
    <section className={styles.section}>
      <div className={styles.form}>
        <Input
          id='ime'
          field='ime'
          type='text'
          initial={data.firstName}
          onChange={(value) => {
            setData((prev) => ({ ...prev, ['firstName']: value }));
          }}
          required
        />
        <Input
          id='prezime'
          field='prezime'
          type='text'
          initial={data.lastName}
          onChange={(value) => {
            setData((prev) => ({ ...prev, ['lastName']: value }));
          }}
          required
        />
        <Input
          id='telefon'
          field='telefon'
          type='text'
          initial={data.phone}
          onChange={(value) => {
            setData((prev) => ({ ...prev, ['phone']: value }));
          }}
          required
        />
        <Input
          id='email'
          field='Email'
          type='email'
          initial={data.email}
          onChange={(value) => {
            setData((prev) => ({ ...prev, ['email']: value }));
          }}
          required
        />
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
