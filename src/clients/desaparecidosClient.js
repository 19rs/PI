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
             

      <div class='flex flex-col gap-10 items-center w-full justify-around  ' >
                 
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
    
   
              
            
                        <div class='w-full' >

                        <div class='cursor-pointer items-center flex justify-start ml-16'">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48"  onclick="compartilharPDF(${pessoa.id},'whats')">
                        <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                        </svg> 

                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100" onclick="compartilharPDF(${pessoa.id},'insta')">
                        <path d="M32.5,93C20.645,93,11,83.355,11,71.5v-39C11,20.645,20.645,11,32.5,11h39C83.355,11,93,20.645,93,32.5v39 C93,83.355,83.355,93,71.5,93H32.5z" opacity=".35"></path><path fill="#f2f2f2" d="M30.5,91C18.645,91,9,81.355,9,69.5v-39C9,18.645,18.645,9,30.5,9h39C81.355,9,91,18.645,91,30.5v39 C91,81.355,81.355,91,69.5,91H30.5z"></path><path fill="#d84178" d="M69.5,84.5h-39c-8.284,0-15-6.716-15-15v-39c0-8.284,6.716-15,15-15h39c8.284,0,15,6.716,15,15v39 C84.5,77.784,77.784,84.5,69.5,84.5z"></path><path fill="#40396e" d="M69.5,86h-39C21.402,86,14,78.598,14,69.5v-39C14,21.402,21.402,14,30.5,14h39 C78.598,14,86,21.402,86,30.5v39C86,78.598,78.598,86,69.5,86z M30.5,17C23.056,17,17,23.056,17,30.5v39 C17,76.944,23.056,83,30.5,83h39C76.944,83,83,76.944,83,69.5v-39C83,23.056,76.944,17,69.5,17H30.5z"></path><g><path fill="#f2f2f2" d="M49.995,23c-7.334,0-8.254,0.032-11.134,0.163c-2.875,0.132-4.837,0.587-6.554,1.255 c-1.776,0.69-3.283,1.612-4.783,3.114c-1.502,1.501-2.425,3.007-3.117,4.783c-0.669,1.718-1.125,3.68-1.255,6.554 c-0.129,2.88-0.163,3.801-0.163,11.135s0.033,8.251,0.163,11.131c0.132,2.875,0.587,4.837,1.255,6.554 c0.69,1.776,1.613,3.283,3.114,4.783c1.5,1.502,3.007,2.427,4.782,3.117c1.718,0.668,3.681,1.123,6.555,1.255 c2.88,0.131,3.8,0.163,11.133,0.163c7.334,0,8.252-0.032,11.132-0.163c2.875-0.132,4.839-0.587,6.557-1.255 c1.775-0.69,3.28-1.615,4.78-3.117c1.502-1.501,2.425-3.007,3.117-4.783c0.664-1.718,1.119-3.68,1.255-6.554 c0.129-2.88,0.163-3.798,0.163-11.132s-0.034-8.254-0.163-11.134c-0.135-2.875-0.591-4.837-1.255-6.554 c-0.692-1.776-1.615-3.283-3.117-4.783c-1.502-1.502-3.004-2.425-4.782-3.114c-1.721-0.668-3.685-1.123-6.559-1.255 C58.24,23.032,57.323,23,49.987,23L49.995,23z M47.573,27.866c0.719-0.001,1.521,0,2.422,0c7.21,0,8.064,0.026,10.911,0.155 c2.633,0.12,4.062,0.56,5.014,0.93c1.26,0.489,2.159,1.074,3.103,2.02c0.945,0.945,1.53,1.845,2.021,3.105 c0.37,0.951,0.81,2.38,0.93,5.012c0.129,2.847,0.158,3.702,0.158,10.908s-0.028,8.062-0.158,10.908 c-0.12,2.633-0.56,4.062-0.93,5.012c-0.489,1.26-1.076,2.157-2.021,3.102c-0.945,0.945-1.842,1.53-3.103,2.02 c-0.951,0.371-2.381,0.81-5.014,0.93c-2.847,0.129-3.702,0.158-10.911,0.158c-7.21,0-8.065-0.028-10.911-0.158 c-2.633-0.122-4.062-0.561-5.014-0.931c-1.26-0.489-2.16-1.075-3.105-2.02s-1.53-1.843-2.021-3.104 c-0.37-0.951-0.81-2.38-0.93-5.012c-0.129-2.847-0.155-3.702-0.155-10.913s0.026-8.062,0.155-10.908 c0.12-2.633,0.56-4.062,0.93-5.014c0.489-1.26,1.076-2.16,2.021-3.105c0.945-0.945,1.845-1.53,3.105-2.021 c0.952-0.371,2.381-0.81,5.014-0.931c2.491-0.113,3.456-0.146,8.489-0.152V27.866z M64.409,32.35c-1.789,0-3.24,1.45-3.24,3.239 c0,1.789,1.451,3.24,3.24,3.24c1.789,0,3.24-1.451,3.24-3.24s-1.451-3.24-3.24-3.24V32.35z M49.995,36.136 c-7.658,0-13.867,6.209-13.867,13.867s6.209,13.864,13.867,13.864c7.658,0,13.865-6.206,13.865-13.864S57.653,36.136,49.995,36.136 L49.995,36.136z M49.995,41.002c4.971,0,9.001,4.03,9.001,9.001c0,4.971-4.03,9.001-9.001,9.001c-4.971,0-9.001-4.03-9.001-9.001 C40.994,45.032,45.024,41.002,49.995,41.002z"></path></g>
                        </svg>
                        </div>
                       
                       

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

  const pdfBlob = await html2pdf().from(div).set(options).outputPdf('blob');

  return pdfBlob;
}

async function compartilharPDF(id,plataforma) {
  const pessoa = await getPessoaById(id)
  const pdfBlob = await gerarPDF(id);
  
  const pdfUrl = URL.createObjectURL(pdfBlob);
  let mensagem = encodeURIComponent(pdfUrl);

  mensagem = mensagem.replace(/%3A/g, ":");
  mensagem = mensagem.replace(/%2F/g, "/");

  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  if(plataforma === 'whats'){
    let timerInterval;
  Swal.fire({
  title: "Redirecionando",
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
    const linkWhatsApp = `https://api.whatsapp.com/send?text=${pessoa.nome + " " + mensagem}`;
    window.open(linkWhatsApp);
  }
});
   
  }else if (plataforma === 'insta'){

    modal.innerHTML = '' 

    modal.innerHTML =  `
      <div class = 'bg-[#252525] p-10 flex items-center flex-col rounded'>
      <svg width="125px" height="125px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.1" d="M3 9.22843V14.7716C3 15.302 3.21071 15.8107 3.58579 16.1858L7.81421 20.4142C8.18929 20.7893 8.69799 21 9.22843 21H14.7716C15.302 21 15.8107 20.7893 16.1858 20.4142L20.4142 16.1858C20.7893 15.8107 21 15.302 21 14.7716V9.22843C21 8.69799 20.7893 8.18929 20.4142 7.81421L16.1858 3.58579C15.8107 3.21071 15.302 3 14.7716 3H9.22843C8.69799 3 8.18929 3.21071 7.81421 3.58579L3.58579 7.81421C3.21071 8.18929 3 8.69799 3 9.22843Z" fill="#afb922"></path> <path d="M3 9.22843V14.7716C3 15.302 3.21071 15.8107 3.58579 16.1858L7.81421 20.4142C8.18929 20.7893 8.69799 21 9.22843 21H14.7716C15.302 21 15.8107 20.7893 16.1858 20.4142L20.4142 16.1858C20.7893 15.8107 21 15.302 21 14.7716V9.22843C21 8.69799 20.7893 8.18929 20.4142 7.81421L16.1858 3.58579C15.8107 3.21071 15.302 3 14.7716 3H9.22843C8.69799 3 8.18929 3.21071 7.81421 3.58579L3.58579 7.81421C3.21071 8.18929 3 8.69799 3 9.22843Z" stroke="#afb922" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 8V13" stroke="#afb922" stroke-width="2" stroke-linecap="round"></path> <path d="M12 16V15.9888" stroke="#afb922" stroke-width="2" stroke-linecap="round"></path> </g></svg>
        <h1 class='text-lg font-bold mb-5'>Para compartihar no Instagram siga esses passos!!!!</h1>

        <ol>
          <li class='mb-2'>1 - Copiar esse link -
            <span class='underline'>${mensagem}</span>
          </li>
          <li>2 - Pronto agora e só acessar o <a class='underline font-bold' href='https://www.instagram.com/' target='_blank'>Instagram</a></li>
          </ol>
      
      </div>
  
    `
modal.style.display = 'block'
    
    

    }
 
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
