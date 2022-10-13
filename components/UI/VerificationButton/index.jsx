import React, { useEffect } from 'react';
import styles from './verificationbutton.module.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function VerificationButton({
  email,
  verificationToken,
  error,
  sending,
  sendVerificationToken,
  wait,
  disabled,
}) {
  const onSend = async () => {
    if (email) await sendVerificationToken(email);
  };

  useEffect(() => {
    console.log(sending, wait, disabled);
  });
  return (
    <>
      {/* TEST: Izbrisi ovu liniju */}
      {verificationToken}
      {verificationToken && <span className={styles.info}>Check your email.</span>}
      {error && <span className={styles.error}>{error}</span>}
      <button className={styles.verificationButton} onClick={onSend} disabled={sending || wait || !disabled}>
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

VerificationButton.defaultProps = {
  email: '',
  verificationToken: '',
  error: null,
  sending: false,
  sendVerificationToken: () => {},
  wait: false,
  disabled: true,
};
