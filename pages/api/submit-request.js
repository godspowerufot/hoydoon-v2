import { IncomingForm } from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Disable default body parser for file streaming
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
      category,
      email,
      subject,
      description,
      listingInfo,
      appVersion,
      browser,
      listingLink,
    } = data.fields;

    let attachmentsArray = data.files.attachments;

    if (!attachmentsArray) attachmentsArray = [];
    if (!Array.isArray(attachmentsArray)) attachmentsArray = [attachmentsArray];

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    const validAttachments = attachmentsArray.filter((file) => allowedTypes.includes(file.mimetype));

    const totalSize = validAttachments.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 6 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: 'Total file size must be under 6MB' });
    }

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
      <p><strong>Files Attached:</strong> ${validAttachments.length}</p>
    `;

    const mailOptions = {
      from: email,
      to: 'devteam@quorvixconsulting.com',
      subject: `Hoydoon Request - ${category}`,
      html: emailContent,
      attachments: validAttachments.map((file) => ({
        filename: file.originalFilename,
        path: file.filepath,
      })),
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Request sent successfully' });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
}
