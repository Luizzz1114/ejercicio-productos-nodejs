import express from 'express';
import ProductosController from '../controllers/productos.controller.js';
import { auntenticarToken } from '../middlewares/auth.js';

const ProductosRoutes = express.Router();

ProductosRoutes.get('/', auntenticarToken, ProductosController.listar);
ProductosRoutes.post('/', auntenticarToken, ProductosController.crear);
ProductosRoutes.route('/:id')
  .get(auntenticarToken, ProductosController.leer)
  .put(auntenticarToken, ProductosController.actualizar)
  .delete(auntenticarToken, ProductosController.eliminar);

export default ProductosRoutes;