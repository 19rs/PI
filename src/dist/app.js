import express from 'express'
import cors from 'cors'
import authRouter from '../routes/authRouter.js'
import pessoasRouter from '../routes/pessoaRouter.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouter)
app.use(pessoasRouter)


app.listen(3000, () => {
    console.log('Servidor escutando porta 3000');
});