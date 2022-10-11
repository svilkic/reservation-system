import React from 'react';
import styles from './verificationbutton.module.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function VerificationButton({ email, verificationToken, error, sending, sendVerificationToken, wait }) {
  const onSend = async () => {
    if (email) await sendVerificationToken(email);
  };

  return (
    <>
      {verificationToken && <span className={styles.info}>Check your email.</span>}
      {error && <span className={styles.error}>{error}</span>}
      <button className={styles.verificationButton} onClick={onSend} disabled={sending || wait}>
        {sending ? (
          <>
            <AiOutlineLoading3Quarters className={styles.spin} /> Sending
          </>
        ) : (
          'Send Verification Code'
        )}
      </button>
    </>
  );
}
