import { IncomingForm } from 'formidable';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = new IncomingForm({
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // Max individual file size: 10MB
    multiples: true,
  });

  try {
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const {
      name,
      email,
      phone,
      requestType, // 'agent' or 'house'
      message,
      location,
      budget,
    } = data.fields;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailContent = `
      <h3>New Agent/House Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Request Type:</strong> ${requestType === 'agent' ? 'Agent' : 'House'}</p>
      ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
      ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
    `;

    const mailOptions = {
      from: email,
      to: 'devteam@quorvixconsulting.com',
      subject: `Hoydoon Find Agent/House Request`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Request sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
}
