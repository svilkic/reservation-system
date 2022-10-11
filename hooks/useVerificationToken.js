import React, { useEffect, useState } from 'react';
import { sendToken } from '/helpers/email';

const RETRY_TIME = 60; //Time in which user can retry

export function useVerificationToken() {
  const [verificationToken, setVerificationToken] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [wait, setWait] = useState(false);

  function generateToken() {
    return parseInt(new Date().getTime(), 10).toString(16) + Math.ceil(Math.random()); //Current time in ms to base16
  }

  async function sendVerificationToken(email) {
    setWait(true);
    setSending(true);
    setError('');
    try {
      let token = generateToken();
      // const result = await sendToken(email, token);
      const result = { status: 200 };

      if (result.status == 200) {
        setVerificationToken(token);
      } else {
        setError(result.text);
      }
      setSending(false);
    } catch (error) {
      setSending(false);
      setError(error.text);
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, RETRY_TIME * 1000);
  }, [verificationToken]);

  function checkIfTokenValid(token) {
    console.log(token);
    console.log(verificationToken);
    if (verificationToken && token === verificationToken) return true;
    return false;
  }

  return { verificationToken, sending, wait, error, sendVerificationToken, checkIfTokenValid };
}
