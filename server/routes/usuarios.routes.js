import express from 'express';
import UsuariosController from '../controllers/usuarios.controller.js';
import { auntenticarToken, autenticarAdministrador } from '../middlewares/auth.js';

const UsuariosRoutes = express.Router();

UsuariosRoutes.post('/login', UsuariosController.loginUsuario);
UsuariosRoutes.post('/logout', auntenticarToken, UsuariosController.logoutUsuario);
UsuariosRoutes.get('/', auntenticarToken, autenticarAdministrador, UsuariosController.listarUsuarios);
UsuariosRoutes.post('/', auntenticarToken, autenticarAdministrador, UsuariosController.crearUsuario);
UsuariosRoutes.route('/:id')
  .get(auntenticarToken, autenticarAdministrador, UsuariosController.leerUsuario)
  .put(auntenticarToken, autenticarAdministrador, UsuariosController.actualizarUsuario)
  .delete(auntenticarToken, autenticarAdministrador, UsuariosController.eliminarUsuario);

export default UsuariosRoutes;