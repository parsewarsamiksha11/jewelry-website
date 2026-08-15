import http from 'http';
import { URL } from 'url';
import nodemailer from 'nodemailer';

const PORT = process.env.PORT || 3001;
const EMAIL_TO = 'velorejewelhub@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@localhost';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

let transporter = null;
let usingTestAccount = false;

async function ensureTransporter() {
  if (transporter) return transporter;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
    usingTestAccount = false;
    return transporter;
  }

  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  usingTestAccount = true;
  console.log('No SMTP configured - using Ethereal test account for email preview in development.');
  return transporter;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
}

async function mailContact(form) {
  const subject = `New enquiry: ${form.type || 'General Enquiry'} from ${form.name || 'Customer'}`;
  const text = [
    `Name: ${form.name || 'N/A'}`,
    `Email: ${form.email || 'N/A'}`,
    `Phone: ${form.phone || 'Not provided'}`,
    `Nature of Enquiry: ${form.type || 'N/A'}`,
    '',
    'Message:',
    form.message || '',
  ].join('\n');

  await ensureTransporter();
  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject,
    text,
    replyTo: form.email || undefined,
  });

  return info;
}

async function mailSubscribe({ email }) {
  const subject = 'Newsletter subscription';
  const text = `A user requested to subscribe to the newsletter.\nEmail: ${email || 'N/A'}`;

  await ensureTransporter();
  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject,
    text,
    replyTo: email || undefined,
  });

  return info;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (url.pathname === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const raw = (body || '').trim();
        const form = raw ? JSON.parse(raw) : {};

        if (!form.name || !form.email || !form.type || !form.message) {
          sendJson(res, 400, { message: 'Name, email, enquiry type, and message are required.' });
          return;
        }

        const info = await mailContact(form);
        const preview = usingTestAccount ? nodemailer.getTestMessageUrl(info) : undefined;
        sendJson(res, 200, { message: 'Message sent successfully.', preview });
      } catch (error) {
        sendJson(res, 500, {
          message: error instanceof Error ? error.message : 'Failed to send contact message.',
        });
      }
    });

    return;
  }

  if (url.pathname === '/api/subscribe' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const raw = (body || '').trim();
        const payload = raw ? JSON.parse(raw) : {};
        const email = String(payload.email || '').trim();

        if (!email) {
          sendJson(res, 400, { message: 'Email is required.' });
          return;
        }

        const info = await mailSubscribe({ email });
        const preview = usingTestAccount ? nodemailer.getTestMessageUrl(info) : undefined;
        sendJson(res, 200, { message: 'Subscription request sent successfully.', preview });
      } catch (error) {
        sendJson(res, 500, {
          message: error instanceof Error ? error.message : 'Failed to send subscription request.',
        });
      }
    });

    return;
  }

  sendJson(res, 404, { message: 'Route not found.' });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
