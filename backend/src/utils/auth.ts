import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecretjwtkey_please_change_in_production';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
