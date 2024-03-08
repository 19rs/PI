//Depois melhorar o login, usar o express-session?
function loginLogout() {
    let isUsuarioLogado = sessionStorage.getItem('userID')

    if(!isUsuarioLogado) {
        criarDialogLogin()
    } else {
        logout()
    }
}

function criarDialogLogin() {
    let dialogLogin = document.createElement('dialog')
    dialogLogin.className = 'w-1/2 mt-24 bg-gray-50 rounded-lg shadow-lg border border-bg-gray-100'
    dialogLogin.id = 'dialogLogin'

    let closeButton = document.createElement('button')
    closeButton.className = 'absolute top-3 right-5 border border-gray-200 px-2 pb-0.5 rounded'
    closeButton.innerText = 'x'
    closeButton.addEventListener('click', () => dialogLogin.close())
    dialogLogin.appendChild(closeButton)

    let form = document.createElement('form')
    form.className = "grid gap-5 bg-gray-50 pt-10 pb-16 px-5 px-32"
    form.innerHTML = `
        <h1 class="font-bold text-xl text-center my-5">LOGIN</h1>
        <div class="grid w-full">
            <label for="email">E-mail:</label>
            <input type="email" name="email" id="email" class="border px-2 py-3">
        </div>
        <div class="grid">
            <label for="senha">Senha:</label>
            <input type="password" name="senha" id="senha" class="border px-2 py-3">
        </div>
        <div class="h-4">
            <span class="text-red-500 hidden text-center" id="spanErro"></span>
        </div>
        <button type="submit" class="px-10 border p-4 mt-4 bg-green-500 text-white font-bold text-lg rounded hover:bg-green-400">Entrar</button>
    `

    form.addEventListener('submit', function (event){
        event.preventDefault()
        logar()
    })

    dialogLogin.appendChild(form)

    document.body.appendChild(dialogLogin)
    dialogLogin.showModal()
}



function logar() {
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            senha: senha,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.sucesso) {
            alert(data.sucesso) //usar sweetAlert2? //mandar uma mensagem de Bem Vindo Usuario?
            let dialogLogin = document.getElementById('dialogLogin')
            dialogLogin.remove()
            
            let botaoLoginLogout = document.getElementById('botaoLoginLogout')
            botaoLoginLogout.innerText = 'SAIR'

            sessionStorage.setItem('userID', data.userID)
            sessionStorage.setItem('userProfile', data.userProfile)

            if(parseInt(data.userProfile) === 1) {
                carregarMenu()
            }
        } else {
            let spanErro = document.getElementById('spanErro')
            spanErro.className = spanErro.className.replace('hidden', 'block') 
            spanErro.innerText = `Erro: ${data.erro}`
        }
    })
    .catch(error => console.error("Erro:", error))
}


function logout() {
    sessionStorage.removeItem('userID')
    sessionStorage.removeItem('userProfile')

    window.location.href = '../screens/index.html'
}



//Dá também pra deixar com a div setada nos headers e verificar com o ternário, e deixar o Cadastrar como hidden se perfil não for 1
function carregarMenu() {
    let navMenu = document.getElementById('navMenu')
    let url = window.location.href;

    let userID = sessionStorage.getItem('userID')
    let perfilUsuario = sessionStorage.getItem('userProfile')

    if(!perfilUsuario || parseInt(perfilUsuario) !== 1) {
        navMenu.innerHTML = `
        <div class="flex divide-x py-2 text-white font-bold">
            <a href="./index.html" class="px-5 py-0.5 hover:underline hover:underline-offset-4 ${url.includes('index') ? 'bg-white text-black' : ''}">HOME</a>
            <a href="./forum.html" class="px-5 py-0.5 hover:underline hover:underline-offset-4 ${url.includes('forum') ? 'bg-white text-black' : ''}">FÓRUM</a>
            <a href="desaparecidos.html" class="px-5 py-0.5 hover:underline hover:underline-offset-4 ${url.includes('desaparecidos') ? 'bg-white text-black' : ''}">DESAPARECIDOS</a>
            <button class="px-5 py-0.5 hover:underline hover:underline-offset-4" id="botaoLoginLogout" onclick="loginLogout()">${userID ? 'SAIR' : 'ENTRAR'}</button>
        </div>
        `
    } else {
        navMenu.innerHTML = `
        <div class="flex divide-x py-2 text-white font-bold">
            <a href="./index.html" class="px-5 py-0.5 hover:underline hover:underline-offset-4 ${url.includes('index') ? 'bg-white text-black' : ''}">HOME</a>
            <a href="./forum.html" class="px-5 py-0.5 hover:underline hover:underline-offset-4 ${url.includes('forum') ? 'bg-white text-black' : ''}">FÓRUM</a>
            <a href="desaparecidos.html" class="px-5 py-0.5 hover:underline hover:underline-offset-4 ${url.includes('desaparecidos') ? 'bg-white text-black' : ''}">DESAPARECIDOS</a>
            <button class="px-5 py-0.5 hover:underline hover:underline-offset-4 ${url.includes('cadastrar') ? 'bg-white text-black' : ''}" id="botaoCadastrarDesaparecido" onclick="cadastrarDesaparecido()">CADASTAR</button>
            <button class="px-5 py-0.5 hover:underline hover:underline-offset-4" id="botaoLoginLogout" onclick="loginLogout()">${userID ? 'SAIR' : 'ENTRAR'}</button>
        </div>
        `
    }
}

function verificarPermissao() {
    let perfilUsuario = sessionStorage.getItem('userProfile')

    if(!perfilUsuario || parseInt(perfilUsuario) !== 1) {
        window.location.href = '../screens/index.html'
    }
}