import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function generarToken(id, nombre, rol) {
  return jwt.sign({ id, nombre, rol }, process.env.JWT_SECRET, { expiresIn: '5h' });
}