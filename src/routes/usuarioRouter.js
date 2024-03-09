import { Router } from "express"
import { createTableUsuarios, insertUsuario, selectUsuario } from "../controllers/authController.js"

createTableUsuarios()

const usuarioRouter = Router()

usuarioRouter.get('/usuario', selectUsuario)
usuarioRouter.post('/usuario', insertUsuario)

export default usuarioRouter