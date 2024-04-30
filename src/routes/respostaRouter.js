import { Router } from "express"
import { createTableRespostas } from "../controllers/respostaController.js"


createTableRespostas()

const respostaRouter = Router()

// respostaRouter.get('/respostas', selectRespostas)

export default respostaRouter