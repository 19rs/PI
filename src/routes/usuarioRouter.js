import { Router } from "express"
import { createTableUsuarios, deleteUsuario, insertUsuario, selectUsuarios, updateUsuario } from "../controllers/authController.js"

createTableUsuarios()

const usuarioRouter = Router()

usuarioRouter.get('/usuarios', selectUsuarios)
usuarioRouter.post('/usuario', insertUsuario)
usuarioRouter.put('/usuario/:id', updateUsuario)
usuarioRouter.delete('/usuario/:id', deleteUsuario);



export default usuarioRouter