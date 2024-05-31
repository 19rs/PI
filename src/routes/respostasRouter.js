import { Router } from "express"
import{getRespostasPorMensagem,createResposta,deleteResposta,createTableRespostas} from "../controllers/respostasController.js"

createTableRespostas()

const respostaRouter = Router()

respostaRouter.get('/resposta/:id', getRespostasPorMensagem)
respostaRouter.post('/resposta', createResposta)
respostaRouter.delete('/resposta/:id', deleteResposta)



export default respostaRouter