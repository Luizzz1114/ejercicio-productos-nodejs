import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Usuarios from '../models/usuarios.model.js';
import { respuestaError } from "../helpers/respuestas.js";

export async function auntenticarToken(req, res, next) {
  const token = req.cookies.token;
  if(!token) {
    return respuestaError(req, res, 401, 'Acceso no autorizado.');
  }
  try {
    const dataToken = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof dataToken === 'object' && dataToken.id) {
      const user = await Usuarios.leerUsuario(dataToken.id);
      if(user) {
        req.user = user;
        next();
      } else {
        respuestaError(req, res, 401, 'Token inválido.');
      }
    }
  } catch (error) {
    respuestaError(req, res, 401, 'Token inválido.');
  }
}

export async function autenticarAdministrador(req, res, next) {
  if (!req.user) {
    return respuestaError(req, res, 401, 'Acceso no autorizado.');
  }
  const { rol } = req.user;
  if (rol === 'Administrador') {
    next();
  } else {
    return respuestaError(req, res, 401, 'Acceso no autorizado.');
  }
}