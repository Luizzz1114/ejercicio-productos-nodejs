import { Router } from "express";
import CategoriasRoutes from "./categorias.routes.js";
import ProductosRoutes from './productos.routes.js';
import UsuariosRoutes from './usuarios.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('API funcionando correctamente.');
});

router.use('/categorias', CategoriasRoutes);
router.use('/productos', ProductosRoutes);
router.use('/usuarios', UsuariosRoutes);

export default router;