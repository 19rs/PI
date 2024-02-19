const express = require('express');
const cors = require('cors');

const dadosUsuarios = require('./src/data/dadosUsuarios.json');

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());




//LOGIN
let usuarioLogado = false; //depois ver como faz autenticação no htmx!

app.get('/login', (req, res) => {
    res.send(`
        <section id="main">
            <form class="grid gap-5 bg-gray-50 mx-96 pt-5 py-10 px-10 rounded-lg shadow-lg border" hx-post="/login" hx-target="#main" hx-swap="innerHTML">
                <h1 class="font-bold text-xl text-center my-5">LOGIN</h1>
                <div class="grid w-full">
                    <label for="email">E-mail:</label>
                    <input type="email" name="email" class="border px-2 py-3">
                </div>
                <div class="grid">
                    <label for="senha">Senha:</label>
                    <input type="password" name="senha" class="border px-2 py-3">
                </div>
                <button type="submit" class="px-10 border p-4 mt-4 bg-green-500 text-white font-bold text-lg rounded hover:bg-green-400">Entrar</button>
            </form>
        </section>

        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/home" hx-target="#main" id="botao-home" hx-swap-oob="true">HOME</button>
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/forum" hx-target="#main" id="botao-forum" hx-swap-oob="true">FÓRUM</button>
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/localizar" hx-target="#main" id="botao-localizar" hx-swap-oob="true">LOCALIZAR</button>
        <button class="underline underline-offset-4 px-5 hover:underline hover:underline-offset-4" hx-get="/login" hx-target="#main" id="botao-login" hx-swap-oob="true">ENTRAR</button>
    `);
});

app.post('/login/', (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    const usuario = dadosUsuarios.Usuario.find(u => u.email === email)

    if (!usuario) {
        res.send(`
        <section id="main">
            <form class="grid gap-5 bg-gray-50 mx-96 pt-5 py-10 px-10 rounded-lg shadow-lg border" hx-post="/login" hx-target="main" hx-swap="innerHTML">
                <h1 class="font-bold text-xl text-center my-5">LOGIN</h1>
                <div class="grid w-full">
                    <label for="email">E-mail:</label>
                    <input type="email" name="email" class="border px-2 py-3">
                    <span class="text-red-500">E-mail não encontrado</span>
                </div>
                <div class="grid">
                    <label for="senha">Senha:</label>
                    <input type="password" name="senha" class="border px-2 py-3">
                </div>
                <button type="submit" class="px-10 border p-4 mt-4 bg-green-500 text-white font-bold text-lg rounded hover:bg-green-400">Entrar</button>
            </form>
        </section>
        `);
    } else if (usuario.senha !== senha) {
        res.send(`
            <form class="grid gap-5 bg-gray-50 mx-96 pt-5 py-10 px-10 rounded-lg shadow-lg border" hx-post="/login" hx-target="main" hx-swap="innerHTML">
                <h1 class="font-bold text-xl text-center my-5">LOGIN</h1>
                <div class="grid w-full">
                    <label for="email">E-mail:</label>
                    <input type="email" name="email" class="border px-2 py-3">
                </div>
                <div class="grid">
                    <label for="senha">Senha:</label>
                    <input type="password" name="senha" class="border px-2 py-3">
                </div>
                <span class="text-red-500">As credenciais não coincidem</span>
                <button type="submit" class="px-10 border p-4 mt-4 bg-green-500 text-white font-bold text-lg rounded hover:bg-green-400">Entrar</button>
            </form>
        `);
    } else {
        usuarioLogado = true

        res.send(`
            <section id="main">
                <h1>Bem Vindo <span class="font-bold">${usuario.nome}</span>!</h1>
            </section>
            
            <button class="underline underline-offset-4 px-5 hover:underline hover:underline-offset-4" hx-get="/home" hx-target="#main" id="botao-home" hx-swap-oob="true">HOME</button>
            <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/inserir" hx-target="#main" hx-swap-oob="true" id="botao-inserir">INSERIR</button>
            <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/forum" hx-target="#main" hx-swap-oob="true" id="botao-forum">FÓRUM</button>
            <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/localizar" hx-target="#main" id="botao-localizar" hx-swap-oob="true">LOCALIZAR</button>
            <button class="px-5 hover:underline hover:underline-offset-4" hx-post="/logout" hx-target="#main" id="botao-login" hx-swap-oob="true">SAIR</button>
        `);
    }
});


//LOGOUT
app.post('/logout', (req, res) => {
    usuarioLogado = false;

    res.send(`
        <h1>Home</h1>

        <button class="underline underline-offset-4 px-5 hover:underline hover:underline-offset-4" hx-get="/home" hx-target="#main" id="botao-home" hx-swap-oob="true">HOME</button>
        <button class="px-5 hover:underline hover:underline-offset-4 hidden" hx-get="/inserir" hx-target="#main" id="botao-inserir" hx-swap-oob="true">INSERIR</button>
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/forum" hx-target="#main" id="botao-forum" hx-swap-oob="true">FÓRUM</button>
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/localizar" hx-target="#main" id="botao-localizar" hx-swap-oob="true">LOCALIZAR</button>
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/login" hx-target="#main" id="botao-login" hx-swap-oob="true">ENTRAR</button>
    `);
});


//INSERIR
app.get('/inserir', (req, res) => {
    res.send(`
        <h1>Inserir</h1>
        
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/home" hx-target="#main" id="botao-home" hx-swap-oob="true">HOME</button>
        <button class="underline underline-offset-4 px-5 hover:underline hover:underline-offset-4" hx-get="/inserir" hx-target="#main" hx-swap-oob="true" id="botao-inserir">INSERIR</button>
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/forum" hx-target="#main" id="botao-forum" hx-swap-oob="true">FÓRUM</button>
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/localizar" hx-target="#main" id="botao-localizar" hx-swap-oob="true">LOCALIZAR</button>
    `);
});


//FÓRUM
app.get('/forum', (req, res) => {

    let botaoInserir = ''
    let botaoLogin = '<button class="px-5 hover:underline hover:underline-offset-4" hx-get="/login" hx-target="#main" id="botao-login" hx-swap-oob="true">ENTRAR</button>'

    if(usuarioLogado) {
        botaoInserir = '<button class="px-5 hover:underline hover:underline-offset-4" hx-get="/inserir" hx-target="#main" hx-swap-oob="true" id="botao-inserir">INSERIR</button>'
        botaoLogin = '<button class="px-5 hover:underline hover:underline-offset-4" hx-post="/logout" hx-target="#main" id="botao-login" hx-swap-oob="true">SAIR</button>'
    }

    res.send(`
        <h1>Fórum</h1>

        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/home" hx-target="#main" id="botao-home" hx-swap-oob="true">HOME</button>
        ${botaoInserir}
        <button class="underline underline-offset-4 px-5 hover:underline hover:underline-offset-4" hx-get="/forum" hx-target="#main" id="botao-forum" hx-swap-oob="true">FÓRUM</button>
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/localizar" hx-target="#main" id="botao-localizar" hx-swap-oob="true">LOCALIZAR</button>
        ${botaoLogin}
    `);

    
});


//LOCALIZAR
app.get('/localizar', (req, res) => {

    let botaoInserir = ''
    let botaoLogin = '<button class="px-5 hover:underline hover:underline-offset-4" hx-get="/login" hx-target="#main" id="botao-login" hx-swap-oob="true">ENTRAR</button>'

    if(usuarioLogado) {
        botaoInserir = '<button class="px-5 hover:underline hover:underline-offset-4" hx-get="/inserir" hx-target="#main" hx-swap-oob="true" id="botao-inserir">INSERIR</button>'
        botaoLogin = '<button class="px-5 hover:underline hover:underline-offset-4" hx-post="/logout" hx-target="#main" id="botao-login" hx-swap-oob="true">SAIR</button>'
    }

    res.send(`
        <h1>Localizar</h1>

        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/home" hx-target="#main" id="botao-home" hx-swap-oob="true">HOME</button>
        ${botaoInserir}
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/forum" hx-target="#main" id="botao-forum" hx-swap-oob="true">FÓRUM</button>
        <button class="underline underline-offset-4 px-5 hover:underline hover:underline-offset-4" hx-get="/localizar" hx-target="#main" id="botao-localizar" hx-swap-oob="true">LOCALIZAR</button>
        ${botaoLogin}
    `);
});


//HOME
app.get('/home', (req, res) => {
    
    let botaoInserir = ''
    let botaoLogin = '<button class="px-5 hover:underline hover:underline-offset-4" hx-get="/login" hx-target="#main" id="botao-login" hx-swap-oob="true">ENTRAR</button>'

    if(usuarioLogado) {
        botaoInserir = '<button class="px-5 hover:underline hover:underline-offset-4" hx-get="/inserir" hx-target="#main" hx-swap-oob="true" id="botao-inserir">INSERIR</button>'
        botaoLogin = '<button class="px-5 hover:underline hover:underline-offset-4" hx-post="/logout" hx-target="#main" id="botao-login" hx-swap-oob="true">SAIR</button>'
    }

    res.send(`
        <h1>Home</h1>

        <button class="underline underline-offset-4 px-5 hover:underline hover:underline-offset-4" hx-get="/home" hx-target="#main" id="botao-home" hx-swap-oob="true">HOME</button>
        ${botaoInserir}
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/forum" hx-target="#main" id="botao-forum" hx-swap-oob="true">FÓRUM</button>
        <button class="px-5 hover:underline hover:underline-offset-4" hx-get="/localizar" hx-target="#main" id="botao-localizar" hx-swap-oob="true">LOCALIZAR</button>
        ${botaoLogin}
    `);
});



app.listen(3000, () => {
    console.log('Servidor escutando porta 3000');
});