function cadastrarDesaparecido() {
  let perfilUsuario = sessionStorage.getItem("userProfile");

  if (!perfilUsuario || parseInt(perfilUsuario) !== 1) {
    alert("Proibido");
    return;
  } else {
    // criarDialogCadastroDesaparecido()
    window.location.href = "../screens/cadastrarDesaparecido.html";
  }
}

function listarDesaparecidos() {
  fetch("http://localhost:3000/pessoas")
    .then((response) => response.json())
    .then(function (data) {
      let listaDesparecidos = document.createElement("section")
      listaDesparecidos.id = "listaDesaparecidos"
      listaDesparecidos.className = "container mx-auto px-10 flex flex-wrap gap-x-8 gap-y-8 justify-center mb-10"

      document.body.appendChild(listaDesparecidos)

      criarCardsPessoas(data)
    })      
    .catch((error) => console.error("Erro:", error))
}

function criarCardsPessoas(data) {
  let listaDesparecidos = document.getElementById("listaDesaparecidos");
  listaDesparecidos.innerHTML = ''

  data.forEach((pessoa) => {
    let div = document.createElement("div");
    // div.className = "shadow border border-gray-300 rounded cursor-pointer";
    div.className = "shadow-md rounded cursor-pointer border border-gray-100";
    div.addEventListener("click", function () {
      renderItem(pessoa)
    });

    listaDesparecidos.appendChild(div)

    div.innerHTML += `
      <div class='h-64 w-64 flex justify-center'>
          <img class='max-h-64 max-w-64 rounded-tl-sm rounded-tr-sm'  src=${
            pessoa.foto ? pessoa.foto : "img/pessoas/SemFoto.png"
          } alt="foto desaparecido">
      </div>
      <div>
          <h1 class='text-center font-bold text-lg border-gray-300 bg-gray-200 py-3'>${
            pessoa.nome
          }</h1>
          <h2 class='px-3 py-3 border-b'>Nascimento: ${
            pessoa.data_nascimento
              ? pessoa.data_nascimento.split("-").reverse().join("/")
              : ""
          }</h2>
          <h2 class='px-3 py-3 border-b'>Desaparecimento: <b>${pessoa.data_desaparecimento
            .split("-")
            .reverse()
            .join("/")}</b></h2>
          <h2 class='px-3 py-3'>Local: <b>${
            pessoa.local_desaparecimento
          }</b></h2>
      </div>
      `
    })
}


function renderItem(pessoa) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  let perfilUsuario = sessionStorage.getItem("userProfile");
  let mostrarBotoes = parseInt(perfilUsuario) === 1;

  modal.innerHTML = ` `;

  modal.innerHTML = `
 <div class='bg-[#191919] p-10 rounded-lg  w-[70vw] '>

  <div class='flex '>
  <div class='w-6/12' >
  <img src='${
    pessoa.foto
  }' class='rounded-md w-full h-full ' >
  </div>
             

      <div class='flex flex-col gap-10 items-center w-full ' >
                 
              <div class='flex gap-10 ' >
                      <div class='flex-col '>
                      <div class="flow-root w-full">
                      <dl class="-my-3 divide-y divide-gray-100 text-sm w-80">
                         
                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium">Nome</dt>
                            <dd class="sm:col-span-2 capitalize">${pessoa.nome}</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Altura</dt>
                            <dd class=" sm:col-span-2">${
                              pessoa.altura_estimada ? pessoa.altura_estimada : 'N/A'
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Cabelo</dt>
                            <dd class=" sm:col-span-2 capitalize">${pessoa.cabelo ? pessoa.cabelo : 'N/A'}</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Caracteristicas</dt>
                            <dd class=" sm:col-span-2 capitalize" >${
                              pessoa.caracteristicas_fisicas ?  pessoa.caracteristicas_fisicas : "N/A"
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt class="font-medium ">Contato</dt>
                          <dd class=" sm:col-span-2 capitalize">${pessoa.contato ? pessoa.contato : "N/A"}</dd>
                        </div>

                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt class="font-medium ">Residente</dt>
                          <dd class=" sm:col-span-2 capitalize">${pessoa.residente_em ? pessoa.residente_em : "N/A"}</dd>
                        </div>

                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt class="font-medium ">Idade</dt>
                          <dd class=" sm:col-span-2">${pessoa.idade ? pessoa.idade :"N/A"}</dd>
                        </div>
              </dl>
</div>
                    
                      </div>

                      <div class='flex-col '>
                    
                    
                    
                      <div class="flow-root w-full">
                      <dl class="-my-3 divide-y divide-gray-100 text-sm w-80">
                         
                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium">Nascimento</dt>
                            <dd class="sm:col-span-2">${
                              pessoa.data_nascimento ?  pessoa.data_nascimento:'N/A'
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Desapareu</dt>
                            <dd class=" sm:col-span-2 " >${
                              pessoa.data_desaparecimento
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Genero</dt>
                            <dd class=" sm:col-span-2 capitalize">${pessoa.genero ? pessoa.genero:'N/A'}</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Olhos</dt>
                            <dd class=" sm:col-span-2 capitalize">${
                              pessoa.olhos ?  pessoa.olhos:'N/A'
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Peso</dt>
                            <dd class=" sm:col-span-2">${
                              pessoa.peso_estimado ?  pessoa.peso_estimado : "N/A"
                            }</dd> 
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt class="font-medium ">Contato</dt>
                          <dd class=" sm:col-span-2">${pessoa.contato? pessoa.contato:'N/A' }</dd>
                        </div>

                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium ">Detalhes</dt>
                        <dd class=" sm:col-span-2 capitalize">${
                          pessoa.detalhes_desaparecimento ? pessoa.detalhes_desaparecimento:"N/A"
                        }</dd>
                      </div>
              </dl>
</div>
                    
                    
                    
                    
                    
                    
                    




                      </div>
                 
 
              </div>
    
   
                 
                <div class=' p-5 rounded-lg' ${mostrarBotoes ? "" : "hidden"} >
              <div class='text-center flex gap-5'>
              <a
              id="btn"
              class="block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              href="#" >
              Alterar
                </a>
            
              <a
              id="deletar"
              class="block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              href="#" >
              Excluir
                </a>
              </div>


              
                </div>
                </div>
              </div>

            
        </div>
     
          
   `;

  document.getElementById(`btn`).onclick = function () {
    alterar(pessoa);
  };

   document.getElementById(`deletar`).onclick = function () {
    deleteDesaparecido(pessoa.id);
  };
  
  modal.style.display = "flex";
  overlay.style.display = "block";

  overlay.onclick = function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  };
}

function alterar(pessoa) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.innerHTML = "";

  modal.innerHTML = `

  <div class='bg-[#191919] p-10 flex-col  rounded-lg flex  items-start '>

  <div class='flex gap-12	py-5'>

  <div class='flex flex-col  gap-2 w-80 '>

  <div>
  <label
  for="nomeAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="nomeAlterar"
    placeholder="Nome"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    Nome
  </span>
  </div>


  <div>
  <label
  for="cpfAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="cpfAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    CPF
  </span>
  </div>

  <div>
  <label
  for="generoAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="generoAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    Genero
  </span>
  </div>

  <div>
  <label
  for="olhosAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="olhosAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    Olhos
  </span>
  </div>

  <div>
  <label
  for="altEstAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="altEstAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    Altura
  </span>
  </div>


  <div>
  <label
  for="pesoAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="pesoAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    Peso
  </span>
  </div>


  
  <div>
  <label
  for="cabeloAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="cabeloAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    Cabelo
  </span>
  </div>




  </div>

  <div  class='flex flex-col  w-80 gap-2 '>


  <div>
  <label
  for="caracteAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="caracteAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    Caracteristicas Fisicas
  </span>
  </div>

  <div>
  <label
  for="vestimentasAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="vestimentasAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
   Vestimentas
  </span>
  </div>


  <div>
  <label
  for="residenteAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="residenteAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
   Residente Em
  </span>
  </div>

  <div>
  <label
  for="dtDesaAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="date"
    id="dtDesaAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
   Data Desaparecimento
  </span>
  </div>

  <div>
  <label
  for="localDesaAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="localDesaAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
   Local Desaparecimento
  </span>
  </div>

  <div>
  <label
  for="contatoAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="contatoAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
   Contato
  </span>
  </div>

  <div>
  <label
  for="detalhesAlterar"
  class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
  <input
    type="text"
    id="detalhesAlterar"
    placeholder="CPF"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute start-0 top-2 -translate-y-1/2 text-xs  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
   Detalhes
  </span>
  </div>

 
  </div>
  </div>



  <div class=' w-full text-center'>
  <a
  id="AlterButton"
  class="block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
  href="#" >
  Alterar
    </a>
  </div>
      </div>
  `;

  document.getElementById("AlterButton").addEventListener("click", function (evt) {
    evt.preventDefault()
    updateDesaparecido(pessoa.id);
    
  });

  document.getElementById("nomeAlterar").value = pessoa.nome;
  document.getElementById("cpfAlterar").value = pessoa.cpf;
  document.getElementById("generoAlterar").value = pessoa.genero;
  document.getElementById("olhosAlterar").value = pessoa.olhos;
  document.getElementById("altEstAlterar").value = pessoa.altura_estimada;
  document.getElementById("pesoAlterar").value = pessoa.peso_estimado;
  document.getElementById("cabeloAlterar").value = pessoa.cabelo;
  document.getElementById("caracteAlterar").value =
    pessoa.caracteristicas_fisicas;
  document.getElementById("vestimentasAlterar").value = pessoa.vestimentas;

  document.getElementById("residenteAlterar").value = pessoa.residente_em;
  document.getElementById("dtDesaAlterar").value = pessoa.data_desaparecimento;
  document.getElementById("localDesaAlterar").value =
    pessoa.local_desaparecimento;

  document.getElementById("detalhesAlterar").value =
    pessoa.detalhes_desaparecimento;
  document.getElementById("contatoAlterar").value = pessoa.contato;

  overlay.onclick = function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  };
}

function addDesaparecidos() {
  
  const nome = document.getElementById("nome").value;
  const data_nascimento = document.getElementById("dataNascimento").value;
  const genero = document.getElementById("genero").value;
  const olhos = document.getElementById("olhos").value;
  const altura_estimada = document.getElementById("altura").value;
  const peso_estimado = document.getElementById("peso").value;
  const cabelo = document.getElementById("cabelo").value;
  const residente_em = document.getElementById("residenteEm").value;

  const cpf = document.getElementById("cpf").value;
  const vestimentas = document.getElementById("vestimentas").value;
  const data_desaparecimento = document.getElementById(
    "dataDesaparecimento"
  ).value;
  const local_desaparecimento = document.getElementById(
    "localDesaparecimento"
  ).value;
  const caracteristicas_fisicas = document.getElementById("caracte").value;
  const contato = document.getElementById("contato").value;
  const detalhes_desaparecimento = document.getElementById(
    "detalhes-desaparecimento"
  ).value;

  const inputFoto = document.getElementById("fotoDesaparecido");
  let foto = "";

  if (inputFoto.files[0]) {
    foto = inputFoto.files[0];
  }

  const anoAtual = new Date().getFullYear();

  const anoNascimento = data_nascimento.substring(0, 4);
  let idade = anoAtual - anoNascimento;

  const formData = new FormData();

  formData.append("nome", nome);
  formData.append("cpf", cpf);
  formData.append("data_nascimento", data_nascimento);
  formData.append("idade", idade);
  formData.append("genero", genero);
  formData.append("olhos", olhos);
  formData.append("altura_estimada", altura_estimada);
  formData.append("peso_estimado", peso_estimado);
  formData.append("cabelo", cabelo);
  formData.append("caracteristicas_fisicas", caracteristicas_fisicas);
  formData.append("vestimentas", vestimentas);
  formData.append("residente_em", residente_em);
  formData.append("foto", foto);
  formData.append("data_desaparecimento", data_desaparecimento);
  formData.append("local_desaparecimento", local_desaparecimento);
  formData.append("detalhes_desaparecimento", detalhes_desaparecimento);
  formData.append("contato", contato);

  fetch("http://localhost:3000/pessoas", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // displaySuccessMessage()
      //alert(data.message);
      // console.log("Cadastro realizado com sucesso!");
    
      //aparece muito rapido
      document.getElementById('alert').style.display = 'block';

    })
    .catch((error) => console.log("Erro:" + error));
}

function deleteDesaparecido(id) {
  const conv = parseInt(id);

  if (isNaN(conv)) {
    alert("ID inválido");
    return;
  }

  fetch(`http://localhost:3000/pessoa/${conv}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao excluir pessoa");
      }
      return response.json();
    })
    .then((data) => {
      alert("Pessoa deletada com sucesso");
    })
    .catch((error) => {
      alert("Erro: " + error.message);
    });
}

function updateDesaparecido(id) {
  const conv = parseInt(id);

  const formData = new FormData();
  formData.append("id", conv);
  formData.append("nome", document.getElementById("nomeAlterar").value);
  formData.append("cpf", document.getElementById("cpfAlterar").value);
  formData.append("genero", document.getElementById("generoAlterar").value);
  formData.append("olhos", document.getElementById("olhosAlterar").value);
  formData.append(
    "altura_estimada",
    document.getElementById("altEstAlterar").value
  );
  formData.append(
    "peso_estimado",
    document.getElementById("pesoAlterar").value
  );
  formData.append("cabelo", document.getElementById("cabeloAlterar").value);
  formData.append(
    "caracteristicas_fisicas",
    document.getElementById("caracteAlterar").value
  );
  formData.append(
    "vestimentas",
    document.getElementById("vestimentasAlterar").value
  );
  formData.append(
    "residente_em",
    document.getElementById("residenteAlterar").value
  );
  formData.append(
    "data_desaparecimento",
    document.getElementById("dtDesaAlterar").value
  );
  formData.append(
    "local_desaparecimento",
    document.getElementById("localDesaAlterar").value
  );
  formData.append(
    "detalhes_desaparecimento",
    document.getElementById("detalhesAlterar").value
  );
  formData.append("contato", document.getElementById("contatoAlterar").value);

  fetch(`http://localhost:3000/pessoa/${conv}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      console.log("Alterado  com sucesso!");
      window.location.reload()
    })
    .catch((error) => console.log("Erro:" + error));
}



function filtrarDesaparecidos() {
  let nome = document.getElementById("filtroNome").value
  let localDesaparecimento = document.getElementById("filtroLocalDesaparecimento").value
  let genero = document.getElementById("filtroGenero").value
  let idadeMin = document.getElementById("filtroIdadeMin").value
  let idadeMax = document.getElementById("filtroIdadeMax").value

  fetch(`http://localhost:3000/pessoas/filtrar?nome=${nome}&local_desaparecimento=${localDesaparecimento}&genero=${genero}&idadeMin=${idadeMin}&idadeMax=${idadeMax}`)
  .then((response) => response.json())
  .then((data) => {
      criarCardsPessoas(data)    
    })
    .catch((error) => console.error("Erro:", error));
}