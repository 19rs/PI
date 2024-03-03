import { Router } from "express"
import { createTablePessoas, selectPessoas } from "../controllers/pessoaController.js"

createTablePessoas()

const pessoasRouter = Router()

pessoasRouter.get('/pessoas', selectPessoas)

export default pessoasRouter