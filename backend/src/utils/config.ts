import { getSettingsGroup } from './settings';

export const getConfig = async (group: string, key: string, envVar?: string, defaultValue?: string): Promise<string | undefined> => {
  const settings = await getSettingsGroup(group);
  return settings[key] || (envVar ? process.env[envVar] : undefined) || defaultValue;
};

export const getPaymentConfig = async () => {
  return {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
    currency: process.env.RAZORPAY_CURRENCY || 'INR'
  };
};

export const getSmtpConfig = async () => {
  const smtp = await getSettingsGroup('smtp');
  return {
    host: smtp.host || process.env.SMTP_HOST || process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(smtp.port || process.env.SMTP_PORT || process.env.EMAIL_PORT || '587'),
    secure: (smtp.secure || process.env.SMTP_SECURE || process.env.EMAIL_SECURE) === 'true',
    user: smtp.username || process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: smtp.password || process.env.SMTP_PASS || process.env.EMAIL_PASS,
    from: smtp.from || process.env.SMTP_FROM || process.env.EMAIL_FROM || `"Sajan Shah" <${smtp.username || process.env.SMTP_USER || process.env.EMAIL_USER}>`
  };
};
