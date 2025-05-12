import { USER } from "../models/user.js";

const isValidEmail = (email) => typeof email === 'string' && email.endsWith('@gmail.com');
const isValidPhone = (phone) => typeof phone === 'string' && /^\+380\d{9}$/.test(phone);
const isValidPassword = (password) => typeof password === 'string' && password.length >= 4;
const hasOnlyModelFields = (data, fields) => Object.keys(data).every((key) => fields.includes(key));

const createUserValid = (req, res, next) => {
  const data = req.body;
  const fields = Object.keys(USER).filter((key) => key !== 'id');

  if (!hasOnlyModelFields(data, fields)) return res.error("Extra fields");
  for (const field of fields) if (!data.hasOwnProperty(field)) return res.error(`Missing: ${field}`);
  if ('id' in data) return res.error("Field 'id' not allowed");
  if (!isValidEmail(data.email)) return res.error("Invalid email");
  if (!isValidPhone(data.phone)) return res.error("Invalid phone");
  if (!isValidPassword(data.password)) return res.error("Invalid password");

  next();
};

const updateUserValid = (req, res, next) => {
  const data = req.body;
  const fields = Object.keys(USER).filter((key) => key !== 'id');

  if (!data || Object.keys(data).length === 0) return res.error("Empty body");
  if (!hasOnlyModelFields(data, fields)) return res.error("Extra fields");
  if ('id' in data) return res.error("Field 'id' not allowed");
  if (data.email && !isValidEmail(data.email)) return res.error("Invalid email");
  if (data.phone && !isValidPhone(data.phone)) return res.error("Invalid phone");
  if (data.password && !isValidPassword(data.password)) return res.error("Invalid password");

  next();
};

export { createUserValid, updateUserValid };
