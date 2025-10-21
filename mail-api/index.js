import express from 'express';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 20, // максимум 20 запросов в минуту с одного IP
});
app.use(limiter);

const DEBUG = process.env.DEBUG === '1';

function validatePayload({ name, tel, email }) {
  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length < 1) {
    errors.push('name');
  }
  
  // валидация
  const telOk = tel && String(tel).trim().length > 0;
  const emailOk = email && /\S+@\S+\.\S+/.test(email);
  if (!telOk && !emailOk) {
    errors.push('contact');
  }
  return { ok: errors.length === 0, errors };
}

app.post('/api/form', async (req, res) => {
  try {
    const payload = {
      name: (req.body.name || '').trim(),
      tel: (req.body.tel || '').trim(),
      email: (req.body.email || '').trim(),
    };

    if (DEBUG) console.log('Incoming form payload:', payload);

    const { ok, errors } = validatePayload(payload);
    if (!ok) return res.status(400).json({ ok: false, errors });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mailhog',
      port: Number(process.env.SMTP_PORT || 1025),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      } : undefined,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailTo = process.env.MAIL_TO;
    if (!mailTo) return res.status(500).json({ ok: false, error: 'MAIL_TO not configured' });

    const subject = 'Новая заявка с сайта';
    const text = `Новая заявка:\n\nИмя: ${payload.name}\nТелефон: ${payload.tel || '-'}\nEmail: ${payload.email || '-'}\n`;

    await transporter.sendMail({
      from: process.env.MAIL_FROM || 'no-reply@example.com',
      to: mailTo,
      subject,
      text,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Error handling /api/form', err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`mail-api listening on ${PORT}`);
});
