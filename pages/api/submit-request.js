// pages/api/submit-request.ts
import { IncomingForm } from 'formidable';
import fs from 'fs';
import nodemailer from 'nodemailer';

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = new IncomingForm({ keepExtensions: true });

  try {
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const {
      category,
      email,
      subject,
      description,
      listingInfo,
      appVersion,
      browser,
      listingLink,
    } = data.fields;

    const file = data.files.attachments;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailContent = `
      <h3>New Support Request</h3>
      <p><strong>Category:</strong> ${category}</p>
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
      ${description ? `<p><strong>Description:</strong> ${description}</p>` : ''}
      ${listingInfo ? `<p><strong>Listing Info:</strong> ${listingInfo}</p>` : ''}
      ${appVersion ? `<p><strong>App Version:</strong> ${appVersion}</p>` : ''}
      ${browser ? `<p><strong>Browser:</strong> ${browser}</p>` : ''}
      ${listingLink ? `<p><strong>Listing Link:</strong> ${listingLink}</p>` : ''}
    `;

    const mailOptions = {
      from: email,
      to: 'devteam@quorvixconsulting.com',
      subject: `Hoydoon Request - ${category}`,
      html: emailContent,
    };

    if (file) {
      mailOptions.attachments = [
        {
          filename: file.originalFilename,
          path: file.filepath,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Request sent successfully' });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
}
