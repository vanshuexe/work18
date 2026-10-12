import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const FALLBACK = 'Please email harisonindia11@gmail.com or call 99888-55011.';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ message: 'Invalid request.' }, { status: 400 });
  }

  const read = (key, max = 250) => (typeof data[key] === 'string' ? data[key].trim().slice(0, max) : '');
  const name = read('name', 120);
  const email = read('email', 160);
  const tel = read('tel', 40);
  const message = read('query', 4000);

  // Honeypot: pretend success so bots do not retry.
  if (read('website')) return Response.json({ message: 'Thank you for your enquiry.' });

  if (!name || !tel || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ message: 'Please enter your name, a valid email, a phone number and your requirement.' }, { status: 400 });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) {
    return Response.json({ message: `Online enquiries are not switched on yet. ${FALLBACK}` }, { status: 503 });
  }

  const subjectProduct = read('product', 80);
  const body = [
    `Name: ${name}`,
    `Company: ${read('company', 160)}`,
    `Email: ${email}`,
    `Phone: ${tel}`,
    `Location: ${read('location', 120)}`,
    `Interest: ${read('interest', 80)}`,
    `Product: ${read('product', 200)}`,
    `Quantity: ${read('quantity', 80)}`,
    '',
    message,
  ].join('\n');

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === '465',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
    });
    await transport.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ENQUIRY_TO || 'harisonindia11@gmail.com',
      replyTo: email,
      subject: `Website enquiry${subjectProduct ? ` — ${subjectProduct}` : ''}`,
      text: body,
    });
    return Response.json({ message: 'Your enquiry has been sent.' });
  } catch {
    return Response.json({ message: `We could not send your enquiry. ${FALLBACK}` }, { status: 502 });
  }
}
