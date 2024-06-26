document.onload = carregarTopicos()

function carregarTopicos() {
    fetch("http://localhost:3000/mensagens")
    .then((response) => response.json())
    .then(function(data) {
        console.log(data)
        data.forEach((mensagem) => {
            criarDivMensagem(mensagem)
            })
        })
        .catch((error) => console.error("Erro:", error))
}




function criarDivMensagem(data) {
    let perfilUsuario = sessionStorage.getItem("userProfile");
    let idUsuario = sessionStorage.getItem("userID")
    let mostrarBotoes = parseInt(perfilUsuario) === 1 || parseInt(idUsuario) === parseInt(data.autor_id);
    let [data_postagem, hora_postagem] = data.data_postagem.split(' ')
    // console.log(data_postagem.split('-').reverse().join('/'))
    
  
    let divForum = document.getElementById("forum");
    divForum.classList.add("flex", "gap-10","antialiased");
  
    divForum.innerHTML += `
      <div id='box-${data.id}' class="flex flex-col border-2 rounded-md shadow p-3 bg-zinc-50">
            
              <div class='flex'>
                <div class=' h-full'>
                <svg fill="#000000" width="113px" height="113px" viewBox="-2.4 -2.4 28.80 28.80" id="conversation" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color" stroke="#000000" stroke-width="0.72"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#3a586e" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M22,20.73l-1-3.6A6.82,6.82,0,0,0,22,13.5a7.3,7.3,0,0,0-3.62-6.14,1,1,0,0,0-1.12,0,1,1,0,0,0-.38,1A4.44,4.44,0,0,1,17,9.5c0,3-2.92,5.5-6.5,5.5a7.55,7.55,0,0,1-3-.64,1,1,0,0,0-.81,0L6,14.63a1,1,0,0,0-.53,1.27,8.44,8.44,0,0,0,8,5.1A9.6,9.6,0,0,0,17,20.36l3.66,1.56A1,1,0,0,0,21,22a1,1,0,0,0,.66-.25A1,1,0,0,0,22,20.73Z" style="fill: #3A586E;"></path><path id="primary" d="M18.82,8c-.8-3.46-4.3-6-8.32-6C5.81,2,2,5.36,2,9.5a6.82,6.82,0,0,0,1.06,3.63l-1,3.6a1,1,0,0,0,.3,1A1,1,0,0,0,3,18a1,1,0,0,0,.39-.08l3.66-1.56A9.6,9.6,0,0,0,10.5,17c4.69,0,8.5-3.36,8.5-7.5A6.27,6.27,0,0,0,18.82,8Z" style="fill: #191919;"></path></g></svg>
              </div>
           
             
      <div class="flex flex-col justify-between w-full px-5 ">
          <div  id='box-texto-${data.id}' class='w-[95%] '>
                  
                  <div class='flex justify-around items-end pt-5'>
                  <h1 class="tracking-wide font-semibold text-pretty text-lg first-letter:uppercase w-[100%]">${
            data.titulo
          }</h1>
              <div class='flex gap-2'>
                  <svg class='cursor-pointer ${mostrarBotoes ? 'block' : 'hidden'}' onclick="ClickUpdateMensagem(${
                    data.id
                  })" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.4445 19.6875H20.9445M14.4443 5.68747L5.44587 14.6859C4.78722 15.3446 4.26719 16.1441 4.10888 17.062C3.94903 17.9888 3.89583 19.139 4.44432 19.6875C4.99281 20.236 6.14299 20.1828 7.0698 20.0229C7.98772 19.8646 8.78722 19.3446 9.44587 18.6859L18.4443 9.68747M14.4443 5.68747C14.4443 5.68747 17.4443 2.68747 19.4443 4.68747C21.4443 6.68747 18.4443 9.68747 18.4443 9.68747M14.4443 5.68747L18.4443 9.68747" stroke="#000000" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  ${
                    mostrarBotoes
                      ? `<svg onclick='deletarMensagem(${data.id})' class='cursor-pointer' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  `
                      : ""
                  }
                  </div>
                  </div>
          <h2 class="tracking-wide text-pretty text-xs first-letter:uppercase w-[95%] pb-1 text-gray-700">Criada por ${
            data.nome_autor
          } em ${data_postagem.split("-").reverse().join("/") + ' às ' + hora_postagem }</h2>
          <p class="leading-7 text-justify font-normal text-pretty text-base py-1 first-letter:uppercase  w-full">${
            data.conteudo
          }</p>
                  
                      <div class="flex justify-between items-center  border-t-2  mt-2 h-12" >
                              <div class="flex items-center justify-between w-full gap-2 pt-1">
                              <div class="flex items-center gap-2">
                              <svg onclick='criarResposta(${
                                data.id
                              })' class='cursor-pointer' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5" stroke="#191919" stroke-width="1.6799999999999997" stroke-linecap="round"></path> <path d="M16.652 3.45506L17.3009 2.80624C18.3759 1.73125 20.1188 1.73125 21.1938 2.80624C22.2687 3.88124 22.2687 5.62415 21.1938 6.69914L20.5449 7.34795M16.652 3.45506C16.652 3.45506 16.7331 4.83379 17.9497 6.05032C19.1662 7.26685 20.5449 7.34795 20.5449 7.34795M16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9M20.5449 7.34795L14.5801 13.3128C14.1761 13.7168 13.9741 13.9188 13.7513 14.0926C13.4886 14.2975 13.2043 14.4732 12.9035 14.6166C12.6485 14.7381 12.3775 14.8284 11.8354 15.0091L10.1 15.5876M10.1 15.5876L8.97709 15.9619C8.71035 16.0508 8.41626 15.9814 8.21744 15.7826C8.01862 15.5837 7.9492 15.2897 8.03811 15.0229L8.41242 13.9M10.1 15.5876L8.41242 13.9" stroke="#191919" stroke-width="1.6799999999999997"></path> </g></svg>
                              
                              <svg onclick='carregarRespostas(${data.id})' class='cursor-pointer' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.8693 21.5102L11.5147 21.8922L10.8693 21.5102ZM11.1288 21.0719L10.4833 20.6899L11.1288 21.0719ZM8.87121 21.0719L9.51663 20.6899L9.51662 20.6899L8.87121 21.0719ZM9.13064 21.5102L8.48523 21.8922L9.13064 21.5102ZM2.30448 17.1308L2.99739 16.8438H2.99739L2.30448 17.1308ZM6.28931 19.585L6.31328 18.8354L6.28931 19.585ZM4.46927 19.2956L4.18225 19.9885H4.18225L4.46927 19.2956ZM17.6955 17.1308L18.3884 17.4178L18.3884 17.4178L17.6955 17.1308ZM13.7107 19.585L13.6867 18.8354L13.7107 19.585ZM15.5307 19.2956L15.8177 19.9885L15.5307 19.2956ZM16.09 6.58944L16.4819 5.94996V5.94996L16.09 6.58944ZM17.4106 7.91001L18.05 7.51814V7.51814L17.4106 7.91001ZM3.91001 6.58944L3.51813 5.94996V5.94996L3.91001 6.58944ZM2.58944 7.91001L1.94996 7.51814H1.94996L2.58944 7.91001ZM7.91637 19.8223L7.53453 20.4679H7.53453L7.91637 19.8223ZM11.5147 21.8922L11.7742 21.4539L10.4833 20.6899L10.2239 21.1282L11.5147 21.8922ZM8.22579 21.4539L8.48523 21.8922L9.77606 21.1282L9.51663 20.6899L8.22579 21.4539ZM10.2239 21.1282C10.1785 21.2049 10.0992 21.25 9.99998 21.25C9.90074 21.25 9.82147 21.2049 9.77606 21.1282L8.48523 21.8922C9.16217 23.0359 10.8378 23.0359 11.5147 21.8922L10.2239 21.1282ZM8.8 6.75H11.2V5.25H8.8V6.75ZM17.25 12.8V13.6H18.75V12.8H17.25ZM2.75 13.6V12.8H1.25V13.6H2.75ZM1.25 13.6C1.25 14.5217 1.24959 15.2504 1.2898 15.8397C1.33047 16.4357 1.41517 16.9436 1.61157 17.4178L2.99739 16.8438C2.88931 16.5828 2.82178 16.2573 2.78632 15.7376C2.75041 15.2112 2.75 14.5422 2.75 13.6H1.25ZM6.31328 18.8354C5.52102 18.81 5.09046 18.7411 4.75628 18.6027L4.18225 19.9885C4.77912 20.2357 5.43744 20.3081 6.26533 20.3346L6.31328 18.8354ZM1.61157 17.4178C2.09367 18.5817 3.01837 19.5064 4.18225 19.9885L4.75628 18.6027C3.95994 18.2728 3.32725 17.6401 2.99739 16.8438L1.61157 17.4178ZM17.25 13.6C17.25 14.5422 17.2496 15.2112 17.2137 15.7376C17.1782 16.2573 17.1107 16.5828 17.0026 16.8438L18.3884 17.4178C18.5848 16.9436 18.6695 16.4357 18.7102 15.8397C18.7504 15.2504 18.75 14.5217 18.75 13.6H17.25ZM13.7346 20.3346C14.5625 20.3081 15.2209 20.2357 15.8177 19.9885L15.2437 18.6027C14.9095 18.7411 14.479 18.81 13.6867 18.8354L13.7346 20.3346ZM17.0026 16.8438C16.6728 17.6401 16.0401 18.2728 15.2437 18.6027L15.8177 19.9885C16.9816 19.5064 17.9063 18.5817 18.3884 17.4178L17.0026 16.8438ZM11.2 6.75C12.5239 6.75 13.4641 6.75079 14.1953 6.82031C14.9154 6.88877 15.3548 7.01855 15.6981 7.22892L16.4819 5.94996C15.8633 5.57089 15.1671 5.40595 14.3373 5.32705C13.5187 5.24921 12.4949 5.25 11.2 5.25V6.75ZM18.75 12.8C18.75 11.5052 18.7508 10.4814 18.673 9.6627C18.5941 8.83288 18.4291 8.13673 18.05 7.51814L16.7711 8.30189C16.9814 8.64518 17.1112 9.08466 17.1797 9.80468C17.2492 10.5359 17.25 11.4761 17.25 12.8H18.75ZM15.6981 7.22892C16.1354 7.4969 16.5031 7.86458 16.7711 8.30189L18.05 7.51814C17.6584 6.879 17.121 6.34163 16.4819 5.94996L15.6981 7.22892ZM8.8 5.25C7.50515 5.25 6.48135 5.24921 5.66269 5.32705C4.83287 5.40595 4.13672 5.57089 3.51813 5.94996L4.30188 7.22892C4.64517 7.01855 5.08465 6.88877 5.80467 6.82031C6.53585 6.75079 7.47611 6.75 8.8 6.75V5.25ZM2.75 12.8C2.75 11.4761 2.75079 10.5359 2.82031 9.80468C2.88877 9.08466 3.01855 8.64518 3.22892 8.30189L1.94996 7.51814C1.57089 8.13673 1.40595 8.83288 1.32705 9.6627C1.24921 10.4814 1.25 11.5052 1.25 12.8H2.75ZM3.51813 5.94996C2.87899 6.34163 2.34162 6.879 1.94996 7.51814L3.22892 8.30189C3.4969 7.86458 3.86458 7.4969 4.30188 7.22892L3.51813 5.94996ZM9.51662 20.6899C9.31582 20.3506 9.13969 20.0516 8.96888 19.8164C8.78917 19.569 8.58327 19.3454 8.29822 19.1768L7.53453 20.4679C7.58064 20.4951 7.64427 20.5451 7.75524 20.6979C7.87511 20.863 8.01082 21.0907 8.2258 21.4539L9.51662 20.6899ZM6.26533 20.3346C6.71078 20.3489 6.99552 20.3587 7.21182 20.3851C7.41631 20.41 7.49305 20.4433 7.53453 20.4679L8.29822 19.1768C8.00853 19.0055 7.70371 18.9339 7.39344 18.8961C7.09498 18.8597 6.73177 18.8488 6.31328 18.8354L6.26533 20.3346ZM11.7742 21.4539C11.9891 21.0907 12.1249 20.863 12.2447 20.6979C12.3557 20.5451 12.4193 20.4951 12.4654 20.4679L11.7018 19.1768C11.4167 19.3454 11.2108 19.569 11.0311 19.8164C10.8603 20.0516 10.6841 20.3506 10.4833 20.6899L11.7742 21.4539ZM13.6867 18.8354C13.2682 18.8488 12.905 18.8597 12.6065 18.8961C12.2963 18.9339 11.9914 19.0055 11.7018 19.1768L12.4654 20.4679C12.5069 20.4433 12.5837 20.41 12.7881 20.3851C13.0044 20.3587 13.2892 20.3489 13.7346 20.3346L13.6867 18.8354Z" fill="#1C274C"></path> <path d="M21.7145 12.4351L22.4074 12.7221V12.7221L21.7145 12.4351ZM19.685 14.4646L19.972 15.1575H19.972L19.685 14.4646ZM20.2093 2.5526L19.8174 3.19208V3.19208L20.2093 2.5526ZM21.4473 3.79064L22.0868 3.39876V3.39876L21.4473 3.79064ZM8.79058 2.5526L8.3987 1.91312V1.91312L8.79058 2.5526ZM7.55255 3.79064L6.91307 3.39876H6.91307L7.55255 3.79064ZM13.3749 2.75H15.6249V1.25H13.3749V2.75ZM21.2499 8.37503V9.12503H22.7499V8.37503H21.2499ZM21.2499 9.12503C21.2499 10.0089 21.2495 10.6343 21.216 11.1258C21.1829 11.6106 21.1201 11.9101 21.0216 12.1481L22.4074 12.7221C22.5943 12.2709 22.6742 11.7891 22.7125 11.2279C22.7504 10.6735 22.7499 9.98841 22.7499 9.12503H21.2499ZM21.0216 12.1481C20.7171 12.8832 20.1331 13.4672 19.398 13.7717L19.972 15.1575C21.0747 14.7008 21.9507 13.8247 22.4074 12.7221L21.0216 12.1481ZM15.6249 2.75C16.867 2.75 17.7459 2.75079 18.4286 2.81571C19.1002 2.87956 19.5042 3.00013 19.8174 3.19208L20.6012 1.91312C20.0127 1.55247 19.352 1.39674 18.5706 1.32244C17.8004 1.24921 16.838 1.25 15.6249 1.25V2.75ZM22.7499 8.37503C22.7499 7.16201 22.7507 6.19958 22.6775 5.42935C22.6032 4.64796 22.4475 3.98729 22.0868 3.39876L20.8079 4.18251C20.9998 4.49574 21.1204 4.89973 21.1842 5.57133C21.2492 6.25408 21.2499 7.13296 21.2499 8.37503H22.7499ZM19.8174 3.19208C20.2211 3.43945 20.5605 3.77884 20.8079 4.18251L22.0868 3.39876C21.7158 2.79326 21.2067 2.28417 20.6012 1.91312L19.8174 3.19208ZM13.3749 1.25C12.1619 1.25 11.1995 1.24921 10.4293 1.32244C9.64789 1.39674 8.98723 1.55247 8.3987 1.91312L9.18245 3.19208C9.49568 3.00013 9.89967 2.87956 10.5713 2.81571C11.254 2.75079 12.1329 2.75 13.3749 2.75V1.25ZM8.3987 1.91312C7.7932 2.28417 7.28412 2.79326 6.91307 3.39876L8.19203 4.18251C8.43939 3.77884 8.77879 3.43945 9.18245 3.19208L8.3987 1.91312ZM7.78219 6.03896C7.83215 5.07858 7.95706 4.56594 8.19203 4.18251L6.91307 3.39876C6.47594 4.11209 6.33747 4.93717 6.28422 5.96104L7.78219 6.03896ZM18.0249 15.4848C18.7916 15.4593 19.4094 15.3906 19.972 15.1575L19.398 13.7717C19.096 13.8968 18.7039 13.9614 17.9751 13.9857L18.0249 15.4848Z" fill="#1C274C"></path> <path d="M6.50928 13H6.51828M10 13H10.009M13.491 13H13.5" stroke="#1C274C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                              <p class='font-normal text-xs text-gray-800'>${(data.respostas == 0 ? 'Nenhuma resposta' : data.respostas == 1 ? '1 resposta' : data.respostas + ' respostas')}</p>
  </div>
                                <div class='h-full flex items-end justify-end'>
                                          <span class="text-xs text-gray-800  italic ${data.data_postagem != data.data_atualizacao ? 'block' : 'hidden'}">Conversa atualizada em ${
                                            data.data_atualizacao
                                          }</span>  
                                          </div>
                              </div>
                                  
                                          
                      </div>
                      <div id="respostas-${data.id}" class="flex flex-col justify-between my-2 mx-2" 
          </div>
          </div>
    
      </div>
             
     </div>
      </div>
     
     
     </div>
      `;
  }
                                        

  const btn = document.querySelector("#btnCriar");

btn.addEventListener("click", function () {
  let perfilUsuario = sessionStorage.getItem("userProfile");
  let idUsuario = sessionStorage.getItem("userID")
  if(idUsuario) {
    // alert('siiiiiiiu')
  } else {
    // alert('naaaaaaah')
    criarDialogLogin()
    return
  }
  const modal = document.querySelector("#modal");
  const overlay = document.querySelector("#overlay");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  modal.innerHTML = `
        <form id="mensagemForm" class="w-[50vw] bg-white p-8 rounded-lg shadow-lg flex flex-col gap-5">
            <label
                for="titulo"
                class="relative flex rounded-md border h-10 w-full border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
                <input
                    type="text"
                    id="titulo"
                    
                    class="text-black peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                    placeholder="Título"
                />
                <span
                    class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    Título
                </span>
            </label>
            <label
                for="conteudo"
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
                <textarea
                    id="conteudo"
                    class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm text-black"
                    rows="6"
                    placeholder="Informe Sua Mensagem..."
                ></textarea>
            </label>
            
            <input type="hidden" id="data" value="${
              new Date().toISOString().split("T")[0]
            }"> 

            <div class="flex items-center justify-end gap-2 bg-white p-3">
                <button
                    type="button"
                    class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                    onclick="document.getElementById('mensagemForm').reset()"
                >
                    Limpar
                </button>
                <button
                    type="submit"
                    class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    Salvar
                </button>
            </div>
        </form>
    `;

  document
    .getElementById("mensagemForm")
    .addEventListener("submit", inserirMensagem);

  overlay.onclick = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
});

function inserirMensagem(event) {
  event.preventDefault();

  // const data = document.getElementById("data").value;
  let idUsuario = sessionStorage.getItem("userID")
  const titulo = document.getElementById("titulo").value;
  const conteudo = document.getElementById("conteudo").value;

  if (titulo.length === 0 || conteudo.length === 0) {
    Toastify({
      text: "Campos Obrigatórios !!!",
      duration: 1500,
      newWindow: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "#fff",
        color: "black",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    return;
  }

  const formdata = new FormData();
  formdata.append("autor_id", idUsuario);
  formdata.append("titulo", titulo);
  formdata.append("conteudo", conteudo);

  fetch("http://localhost:3000/mensagem", {
    method: "POST",
    body: formdata,
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error("Erro ao inserir mensagem");
      }
    })
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => console.error("Erro:", error));
}

function deletarMensagem(id) {
  console.log('id:', id)
  fetch(`http://localhost:3000/mensagem/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      alert("Mensagem deletada com sucesso!");
    })
    .catch((error) => console.log("Erro:" + error));
}


async function ClickUpdateMensagem(id) {
  const mensagem = await buscaInformacoes(id)
  const titulo = mensagem.titulo;

  const modal = document.querySelector("#modal");
  const overlay = document.querySelector("#overlay");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  modal.innerHTML = `
    <form id="mensagemForm" class="w-[50vw] bg-white p-8 rounded-lg shadow-lg flex flex-col gap-5">
    <label
        for="titulo "
        class="relative flex rounded-md border h-10 w-full border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
        <input
            type="text"
            id="titulo"
            required
            class="text-black peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
            placeholder="Editar Titulo"
            value="${titulo}"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
     
            >
            Título 
        </span>
    </label>
    
    <label
        for="conteudo"
        class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
    
        <textarea
            id="conteudo"
            class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm text-black"
            rows="6"
            placeholder="Campo Obrigatório..."
            required
        ></textarea>

    </label>

    <div class="flex items-center justify-end gap-2 bg-white p-3">
    <span class=' text-black text-xs px-2 italic font-semibold'>* Opcional</span>

        <button
            type="button"
            class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
            onclick="document.getElementById('mensagemForm').reset()"
        >
            Limpar
        </button>
        <button
            onclick=atualizarMensagem(${id})
            class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
            Salvar
        </button>

    </div>

</form>
    `;
  document.getElementById("conteudo").value = mensagem.conteudo;

  overlay.onclick = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
}

async function buscaInformacoes(id) {
  try {
    const response = await fetch(`http://localhost:3000/mensagem/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar mensagem");
    }
    const mensagem = await response.json();
    return mensagem;
  } catch (error) {
    console.error("Erro ao buscar mensagem:", error);
    return null;
  }
}

function atualizarMensagem(id) {
  // const data = new Date().toISOString().split("T")[0];
  const texto = document.getElementById("conteudo").value;
  const titulo = document.getElementById("titulo").value;

  if (texto.length === 0 || titulo.length === 0) {
    Toastify({
      text: "Campo Obrigatório !!!",
      duration: 1500,
      newWindow: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "#fff",
        color: "black",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    return;
  }

  const formdata = new FormData();
  formdata.append("id", id);
  // formdata.append("data", data);
  formdata.append("conteudo", texto);

  // if (titulo.length > 0) {
    formdata.append("titulo", titulo);
  // }

  fetch("http://localhost:3000/mensagem", {
    method: "PUT",
    body: formdata,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Erro ao atualizar resposta:", error);
    });
}


function carregarRespostas(mensagem_id) {
  fetch(`http://localhost:3000/respostas/${mensagem_id}`)
  .then((response) => response.json())
  .then(function(data) {
      console.log(data)
      let perfilUsuario = sessionStorage.getItem("userProfile");
      let idUsuario = sessionStorage.getItem("userID")
      
      let divMensagem = document.getElementById(`respostas-${mensagem_id}`)
      divMensagem.innerHTML = ''
      data.forEach((resposta) => {  
        let mostrarBotoes = parseInt(perfilUsuario) === 1 || parseInt(idUsuario) === parseInt(resposta.autor_id);
        let [data_postagem, hora_postagem] = resposta.data_postagem.split(' ')

        
        divMensagem.innerHTML += `
        <div id='resposta-${resposta.id}' class="flex flex-col border-2 rounded-md shadow p-3 mb-4 bg-white">
            
              <div class='flex'>
                <div class=' h-full'>
                <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="64px" id="Layer_1" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" width="64px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M7,5V3c0-0.515-0.435-1-1-1C5.484,2,5.258,2.344,5,2.586L0.578,7C0.227,7.359,0,7.547,0,8s0.227,0.641,0.578,1L5,13.414  C5.258,13.656,5.484,14,6,14c0.565,0,1-0.485,1-1v-2h2c1.9,0.075,4.368,0.524,5,2.227C14.203,13.773,14.625,14,15,14  c0.563,0,1-0.438,1-1C16,7.083,12.084,5,7,5z"/></svg>
              </div>
           
             
      <div class="flex flex-col justify-between w-full px-5 pb-5">
          <div  id='box-texto-${resposta.id}' class='w-[95%] '>
                  
            <div class='grid grid-cols-2 items-center h-[32px]'>
  <h2 class="tracking-wide text-pretty text-xs first-letter:uppercase w-[95%] text-gray-700">Resposta de ${
            resposta.nome_autor
          } em ${data_postagem.split("-").reverse().join("/") + ' às ' + hora_postagem }</h2>
          
              <div class='flex gap-2 justify-end'>
              <svg onclick='criarResposta(${
                                mensagem_id}, ${resposta.id 
                              })' class='cursor-pointer' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5" stroke="#191919" stroke-width="1.6799999999999997" stroke-linecap="round"></path> <path d="M16.652 3.45506L17.3009 2.80624C18.3759 1.73125 20.1188 1.73125 21.1938 2.80624C22.2687 3.88124 22.2687 5.62415 21.1938 6.69914L20.5449 7.34795M16.652 3.45506C16.652 3.45506 16.7331 4.83379 17.9497 6.05032C19.1662 7.26685 20.5449 7.34795 20.5449 7.34795M16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9M20.5449 7.34795L14.5801 13.3128C14.1761 13.7168 13.9741 13.9188 13.7513 14.0926C13.4886 14.2975 13.2043 14.4732 12.9035 14.6166C12.6485 14.7381 12.3775 14.8284 11.8354 15.0091L10.1 15.5876M10.1 15.5876L8.97709 15.9619C8.71035 16.0508 8.41626 15.9814 8.21744 15.7826C8.01862 15.5837 7.9492 15.2897 8.03811 15.0229L8.41242 13.9M10.1 15.5876L8.41242 13.9" stroke="#191919" stroke-width="1.6799999999999997"></path> </g></svg>
                  <svg class='cursor-pointer ${mostrarBotoes ? 'block' : 'hidden'}' onclick="ClickUpdateResposta(${
                    resposta.id
                  })" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.4445 19.6875H20.9445M14.4443 5.68747L5.44587 14.6859C4.78722 15.3446 4.26719 16.1441 4.10888 17.062C3.94903 17.9888 3.89583 19.139 4.44432 19.6875C4.99281 20.236 6.14299 20.1828 7.0698 20.0229C7.98772 19.8646 8.78722 19.3446 9.44587 18.6859L18.4443 9.68747M14.4443 5.68747C14.4443 5.68747 17.4443 2.68747 19.4443 4.68747C21.4443 6.68747 18.4443 9.68747 18.4443 9.68747M14.4443 5.68747L18.4443 9.68747" stroke="#000000" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  ${
                    mostrarBotoes
                      ? `<svg onclick='deletarResposta(${resposta.id})' class='cursor-pointer' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#eb1e1e" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  `
                      : ""
                  }
                  </div>
                  </div>
                  <div>
                  <div class="${resposta.resposta_id != null ? 'block' : 'hidden'}">
          <div id='resposta-${resposta.id}' class="flex flex-col border-2 rounded-md shadow p-3 my-4 bg-gray-100">
            <p class='text-sm text-gray-800 font-normal'>${resposta.citacao_autor} escreveu em ${resposta.citacao_data}:</p>
            <p class='mt-2 text-sm text-gray-900'>
            ${resposta.citacao_conteudo}
            </p>
          </div>
        </div>
          <p class="leading-7 text-justify font-normal text-pretty text-base py-1 first-letter:uppercase  w-full">${
            resposta.conteudo
          }</p>
          </div>
        </div>
        </div>
        `
          // criarDivResposta(resposta)
          })
      })
      .catch((error) => console.error("Erro:", error))
}


function deletarResposta(id) {
  console.log('id:', id)
  fetch(`http://localhost:3000/resposta/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      alert("Resposta deletada com sucesso!");
    })
    .catch((error) => console.log("Erro:" + error));
}

function criarResposta(id, id_resposta) {
  let idUsuario = sessionStorage.getItem("userID")
  if(idUsuario) {
    // alert('siiiiiiiu')
  } else {
    // alert('naaaaaaah')
    criarDialogLogin()
    return
  }

  console.log('id da msg:' + id)
  console.log('id da resposta:' + id_resposta)
  const divSelected = document.querySelector(`#box-texto-${id}`);

  // let ultimoFilho = divSelected.lastChild

  // if (ultimoFilho && ultimoFilho.nodeName === "DIV") {
  //   console.log('eh div')
  //   return
  // } 

  let input_resposta = document.getElementById('input-resposta')

  if(input_resposta) {
    input_resposta.remove()
    // return
  }

  const div = document.createElement("div");
  div.innerHTML += `
        
        <div id='input-resposta' class='resposta flex w-full mt-5'>
        <label for="OrderNotes" class="sr-only">Order notes</label>

            <div
            class="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
            <textarea
            id="OrderNotes"
            class="w-full resize-none border-none align-top focus:ring-0 outline-none sm:text-sm" 
            rows="3"
            placeholder="Informe Sua Resposta..."
            
            ></textarea>

        <div class="flex items-center justify-end gap-2 bg-white p-3">
        <svg class='cursor-pointer' onclick="fecharResposta(event)"  width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z" fill="#ea1010"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#ea1010"></path> </g></svg>
       
        <button
                type="button"
                class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                onclick="document.getElementById('OrderNotes').value = ''"
            >
                Limpar
            </button>

            <button
                type="button"
                class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                onclick='insertResposta(${id}, ${id_resposta})'
            >
                Publicar
            </button>
          
            </div>
    </div>
</div>`;

  divSelected.appendChild(div);
}

function fecharResposta(event) {
  const div = event.currentTarget.parentNode.parentNode.parentNode;
  div.remove();
  event.stopPropagation();
}

function insertResposta(id, id_resposta) {
  const formData = new FormData();
  // const data = new Date().toISOString().split("T")[0];
  const texto = document.getElementById("OrderNotes").value;
  let idUsuario = sessionStorage.getItem("userID")


  if (texto.length === 0) {
    Toastify({
      text: "Campo Obrigatório !!!",
      duration: 1500,
      newWindow: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "#fff",
        color: "black",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    return;
  }

  formData.append("mensagem_id", id);
  // formData.append("data", data);
  formData.append("autor_id", idUsuario)
  formData.append("conteudo", texto);

  if(id_resposta) {
    formData.append("resposta_id", id_resposta)
  }

  fetch("http://localhost:3000/resposta", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())

    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Erro ao criar resposta:", error);
    });
}


async function ClickUpdateResposta(id) {
  const resposta = await buscarInformacoesResposta(id)
console.log(resposta)
console.log(resposta.id)
console.log(resposta.mensagem_id)
  const modal = document.querySelector("#modal");
  const overlay = document.querySelector("#overlay");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  modal.innerHTML = `
    <form id="respostaForm" class="w-[50vw] bg-white p-8 rounded-lg shadow-lg flex flex-col gap-5">
    <label
        for="conteudo"
        class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
    
        <textarea
            id="conteudo"
            class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm text-black"
            rows="6"
            placeholder="Campo Obrigatório..."
            required
        ></textarea>

    </label>

    <div class="flex items-center justify-end gap-2 bg-white p-3">

        <button
            type="button"
            class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
            onclick="document.getElementById('respostaForm').reset()"
        >
            Limpar
        </button>
        <button
          type="button"
            onclick='atualizarResposta(${resposta.id}, ${resposta.mensagem_id})'
            class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
            Salvar
        </button>

    </div>

</form>
    `;
  document.getElementById("conteudo").value = resposta.conteudo;

  overlay.onclick = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
}

async function buscarInformacoesResposta(id) {
  console.log('buscando informacoes')
  console.log('id:' + id)
  try {
    const response = await fetch(`http://localhost:3000/resposta/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar resposta");
    }
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.error("Erro ao buscar resposta:", error);
    return null;
  }
}

function atualizarResposta(id, mensagem_id) {
  const conteudo = document.getElementById("conteudo").value;
  console.log('autalzar resoif')
  console.log('id resposta:' + id)
  console.log('id mensagem:' + mensagem_id)
// return
  if (conteudo.length === 0) {
    Toastify({
      text: "Campo Obrigatório !!!",
      duration: 1500,
      newWindow: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "#fff",
        color: "black",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    return;
  }

  const formdata = new FormData();
  formdata.append("id", id);
  formdata.append("mensagem_id", mensagem_id)
  formdata.append("conteudo", conteudo);

  fetch("http://localhost:3000/resposta", {
    method: "PUT",
    body: formdata,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Erro ao atualizar resposta:", error);
    });
}