import express from 'express';
import CategoriasController from '../controllers/categorias.controller.js';
import { auntenticarToken } from '../middlewares/auth.js';

const CategoriasRoutes = express.Router();

CategoriasRoutes.get('/', auntenticarToken, CategoriasController.listar);
CategoriasRoutes.post('/', auntenticarToken, CategoriasController.crear);
CategoriasRoutes.route('/:id')
  .get(auntenticarToken, CategoriasController.leer)
  .put(auntenticarToken, CategoriasController.actualizar)
  .delete(auntenticarToken, CategoriasController.eliminar);

export default CategoriasRoutes;