const nodemailer = require('nodemailer');

const gmailEmail = process.env.GMAIL_PASSWORD || '';
const gmailPassword = process.env.GMAIL_EMAIL || '';

const sendEmail = async ({
  to, from, subject, text, html,
}) => {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  };
  const transporter = nodemailer.createTransport(smtpConfig);
  const info = await transporter.sendMail({
    to, from, subject, text, html,
  });

  return info;
};
