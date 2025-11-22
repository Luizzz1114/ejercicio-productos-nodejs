import pool from '../config/database.js';

class Productos {
	async listar() {
		const sql = 'SELECT * FROM ProductosView ORDER BY nombre;';
		const resultado = await pool.query(sql);
		return resultado.rows;
	}

	async crear(producto) {
		const sql = 'INSERT INTO Productos (nombre, precio, stock, descripcion, idCategoria, creado) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP);';
		const resultado = await pool.query(sql, producto);
		return resultado.rowCount === 1;
	}

	async leer(id) {
		const sql = 'SELECT * FROM ProductosView WHERE id = $1;';
		const resultado = await pool.query(sql, [ id ]);
		return resultado.rows[0];
	}

	async actualizar(producto) {
		const sql = 'UPDATE Productos SET nombre = $1, precio = $2, stock = $3, descripcion = $4, idCategoria = $5, actualizado = CURRENT_TIMESTAMP WHERE id = $6;';
		const resultado = await pool.query(sql, producto);
		return resultado.rowCount === 1;
	}

	async eliminar(id) {
		const sql = 'DELETE FROM Productos WHERE id = $1;';
		const resultado = await pool.query(sql, [ id ]);
		return resultado.rowCount === 1;
	}
}

export default new Productos();