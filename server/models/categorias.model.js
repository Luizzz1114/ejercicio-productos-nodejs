import pool from '../config/database.js';

class Categorias {
  async listar() {
		const sql = 'SELECT * FROM CategoriasView ORDER BY nombre;';
		const resultado = await pool.query(sql);
		return resultado.rows;
	}

	async crear(categoria) {
		const sql = 'INSERT INTO Categorias (nombre, icono, color, descripcion, creado) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP);';
		const resultado = await pool.query(sql, categoria);
		return resultado.rowCount === 1;
	}

	async leer(id) {
		const sql = 'SELECT * FROM CategoriasView WHERE id = $1;';
		const resultado = await pool.query(sql, [ id ]);
		return resultado.rows[0];
	}

	async actualizar(categoria) {
		const sql = 'UPDATE Categorias SET nombre = $1, icono = $2, color = $3, descripcion = $4, actualizado = CURRENT_TIMESTAMP WHERE id = $5;';
		const resultado = await pool.query(sql, categoria);
		return resultado.rowCount === 1;
	}

	async eliminar(id) {
		const sql = 'DELETE FROM Categorias WHERE id = $1;';
		const resultado = await pool.query(sql, [ id ]);
		return resultado.rowCount === 1;
	}
}

export default new Categorias();