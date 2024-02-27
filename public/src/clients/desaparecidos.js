function cadastrarDesaparecido() {
    let perfilUsuario = sessionStorage.getItem('userProfile')

    if(!perfilUsuario || parseInt(perfilUsuario) !== 1) {
        alert('Probido')
        return
    } else {
        criarDialogCadastroDesaparecido()
    }
}


function criarDialogCadastroDesaparecido() {
    let dialogCadastroDesaparecido = document.createElement('dialog')
    dialogCadastroDesaparecido.className = 'w-1/2 mt-24 bg-gray-50 rounded-lg shadow-lg border border-bg-gray-100'
    dialogCadastroDesaparecido.id = 'dialogCadastroDesaparecido'

    let closeButton = document.createElement('button')
    closeButton.className = 'absolute top-3 right-5 border border-gray-200 px-2 pb-0.5 rounded'
    closeButton.innerText = 'x'
    closeButton.addEventListener('click', () => dialogCadastroDesaparecido.close())
    dialogCadastroDesaparecido.appendChild(closeButton)

    let form = document.createElement('form')
    form.className = "grid gap-5 bg-gray-50 pt-10 pb-16 px-5 px-32"
    form.innerHTML = `
        <h1 class="font-bold text-xl text-center my-5">CADASTRAR PESSOA DESAPARECIDA</h1>
        <div class="grid w-full">
            <label for="nome">Nome Completo:</label>
            <input type="text" name="nome" id="nome" class="border px-2 py-3">
        </div>
        <div class="grid">
            <label for="dataNascimento">Data Nascimento:</label>
            <input type="date" name="dataNascimento" id="dataNascimento" class="border px-2 py-3">
        </div>
        <div class="h-4">
            <span class="text-red-500 hidden text-center" id="spanErro"></span>
        </div>
        <button type="submit" class="px-10 border p-4 mt-4 bg-green-500 text-white font-bold text-lg rounded hover:bg-green-400">Cadastrar</button>
    `

    form.addEventListener('submit', function (event){
        event.preventDefault()
        logar()
    })

    dialogCadastroDesaparecido.appendChild(form)

    document.body.appendChild(dialogCadastroDesaparecido)
    dialogCadastroDesaparecido.showModal()
}