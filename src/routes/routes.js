import { Router } from 'express'
import { deleteProductos, getProductos, updateProductos, createProductos, getProducto } from '../controller/productos.controller.js'
import { deleteVentas, getVentas, updateVentas, createVentas, getVenta } from '../controller/ventas.controller.js'

const router = Router()
//Rutas para productos
router.get('/productos', getProductos)
router.get('/productos/:id', getProducto)
router.post('/productos', createProductos)
router.patch('/productos/:id', updateProductos)
router.delete('/productos/:id', deleteProductos)

//Rutas para ventas
router.get('/ventas', getVentas)
router.get('/ventas/:codigo', getVenta)
router.post('/ventas', createVentas)
router.patch('/ventas/:codigo', updateVentas)
router.delete('/ventas/:codigo', deleteVentas)

export default router;