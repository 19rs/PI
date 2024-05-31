import { Router } from "express"
import { createTableMensagens, selectMensagens, selectTitulo ,insertMensagem,deleteMensagem,updateMensagem} from "../controllers/mensagemController.js"

createTableMensagens()

const mensagemRouter = Router()

mensagemRouter.get('/mensagens', selectMensagens)
mensagemRouter.get('/mensagem/:id', selectTitulo)
mensagemRouter.post('/mensagem', insertMensagem)
mensagemRouter.delete('/mensagem/:id', deleteMensagem)
mensagemRouter.put("/mensagem", updateMensagem)



export default mensagemRouter