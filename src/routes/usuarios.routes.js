import { Router } from 'express'
import { deleteUsuarios, getUsuarios, updateUsuarios, createUsuarios, getUsuario } from '../controller/usuarios.controller.js'

const router = Router()

router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', getUsuario)
router.post('/usuarios', createUsuarios)
router.patch('/usuarios/:id', updateUsuarios)
router.delete('/usuarios/:id', deleteUsuarios)

export default router;