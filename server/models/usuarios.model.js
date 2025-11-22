import pool from '../config/database.js';

class Usuarios {
	async listarUsuarios() {
		const sql = 'SELECT * FROM UsuariosView ORDER BY nombre;';
		const resultado = await pool.query(sql);
		return resultado.rows;
	}

	async crearUsuario(usuario) {
		const sql = 'INSERT INTO Usuarios (nombre, contrasena, correo, rol, creado) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP);';
		const resultado = await pool.query(sql, usuario);
		return resultado.rowCount === 1;
	}

	async leerUsuario(id) {
		const sql = 'SELECT * FROM UsuariosView WHERE id = $1;';
		const resultado = await pool.query(sql, [ id ]);
		return resultado.rows[0];
	}

	async actualizarUsuario(usuario) {
		const sql = 'UPDATE Usuarios SET nombre = $1, contrasena = $2, correo = $3, rol = $4, actualizado = CURRENT_TIMESTAMP WHERE id = $5;';
		const resultado = await pool.query(sql, usuario);
		return resultado.rowCount === 1;
	}

	async eliminarUsuario(id) {
		const sql = 'DELETE FROM Usuarios WHERE id = $1;';
		const resultado = await pool.query(sql, [ id ]);
		return resultado.rowCount === 1;
	}

	async validarUsuario(nombre) {
		const sql = 'SELECT id, nombre, contrasena, correo, rol FROM Usuarios WHERE nombre = $1;';
		const resultado = await pool.query(sql, [ nombre ]);
		return resultado.rows[0];
	}
}

export default new Usuarios();