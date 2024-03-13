import { Router } from "express"
import { createTableUsuarios, deleteUsuario, insertUsuario, selectUsuario } from "../controllers/authController.js"

createTableUsuarios()

const usuarioRouter = Router()

usuarioRouter.get('/usuario', selectUsuario)
usuarioRouter.post('/usuario', insertUsuario)
usuarioRouter.delete('/usuario/:id', deleteUsuario);



export default usuarioRouter