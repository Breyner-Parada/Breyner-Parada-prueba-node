import { Router, Request, Response } from 'express';
import * as ProductoAdvancedController from '../controllers/ProductoAdvancedController.js';

const router = Router();

// Endpoint de prueba para verificar que la API está funcionando
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

// ===== ADVANCED PRODUCTO ENDPOINTS =====

// Endpoint 1: Lista de productos con stock en tiendas
router.get('/productos-con-stock', ProductoAdvancedController.getProductosConStock);

// Endpoint 2: Productos más vendidos
router.get('/productos-mas-vendidos', ProductoAdvancedController.getProductosMasVendidos);

// Endpoint 3: Categorías con productos disponibles
router.get('/categorias-con-productos', ProductoAdvancedController.getCategoriasConProductos);

// Endpoint 4: Promociones activas por día
// Ejemplo: GET /api/promociones-por-dia?dia=3
router.get('/promociones-por-dia', ProductoAdvancedController.getPromocionesPorDia);

export default router;
