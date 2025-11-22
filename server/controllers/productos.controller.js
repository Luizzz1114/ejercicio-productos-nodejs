import Productos from '../models/productos.model.js';
import { respuestaSuccess, respuestaError } from '../helpers/respuestas.js';

class ProductosController {
	async listar(req, res) {
		try {
			const productos = await Productos.listar();
			respuestaSuccess(req, res, 200, '', productos);
		} catch (error) {
			respuestaError(req, res, 500, 'Error al listar los productos.', error.message);
		}
	}

	async crear(req, res) {
		try {
			const { nombre, categoria_id, precio, stock, descripcion } = req.body;
			const resultado = await Productos.crear([ nombre, precio, stock, descripcion, categoria_id ]);
			if (resultado) {
				respuestaSuccess(req, res, 201, 'Producto registrado exitosamente.');
			}
		} catch (error) {
			respuestaError(req, res, 500, 'Error al registrar el producto.', error.message);
		}
	}

	async leer(req, res) {
		try {
			const { id } = req.params;
			const producto = await Productos.leer(id);
			if (producto) {
				respuestaSuccess(req, res, 200, '', producto);
			} else {
				respuestaError(req, res, 400, 'Producto no encontrado.')
			}
		} catch (error) {
			respuestaError(req, res, 500, 'Error al leer el producto.', error.message);
		}
	}

	async actualizar(req, res) {
		try {
			const { id } = req.params;
			const { nombre, categoria_id, precio, stock, descripcion } = req.body;
			const resultado = await Productos.actualizar([ nombre, precio, stock, descripcion, categoria_id, id ]);
			if (resultado) {
				respuestaSuccess(req, res, 200, 'Producto actualizado exitosamente.');
			} else {
				respuestaError(req, res, 400, 'Producto no encontrado.')
			}
		} catch (error) {
			respuestaError(req, res, 500, 'Error al actualizar el producto.', error.message);
		}
	}

	async eliminar(req, res) {
		try {
			const { id } = req.params;
			const resultado = await Productos.eliminar(id);
			if (resultado) {
				respuestaSuccess(req, res, 200, 'Producto eliminado exitosamente.');
			} else {
				respuestaError(req, res, 400, 'Producto no encontrado.')
			}
		} catch (error) {
			respuestaError(req, res, 500, 'Error al eliminar el producto.', error.message);
		}
	}
}

export default new ProductosController();