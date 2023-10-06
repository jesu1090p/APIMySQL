import express from 'express'
import usuariosRoutes from './routes/usuarios.routes.js'
import indexRoutes  from './routes/index.routes.js'; 

const app = express()

app.use(express.json())
app.use('/api/',usuariosRoutes)
app.use(indexRoutes)
app.use((req, res, next)=>res.status(404).json({message: 'Endpoint no enontrado'}))

export default app;