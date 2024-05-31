import { Router } from "express"
import{createTableRespostas_Respostas,createRespostaDaResposta,getRespostasPorResposta} from "../controllers/resposta_respostaController.js"

createTableRespostas_Respostas()

const resposta_respostaRouter = Router()

resposta_respostaRouter.get('/resposta_resposta/:id',getRespostasPorResposta)

resposta_respostaRouter.post('/resposta_resposta',createRespostaDaResposta)


export default resposta_respostaRouter