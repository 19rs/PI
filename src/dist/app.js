import express from 'express'
import cors from 'cors'
import authRouter from '../routes/authRouter.js'
import pessoasRouter from '../routes/pessoaRouter.js'
import fileUpload from "express-fileupload"
import usuarioRouter from '../routes/usuarioRouter.js'
import mensagemRouter from '../routes/mensagemRouter.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use(authRouter)
app.use(pessoasRouter)
app.use(usuarioRouter)
app.use(mensagemRouter)



app.listen(3000, () => {
    console.log('Servidor escutando porta 3000');
});