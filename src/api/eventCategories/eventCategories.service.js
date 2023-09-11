import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { hashSync } from 'bcrypt';
import * as eventCategoriesRepo from './eventCategories.repository.js';

const {
  EMAIL_ADDRESS, EMAIL_PASSWORD, HOST, CHANGE_PASSWORD_ROUTE, JWT_SECRET, JWT_EXPIRES_IN,
} = process.env;

export async function getAll() {
  const eventCategories = await eventCategoriesRepo.getAll();
  return eventCategories;
}

export async function getById({ id }) {
  const eventCategory = await eventCategoriesRepo.getById({ id });
  return eventCategory;
}

export async function changePasswordRequest({ email }) {
  const eventCategory = await eventCategoriesRepo.getByEmail({ email });
  if (!eventCategory) {
    const myError = { status: 403, message: 'Mail does not exist' };
    throw new Error(JSON.stringify(myError));
  }

  const payload = { email };
  const tempToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      eventCategory: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });

  const htmlLink = `<a href='${HOST}${CHANGE_PASSWORD_ROUTE}${tempToken}' target='_blank'>Pincha aquí</a>`;

  const mailOptions = {
    from: 'Los máquinas de TheBridge <correothebridge01@gmail.com>',
    to: `${email}`,
    subject: 'Enlace para recuperar su contraseña:',
    text: `localhost:3001/eventCategories/changepassword/${tempToken}`,
    html: htmlLink,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      const myError = { status: 405, message: 'Error sending email' };
      throw new Error(JSON.stringify(myError));
    }
  });
}

export async function changePassword({ token }) {
  jwt.verify(token, JWT_SECRET, async (error, payload) => {
    if (error) {
      const myError = { status: 403, message: 'Token error' };
      throw new Error(JSON.stringify(myError));
    }
    return payload.email;
  });
}

export async function updateByEmail({ email, password }) {
  const hashedPassword = hashSync(password, 10);
  const updatedEventCategory = await eventCategoriesRepo.updateByEmail({ email, hashedPassword });
  if (!updatedEventCategory) {
    const myError = { status: 403, message: 'Mail does not exist' };
    throw new Error(JSON.stringify(myError));
  }
  return updatedEventCategory;
}

export async function patchId({ id, newProps }) {
  const updatedeventCategory = await eventCategoriesRepo.patchId({ id, newProps });
  return updatedeventCategory;
}

export async function getByeventCategoryname({ eventCategoryname }) {
  const eventCategory = await eventCategoriesRepo.getByeventCategoryname({ eventCategoryname });
  return eventCategory;
}
