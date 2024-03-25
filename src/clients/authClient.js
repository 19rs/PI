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
    dialogLogin.className = 'w-full sm:w-1/2 mt-24 rounded-lg shadow-lg border border-gray-300'
    dialogLogin.id = 'dialogLogin'

    dialogLogin.addEventListener('click', function(event) {
        if (event.target === dialogLogin) { 
            let dialogLogin = document.getElementById('dialogLogin')
            dialogLogin.close()
            dialogLogin.remove()
        }
    })

    let closeButton = document.createElement('button')
    closeButton.className = 'absolute top-3 right-5 border border-gray-200 px-2.5 pb-0.5 rounded hover:bg-red-400 hover:text-white hover:border-red-500'
    closeButton.innerText = 'x'
    closeButton.addEventListener('click', function() { 
        dialogLogin.close() 
        dialogLogin.remove()
    })
    dialogLogin.appendChild(closeButton)

    let form = document.createElement('form')
    form.className = "grid gap-5 pt-10 pb-16 px-5 sm:px-20 bg-white"
    form.innerHTML = `
        <h1 class="font-bold text-xl text-center my-8">Login</h1>
        <div class="relative mb-6 w-full group">
            <input type="email" name="emailLogin" id="emailLogin" class="block py-4 px-4 w-full text-sm rounded text-gray-900 bg-transparent border border-gray-400 appearance-none focus:outline-none focus:ring-1 focus:border-blue-600 peer" placeholder=" " required />

            <label for="emailLogin" class="absolute text-md px-1 duration-300 transform -translate-y-7 scale-75 top-3.5 start-3 z-10 origin-[0] peer-focus:left-3 bg-white peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">E-mail</label>
        </div>
        <div class="relative mb-2 w-full group">
            <input type="password" name="senhaLogin" id="senhaLogin" class="block py-4 px-4 w-full text-sm rounded text-gray-900 bg-transparent border border-gray-400 appearance-none focus:outline-none focus:ring-1 focus:border-blue-600 peer" placeholder=" " required />

            <label for="senhaLogin" class="absolute text-md px-1 duration-300 transform -translate-y-7 scale-75 top-3.5 start-3 z-10 origin-[0] peer-focus:left-3 bg-white peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Senha</label>
        </div>
        <div class="h-4">
            <span class="text-red-500 hidden text-center" id="spanErro"></span>
        </div>

        <button type="submit" class="px-10 border p-4 mt-2 bg-green-500 text-white font-bold text-lg rounded hover:bg-green-400">Entrar</button>

        <p class="mx-auto text-sm"><a href='./cadastrarUsuario.html'>Ainda nao tem uma conta?</a></p>
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
    let email = document.getElementById('emailLogin').value
    let senha = document.getElementById('senhaLogin').value

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