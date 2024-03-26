function listarUsuarios() {
  verificarPermissao()

  fetch("http://localhost:3000/usuarios")
    .then((response) => response.json())
    .then(function (data) {

      let listaUsuarios = document.getElementById("listaUsuarios")

      let divTabela = document.createElement('div')  
      divTabela.className = "relative overflow-x-auto shadow-md sm:rounded-lg"

      listaUsuarios.appendChild(divTabela)

        // <table class=>
 
        //         <tr>
        //             <th scope="col" class="px-6 py-3">
        //                 Product name
        //             </th>
        //             <th scope="col" class="px-6 py-3">
        //                 Color
        //             </th>
        //             <th scope="col" class="px-6 py-3">
        //                 Category
        //             </th>
        //             <th scope="col" class="px-6 py-3">
        //                 Price
        //             </th>
        //             <th scope="col" class="px-6 py-3">
        //                 Action
        //             </th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        //             <th scope="row" class=>
        //                 Apple MacBook Pro 17"
        //             </th>
        //             <td class="px-6 py-4">
        //                 Silver
        //             </td>
        //             <td class="px-6 py-4">
        //                 Laptop
        //             </td>
        //             <td class="px-6 py-4">
        //                 $2999
        //             </td>
        //             <td class="px-6 py-4">
        //                 <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        //             </td>
        //         </tr>
        //         <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        //             <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        //                 Microsoft Surface Pro
        //             </th>
        //             <td class="px-6 py-4">
        //                 White
        //             </td>
        //             <td class="px-6 py-4">
        //                 Laptop PC
        //             </td>
        //             <td class="px-6 py-4">
        //                 $1999
        //             </td>
        //             <td class="px-6 py-4">
        //                 <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        //             </td>
        //         </tr>
        //         <tr class="bg-white dark:bg-gray-800">
        //             <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        //                 Magic Mouse 2
        //             </th>
        //             <td class="px-6 py-4">
        //                 Black
        //             </td>
        //             <td class="px-6 py-4">
        //                 Accessories
        //             </td>
        //             <td class="px-6 py-4">
        //                 $99
        //             </td>
        //             <td class="px-6 py-4">
        //                 <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        //             </td>
        //         </tr>
        //     </tbody>


      let tabela = document.createElement('table')
      tabela.className = "table-fixed w-full text-sm text-left text-gray-500"
      tabela.innerHTML = `
        <thead class="text-sm text-gray-700 uppercase bg-gray-50">
          <tr class="border-b border-gray-200">
            <th class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">ID</th>
            <th class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">Nome</th>
            <th class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">Username</th>
            <th class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">E-mail</th>
            <th class="px-6 py-4 font-bold text-gray-900 text-center whitespace-nowrap">Perfil</th>
            <th class="px-6 py-4 font-bold text-gray-900 text-center whitespace-nowrap">Ações</th>
          </tr>
        </thead>
      `

      let tbody = document.createElement('tbody')
      tabela.appendChild(tbody)
      
      data.forEach(usuario => {
        let tr = document.createElement('tr')
        // tr.className = "border"
        tr.className="bg-white border-b"
        tr.innerHTML = `
          <td class="px-6 py-4">${usuario.id}</td>
          <td class="px-6 py-4">${usuario.nome}</td>
          <td class="px-6 py-4">${usuario.username}</td>
          <td class="px-6 py-4">${usuario.email}</td>
          <td class="px-6 py-4 text-center ${usuario.perfil === 1 ? 'font-bold text-blue-500' : null}">${usuario.perfil === 1 ? 'Admin' : 'Usuário'}</td>
        `
        let tdAcoes = document.createElement('td')
        tdAcoes.className = "px-6 py-4 flex justify-center gap-5"

        tr.appendChild(tdAcoes)

        let btnEdit = document.createElement('button')
        btnEdit.className="text-[#454545] py-1 hover:text-blue-700"
        // btnEdit.innerText = "Editar" 
        btnEdit.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        `
        btnEdit.setAttribute('type', "button")
        btnEdit.addEventListener('click', function () {
          criarDialogEdicao(usuario)
        })
        tdAcoes.appendChild(btnEdit)

        let btnDelete = document.createElement('button')
        btnDelete.className="text-[#454545] py-1 hover:text-red-600"
        // btnDelete.innerText = "Deletar" 
        btnDelete.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
          </svg>
        `
        btnDelete.setAttribute('type', "button")
        btnDelete.addEventListener('click', function () {
          deletarUsuario(usuario)
        })
        tdAcoes.appendChild(btnDelete)

        tbody.appendChild(tr)
      })

      // listaUsuarios.appendChild(tabela)
      divTabela.appendChild(tabela)
    })
}

function addUsuario() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const senha = document.getElementById('senha').value;


  const formData = new FormData();

  formData.append("nome", nome);
  formData.append("email", email);
  formData.append("username", username);
  formData.append("perfil" , 2)
  formData.append("senha", senha);
  
  
  fetch("http://localhost:3000/usuario", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert('OK')
      console.log("Cadastro realizado com sucesso!");

      document.getElementById('alert').style.display = 'block'
    })
    .catch((error) => console.log("Erro:" + error));
}




function deletarUsuario(usuario) {
  let confirmacao = `Confirma a exclusão desse Usuário?\n\nID: ${usuario.id}\nNome: ${usuario.nome}\nUsername: ${usuario.username}\nEmail: ${usuario.email}`

  if(confirm(confirmacao) === true) {
    fetch(`http://localhost:3000/usuario/${usuario.id}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then(() => {
      alert('Usuário deletado com sucesso!')
    })
    .catch((error) => console.log("Erro:" + error));
  }
}



function criarDialogEdicao(usuario) {

  let dialogEdicao = document.createElement('dialog')
  dialogEdicao.className = 'w-full sm:w-1/2 mt-24 rounded-lg shadow-lg border border-gray-300'
  dialogEdicao.id = 'dialogEdicao'

  dialogEdicao.addEventListener('click', function(event) {
    if (event.target === dialogEdicao) { 
        let dialogEdicao = document.getElementById('dialogEdicao')
        dialogEdicao.close()
        dialogEdicao.remove()
    }
  })

  let closeButton = document.createElement('button')
  closeButton.className = 'absolute top-3 right-5 border border-gray-200 px-2.5 pb-0.5 rounded hover:bg-red-400 hover:text-white hover:border-red-500'
  closeButton.innerText = 'x'
  closeButton.addEventListener('click', function() { 
    dialogEdicao.close() 
    dialogEdicao.remove()
  })
  dialogEdicao.appendChild(closeButton)

  let form = document.createElement('form')
  form.className = "grid gap-5 pt-8 pb-12 px-5 sm:px-20 bg-white"
  form.innerHTML = `
      <h1 class="font-bold text-xl text-center my-8">Editar Usuário</h1>
      <div class="relative mb-6 w-full group">
          <input type="text" name="nome" id="nome" class="block py-4 px-4 w-full text-sm rounded text-gray-900 bg-transparent border border-gray-400 appearance-none focus:outline-none focus:ring-1 focus:border-blue-600 peer" placeholder=" " required value=${usuario.nome} />

          <label for="nome" class="absolute text-md px-1 duration-300 transform -translate-y-7 scale-75 top-3.5 start-3 z-10 origin-[0] peer-focus:left-3 bg-white peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Nome</label>
      </div>
      <div class="relative mb-6 w-full group">
          <input type="text" name="username" id="username" class="block py-4 px-4 w-full text-sm rounded text-gray-900 bg-transparent border border-gray-400 appearance-none focus:outline-none focus:ring-1 focus:border-blue-600 peer" placeholder=" " required value=${usuario.username} />

          <label for="username" class="absolute text-md px-1 duration-300 transform -translate-y-7 scale-75 top-3.5 start-3 z-10 origin-[0] peer-focus:left-3 bg-white peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Username</label>
      </div>

      <div class="relative mb-2 w-full group">
          <input type="email" name="email" id="email" class="block py-4 px-4 w-full text-sm rounded text-gray-900 bg-transparent border border-gray-400 appearance-none focus:outline-none focus:ring-1 focus:border-blue-600 peer" placeholder=" " required value=${usuario.email} />

          <label for="email" class="absolute text-md px-1 duration-300 transform -translate-y-7 scale-75 top-3.5 start-3 z-10 origin-[0] peer-focus:left-3 bg-white peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">E-mail</label>
      </div>

      <button type="submit" class="px-10 border p-4 mt-4 font-bold text-lg rounded bg-[#191919] text-white hover:bg-gray-600">Salvar Alterações</button>
  `

    form.addEventListener('submit', function (event){
        event.preventDefault()
        atualizarUsuario(usuario.id)
    })

    dialogEdicao.appendChild(form)

    document.body.appendChild(dialogEdicao)
    dialogEdicao.showModal()
}

function atualizarUsuario(id) {
  const nome = document.getElementById("nome").value
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value

  fetch(`http://localhost:3000/usuario/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      username: username,
      email: email
    })
  })
  .then(response => response.json())
  .then((data) => {
    alert(data.message)
  })
  .catch(error => console.error("Erro:", error))
}

