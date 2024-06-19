import { Router } from "express"
import { createTableMensagens, createTableRespostas, selectMensagens, selectMensagem, insertMensagem, updateMensagem, deleteMensagem, selectRespostas, selectResposta, insertResposta, updateResposta, deleteResposta } from "../controllers/forumController.js"

createTableMensagens()
createTableRespostas()

const forumRouter = Router()

forumRouter.get('/mensagens', selectMensagens)
forumRouter.get('/mensagem/:id', selectMensagem)
forumRouter.post('/mensagem', insertMensagem)
forumRouter.delete('/mensagem/:id', deleteMensagem)
forumRouter.put("/mensagem", updateMensagem)

forumRouter.get('/respostas/:mensagem_id', selectRespostas)
forumRouter.get('/resposta/:id', selectResposta)
forumRouter.post('/resposta', insertResposta)
forumRouter.delete('/resposta/:id', deleteResposta)
forumRouter.put("/resposta", updateResposta)

export default forumRouter