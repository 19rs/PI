import { Router } from "express"
import { createTableMensagens, selectMensagens, selectMensagem } from "../controllers/mensagemController.js"

createTableMensagens()

const mensagemRouter = Router()

mensagemRouter.get('/mensagens', selectMensagens)
mensagemRouter.get('/mensagem', selectMensagem)
// mensagemRouter.post('/mensagem', insertMensagem)
// mensagemRouter.delete('/mensagem/:id', deleteMensagem)



export default mensagemRouter