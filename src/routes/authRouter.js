import { Router } from "express"
import { createTableUsuarios, verificarAdmin, logar } from "../controllers/authController.js"

createTableUsuarios()

const authRouter = Router()

authRouter.post('/login', logar)

export default authRouter