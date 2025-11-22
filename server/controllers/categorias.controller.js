import Categorias from '../models/categorias.model.js';
import { respuestaError, respuestaSuccess } from '../helpers/respuestas.js';

class CategoriasController {
  async listar(req, res) {
    try {
      const categorias = await Categorias.listar();
      respuestaSuccess(req, res, 200, '', categorias);
    } catch (error) {
      respuestaError(req, res, 500, 'Error al listar las categorías.', error.message);
    }
  }

  async crear(req, res) {
    try {
      const { nombre, icono, color, descripcion } = req.body;
      const resultado = await Categorias.crear([ nombre, icono, color, descripcion ]);
      if (resultado) {
        respuestaSuccess(req, res, 201, 'Categoría registrada con exito.');
      }
    } catch (error) {
      respuestaError(req, res, 500, 'Error al registrar la categoría.', error.message);
    }
  }

  async leer(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categorias.leer(id);
      if (categoria) {
        respuestaSuccess(req, res, 200, '', categoria);
      } else {
        respuestaError(req, res, 400, 'Categoría no encontrada.');
      }
    } catch (error) {
      respuestaError(req, res, 500, 'Error al leer la categoría.', error.message);
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, icono, color, descripcion } = req.body;
      const resultado = await Categorias.actualizar([ nombre, icono, color, descripcion, id ]);
      if (resultado) {
        respuestaSuccess(req, res, 200, 'Categoría actualizada exitosamente.');
      } else {
        respuestaSuccess(req, res, 400, 'Categoría no encontrada.');
      }
    } catch (error) {
      respuestaError(req, res, 500, 'Error al actualizar la categoría.', error.message);
    } 
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const resultado = await Categorias.eliminar(id);
      if (resultado) {
        respuestaSuccess(req, res, 200, 'Categoría eliminada exitosamente.');
      } else {
        respuestaSuccess(req, res, 400, 'Categoría no encontrada.');
      }
    } catch (error) {
      respuestaError(req, res, 500, 'Error al eliminadar la categoría.', error.message);
    } 
  }
}

export default new CategoriasController();