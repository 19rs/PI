const express = require('express')
const server = express()
const dadosUsuarios = require('./data/dadosUsuarios.json');
const fs = require('fs')

server.use(express.json())



let usuarioLogado = false; //depois fazer autenticação

server.post('/login', (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    const usuario = dadosUsuarios.Usuario.find(u => u.email === email)

    if (!usuario) {
        res.send({erro: 'Usuário não Encontrado'});
    } else if (usuario.senha !== senha) {
        res.send({erro: 'As credenciais não coincidem'});
    } else {
        usuarioLogado = true

        res.send({
            sucesso: 'Login bem sucedido',
            userID: usuario.id,
            userProfile: usuario.perfil
        });
    }
});




function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosUsuarios.json', JSON.stringify(dados, null, 2))
}

module.exports = {server, salvarDados}