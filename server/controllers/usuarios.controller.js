import bcrypt from 'bcrypt';
import Usuarios from '../models/usuarios.model.js';
import { respuestaSuccess, respuestaError } from '../helpers/respuestas.js';
import { generarToken } from '../helpers/auth.js'; 

class UsuariosController {
	async listarUsuarios(req, res) {
		try {
			const usuarios = await Usuarios.listarUsuarios();
			respuestaSuccess(req, res, 200, '', usuarios);
		} catch (error) {
			respuestaError(req, res, 500, 'Error al listar los usuarios.', error.message);
		}
	}

	async crearUsuario(req, res) {
		try {
			const { nombre, contrasena, correo, rol } = req.body;
			const hashContrasena = await bcrypt.hash(contrasena, 10);
			const resultado = await Usuarios.crearUsuario([ nombre, hashContrasena, correo, rol ]);
			if (resultado) {
				respuestaSuccess(req, res, 201, 'Usuario registrado exitosamente.');
			}
		} catch (error) {
			respuestaError(req, res, 500, 'Error al registrar el usuario.', error.message);
		}
	}

	async leerUsuario(req, res) {
		try {
			const { id } = req.params;
			const usuario = await Usuarios.leerUsuario(id);
			if (usuario) {
				respuestaSuccess(req, res, 200, '', usuario);
			}	else {
				respuestaError(req, res, 400, 'Credenciales incorrectas.');
			}
		} catch (error) {
			respuestaError(req, res, 500, 'Error al leer el usuario.', error.message);
		}
	}

	async actualizarUsuario(req, res) {
		try {
			const { id } = req.params;
			const { nombre, contrasena, correo, rol } = req.body;
			const hashContrasena = await bcrypt.hash(contrasena, 10);
			const resultado = await Usuarios.actualizarUsuario([ nombre, hashContrasena, correo, rol, id ]);
			if (resultado) {
				respuestaSuccess(req, res, 200, 'Usuario actualizado exitosamente.');
			} else {
        respuestaSuccess(req, res, 400, 'Usuario no encontrado.');
      }
		} catch (error) {
			respuestaError(req, res, 500, 'Error al actualizar el usuario.', error.message);
		}
	}

	async eliminarUsuario(req, res) {
		try {
			const { id } = req.params;
			const resultado = await Usuarios.eliminarUsuario(id);
			if (resultado) {
				respuestaSuccess(req, res, 200, 'Usuario eliminado exitosamente.');
			} else {
        respuestaSuccess(req, res, 400, 'Usuario no encontrado.');
      }
		} catch (error) {
			respuestaError(req, res, 500, 'Error al eliminar el usuario.', error.message);
		}
	}

	async loginUsuario(req, res) {
		try {
			const { nombre, contrasena } = req.body;
			const usuario = await Usuarios.validarUsuario(nombre);
			if (!usuario) {
				return respuestaError(req, res, 401, 'Datos incorrectos.');
			}
			const usuarioValido = await bcrypt.compare(contrasena, usuario.contrasena);
			if (!usuarioValido) {
				return respuestaError(req, res, 401, 'Datos incorrectos.');
			}
			const token = generarToken(usuario.id, usuario.nombre, usuario.rol);
			const data = {
				nombre: usuario.nombre,
				correo: usuario.correo,
				rol: usuario.rol,
				autenticado: true,
			};
			res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 3600000
			});
			respuestaSuccess(req, res, 200, 'Usuario autenticado.',  data);
		} catch (error){
			respuestaError(req, res, 500, 'Error al validar las credenciales.', error.message);
		}
	}

	async logoutUsuario(req, res) {
		try {
			res.clearCookie('token');
			respuestaSuccess(req, res, 200, 'Logout exitoso.');
		} catch (error) {
			respuestaError(req, res, 500, 'Error al realizar el logout.', error.message);
		}
	}
}

export default new UsuariosController();