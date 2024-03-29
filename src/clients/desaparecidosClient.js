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
      criarCardsPessoas(data);
    })
    .catch((error) => console.error("Erro:", error));
}

function criarCardsPessoas(data) {
  let listaDesparecidos = document.getElementById("listaDesparecidos");
  console.log(listaDesparecidos);
  listaDesparecidos.innerHTML = "";

  data.forEach((pessoa) => {
    let div = document.createElement("div");
    // div.className = "shadow border border-gray-300 rounded cursor-pointer";
    div.className = "shadow-md rounded cursor-pointer border border-gray-100 relative  ";

    let perfilUsuario = sessionStorage.getItem("userProfile");
    let mostrarBotoes = parseInt(perfilUsuario) === 1;

    div.addEventListener("mouseover", function () {
      mostrarBotoes ?  div.querySelector('#teste').style.display='block' :  div.addEventListener("click", function () { renderItem(pessoa.id)
        });
     
     });
 
     div.addEventListener("mouseleave", function () {
       div.querySelector('#teste').style.display='none';
     });


    // div.addEventListener("click", function () {
    //   renderItem(pessoa.id);
    // });

    listaDesparecidos.appendChild(div);

    div.innerHTML += `
                    <div id="teste" class="hidden absolute w-full ml-6 mt-2 }">
                    <span class="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                    <button onclick="alterar(${pessoa.id})"
                  
                    class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                    Editar
                    </button>
                  
                    <button  onclick="renderItem(${pessoa.id})"
               
                    class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                    Ver
                    </button>
                  
                    <button onclick="deleteDesaparecido(${pessoa.id})"
                   
                    class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                    Deletar
                    </button>
                    </span>

                    </div>

      <div class='h-64 w-64 flex justify-center'>
          <img class='max-h-64 max-w-64 rounded-tl-sm rounded-tr-sm'  src=${
            pessoa.foto ? pessoa.foto : "img/pessoas/SemFoto.png"
          } alt="foto desaparecido">
      </div>
      <div class="w-full max-w-64">
          <h1 class='px-2 text-center font-bold text-lg border-gray-300 bg-gray-200 py-3 truncate'>${
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
      `;
 

  });

}

async function getPessoaById(id) {
  try {
    const response = await fetch(`http://localhost:3000/pessoa/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar pessoa');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar pessoa:", error);
    throw error;
  }
}

async function renderItem(id) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  let perfilUsuario = sessionStorage.getItem("userProfile");
  let mostrarBotoes = parseInt(perfilUsuario) === 1;

  const pessoa = await getPessoaById(id)
  const anoAtual = new Date().getFullYear();

  const anoNascimento = pessoa.data_nascimento.substring(0, 4);
  let idade = anoAtual - anoNascimento;


  modal.innerHTML = ` `;

  modal.innerHTML = `
 <div  id='pdf-content' class='bg-[#191919] p-10 rounded-lg  w-[85vw]  '>

  <div class='flex '>
          <div class='w-8/12' >
          <img src='${pessoa.foto}' class='rounded-md  ' >
          </div>
             

      <div class='flex flex-col gap-10 items-center w-full justify-center  ' >
                 
              <div class='flex gap-10  ' >
                      <div class='flex-col'>
                      <div class="flow-root w-full">
                      <dl class="-my-3 divide-y divide-gray-100 text-sm w-96">
                         
                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 ">
                            <dt class="font-medium">Nome</dt>
                            <dd class="sm:col-span-2 capitalize">${
                              pessoa.nome
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Altura</dt>
                            <dd class=" sm:col-span-2">${
                              pessoa.altura_estimada
                                ? pessoa.altura_estimada
                                : "N/A"
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Cabelo</dt>
                            <dd class=" sm:col-span-2 capitalize">${
                              pessoa.cabelo ? pessoa.cabelo : "N/A"
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Caracteristicas</dt>
                            <dd class=" sm:col-span-2 capitalize" >${
                              pessoa.caracteristicas_fisicas
                                ? pessoa.caracteristicas_fisicas
                                : "N/A"
                            }</dd>
                          </div>


                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt class="font-medium ">Genero</dt>
                          <dd class=" sm:col-span-2 capitalize">${
                            pessoa.genero ? pessoa.genero : "N/A"
                          }</dd>
                        </div>



                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt class="font-medium ">Residente</dt>
                          <dd class=" sm:col-span-2 capitalize">${
                            pessoa.residente_em ? pessoa.residente_em : "N/A"
                          }</dd>
                        </div>

                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt class="font-medium ">Idade</dt>
                          <dd class=" sm:col-span-2">${
                            idade ? idade : "N/A"
                          }</dd>
                        </div>
              </dl>
</div>
                    
                      </div>

                      <div class='flex-col '>
                    
                    
                    
                      <div class="flow-root w-full">
                      <dl class="-my-3 divide-y divide-gray-100 text-sm w-96">
                         
                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium">Nascimento</dt>
                            <dd class="sm:col-span-2">${
                              pessoa.data_nascimento
                                ? pessoa.data_nascimento
                                    .split("-")
                                    .reverse()
                                    .join("/")
                                : "N/A"
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Desapareu</dt>
                            <dd class=" sm:col-span-2 " >${
                              pessoa.data_desaparecimento
                                ? pessoa.data_desaparecimento
                                    .split("-")
                                    .reverse()
                                    .join("/")
                                : "N/A"
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt class="font-medium ">Local:</dt>
                          <dd class=" sm:col-span-2 capitalize">${
                            pessoa.local_desaparecimento
                              ? pessoa.local_desaparecimento
                              : "N/A"
                          }</dd>
                        </div>


                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Olhos</dt>
                            <dd class=" sm:col-span-2 capitalize">${
                              pessoa.olhos ? pessoa.olhos : "N/A"
                            }</dd>
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt class="font-medium ">Peso</dt>
                            <dd class=" sm:col-span-2">${
                              pessoa.peso_estimado
                                ? pessoa.peso_estimado
                                : "N/A"
                            }</dd> 
                          </div>

                          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 ${
                            mostrarBotoes ? "" : "hidden"
                          }">
                            <dt class="font-medium ">Contato</dt>
                           <dd class=" sm:col-span-2">${
                             pessoa.contato ? pessoa.contato : "N/A"
                           }</dd>
                            </div>

                        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium ">Detalhes</dt>
                        <dd class=" sm:col-span-2 capitalize">${
                          pessoa.detalhes_desaparecimento
                            ? pessoa.detalhes_desaparecimento
                            : "N/A"
                        }</dd>
                      </div>
              </dl>
</div>
                    
                    
                    

                      </div>
                 
 
              </div>
    
   
              
            
                        <div>
                      
                        <input type="submit" onclick="gerarPDF(${pessoa.id})" value="Gerar PDF"  class=" w-full  mt-5 cursor-pointer block rounded bg-[#252525] px-8 py-3 text-sm font-medium text-white transition hover:scale-[1.05] hover:shadow-xl focus:outline-none" >

                        </div>

              
                </div>
                </div>
              </div>

            
        </div>
     
          
   `;



  modal.style.display = "flex";
  overlay.style.display = "block";

  overlay.onclick = function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  };
}

async function gerarPDF(id) {
  
  const pessoa = await getPessoaById(id)
  const div = document.createElement('div')
  
  div.innerHTML += `
    <div class='flex flex-col  justify-center'> 
    <div class='h-26' style='display: flex; justify-content: center; align-items: center;'>
    <img src='${pessoa.foto}' class='w-full h-full' />
</div>

    
  
        <div class="flow-root py-2 ">
            <dl class="-my-3 divide-y divide-gray-100 text-lg ">
                <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 ">
                <dt class="font-medium ">Nome</dt>
                <dd class="sm:col-span-2 capitalize">${
                  pessoa.nome
                }</dd>
                </div>

                <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium">Altura</dt>
                <dd class="sm:col-span-2 capitalize">${
                  pessoa.altura_estimada
                  ? pessoa.altura_estimada
                  : "N/A"
                }</dd>
                </div>

                <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium">Cabelo</dt>
                <dd class="sm:col-span-2 capitalize">${
                  pessoa.cabelo ? pessoa.cabelo : "N/A"
                }</dd>
                </div>


                <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt class="font-medium ">Caracteristicas</dt>
                <dd class=" sm:col-span-2 capitalize" >${
                pessoa.caracteristicas_fisicas
                ? pessoa.caracteristicas_fisicas
                : "N/A"
                }</dd>
                 </div>

                 <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                 <dt class="font-medium ">Genero</dt>
                 <dd class=" sm:col-span-2 capitalize">${
                   pessoa.genero ? pessoa.genero : "N/A"
                 }</dd>
               </div>

               <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
               <dt class="font-medium ">Residente</dt>
               <dd class=" sm:col-span-2 capitalize">${
                 pessoa.residente_em ? pessoa.residente_em : "N/A"
               }</dd>
             </div>

             <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
             <dt class="font-medium ">Idade</dt>
             <dd class=" sm:col-span-2">${
               pessoa.idade ? pessoa.idade : "N/A"
             }</dd>
           </div>

           <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
           <dt class="font-medium">Nascimento</dt>
           <dd class="sm:col-span-2">${
             pessoa.data_nascimento
               ? pessoa.data_nascimento
                   .split("-")
                   .reverse()
                   .join("/")
               : "N/A"
           }</dd>
         </div>

         <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
         <dt class="font-medium ">Desapareu</dt>
         <dd class=" sm:col-span-2 " >${
           pessoa.data_desaparecimento
             ? pessoa.data_desaparecimento
                 .split("-")
                 .reverse()
                 .join("/")
             : "N/A"
         }</dd>
       </div>


       <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
       <dt class="font-medium ">Local:</dt>
       <dd class=" sm:col-span-2 capitalize">${
         pessoa.local_desaparecimento
           ? pessoa.local_desaparecimento
           : "N/A"
       }</dd>
     </div>

     <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
     <dt class="font-medium ">Olhos</dt>
     <dd class=" sm:col-span-2 capitalize">${
       pessoa.olhos ? pessoa.olhos : "N/A"
     }</dd>
   </div>


   <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
   <dt class="font-medium ">Peso</dt>
   <dd class=" sm:col-span-2">${
     pessoa.peso_estimado
       ? pessoa.peso_estimado
       : "N/A"
   }</dd> 
 </div>

 <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
 <dt class="font-medium ">Contato</dt>
 <dd class=" sm:col-span-2">${
   pessoa.contato
     ? pessoa.contato
     : "N/A"
 }</dd> 
</div>


<div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
<dt class="font-medium ">Detalhes</dt>
<dd class=" sm:col-span-2 capitalize">${
  pessoa.detalhes_desaparecimento
    ? pessoa.detalhes_desaparecimento
    : "N/A"
}</dd>
</div>


                </dl>
        </div>

    </div>
  `
  
  
  const options = {
    margin: 10,
    filename: `${pessoa.nome}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(div).set(options).save();
  
}





async function alterar(id) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.style.display='block'
  overlay.style.display='block'

  const pessoa = await getPessoaById(id)
  console.log(pessoa);

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
      evt.preventDefault();
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
      // alert("tudo certo pai");
      Swal.fire({
        title: "Sucesso",
        timer: 10000,
        icon: "success",
      });
    })
    .catch((error) => console.log("Erro:" + error));
}

function deleteDesaparecido(id) {
  const conv = parseInt(id);

  Swal.fire({
    title: "Voce tem certeza?",
    text: "Voce nao pode reverter isso",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Nao, cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, tenho certeza",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/pessoa/${conv}`, {
        method: "DELETE",
      })
        .then((data) => {
          Swal.fire({
            title: "Deletado!",
            text: "Deletado com Sucesso.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Erro ao excluir pessoa:", error);
          Swal.fire({
            title: "Erro",
            text: "Erro ao deletar.",
            icon: "error",
          });
        });
    }
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

  Swal.fire({
    title: "Confirmar Alterações?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/pessoa/${conv}`, {
        method: "PUT",
        body: formData,
      })
        .then((data) => {
          Swal.fire({
            title: "Alterado!",
            text: "Alterado com Sucesso.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Erro ao excluir pessoa:", error);
          Swal.fire({
            title: "Erro",
            text: "Erro ao Alterar.",
            icon: "error",
          });
        });
    }
  });

  // fetch(`http://localhost:3000/pessoa/${conv}`, {
  //   method: "PUT",
  //   body: formData,
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     alert(data.message);
  //     console.log("Alterado  com sucesso!");
  //     window.location.reload()
  //   })
  //   .catch((error) => console.log("Erro:" + error));
}

function filtrarDesaparecidos() {
  let nome = document.getElementById("filtroNome").value;
  let localDesaparecimento = document.getElementById(
    "filtroLocalDesaparecimento"
  ).value;
  let genero = document.getElementById("filtroGenero").value;
  let idadeMin = document.getElementById("filtroIdadeMin").value;
  let idadeMax = document.getElementById("filtroIdadeMax").value;

  fetch(
    `http://localhost:3000/pessoas/filtrar?nome=${nome}&local_desaparecimento=${localDesaparecimento}&genero=${genero}&idadeMin=${idadeMin}&idadeMax=${idadeMax}`
  )
    .then((response) => response.json())
    .then((data) => {
      criarCardsPessoas(data);
    })
    .catch((error) => console.error("Erro:", error));
}
