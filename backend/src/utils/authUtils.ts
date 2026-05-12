import crypto from 'crypto';

export const generateSetupToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const getSetupTokenExpiry = () => {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 24); // 24 hours
  return expiry;
};
