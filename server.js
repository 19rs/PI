const express = require('express');
const cors = require('cors');
const authRouter = require('./public/src/controllers/controllerAuth.js')


const app = express();
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', authRouter.server)


app.listen(3000, () => {
    console.log('Servidor escutando porta 3000');
});