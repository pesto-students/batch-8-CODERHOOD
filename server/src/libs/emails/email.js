const nodemailer = require('nodemailer');

const gmailEmail = process.env.GMAIL_PASSWORD || '';
const gmailPassword = process.env.GMAIL_EMAIL || '';


const sendEmail = async ({
  to, from, subject, text, html,
}) => {
  const user =
    process.env.MAILGUN_EMAIL || "";
  const pass = process.env.MAILGUN_PASSWORD || "";

  const smtpConfig = {
    service:  'Mailgun',
    host: "smtp.mailgun.org",
    port: 587,
    secure: true, 
    auth: { user, pass, },
  };
  
  const transporter = nodemailer.createTransport(smtpConfig);
  const emailSentResponse = await transporter.sendMail({
    to, from, subject, text, html,
  });

  return emailSentResponse;
};

const sendGmailEmail = async ({ to, from, subject, text, html }) => {
  const smtpConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: gmailEmail,
      pass: gmailPassword
    }
  };
  const transporter = nodemailer.createTransport(smtpConfig);
  const emailSentResponse = await transporter.sendMail({
    to,
    from,
    subject,
    text,
    html
  });

  return emailSentResponse;
};

const sendWorkspaceInvite = async (invite) => {
  const {name, email, type, user} = invite;
  const htmlTemplate = `<p>Hello ${name},</p>
    <p>You have been invited to join a workspace on CoderHood. Please sign in to <a href="https://coderhood.netlify.com">CoderHood</a> to accept the invite.</p>
    <p>Thank you,<br />Team CoderHood</p>
  `;
  const sendOptions = {
    to: email,
    from: '"Team CoderHood" <coderhood@testkumbh.com>',
    subject: 'Invitation to join CoderHood Workspace',
    html: htmlTemplate,
  }
  return sendEmail(sendOptions);
};

module.exports = {
  sendEmail,
  sendWorkspaceInvite,
};
