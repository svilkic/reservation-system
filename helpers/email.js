import emailjs from 'emailjs-com';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_VERIFICATION = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_VERIFICATION;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const sendToken = async (email, verificationToken) => {
  const data = {
    serviceID: EMAILJS_SERVICE_ID,
    templateID: EMAILJS_TEMPLATE_VERIFICATION,
    email,
    verificationToken,
    publicKey: EMAILJS_PUBLIC_KEY,
  };

  const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_VERIFICATION, data, EMAILJS_PUBLIC_KEY);
  return result;
};
