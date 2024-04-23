import { Router } from "express"
import { createTableMensagens, selectMensagens, selectMensagem, updateViewsMensagem } from "../controllers/mensagemController.js"

createTableMensagens()

const mensagemRouter = Router()

mensagemRouter.get('/mensagens', selectMensagens)
mensagemRouter.get('/mensagem', selectMensagem)
//mensagemRouter.put('/mensagem/views/:id', updateViewsMensagem) //nao precisa vai atualizar no get mensagem
// mensagemRouter.post('/mensagem', insertMensagem)
// mensagemRouter.delete('/mensagem/:id', deleteMensagem)



export default mensagemRouter