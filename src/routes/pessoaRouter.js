import { Router } from "express"
import { createTablePessoas, deletePessoa, insertPessoa, selectPessoa, selectPessoas, updatePessoa } from "../controllers/pessoaController.js"


createTablePessoas()

const pessoasRouter = Router()

pessoasRouter.get('/pessoas', selectPessoas)
pessoasRouter.get('/pessoa', selectPessoa)
pessoasRouter.post('/pessoas', insertPessoa)
pessoasRouter.put('/pessoa', updatePessoa)
pessoasRouter.delete('/pessoa', deletePessoa)

export default pessoasRouter