function inserirMensagem(event) {
  event.preventDefault();

  const data = document.getElementById("data").value;
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
  formdata.append("data", data);
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

async function ClickUpdateMensagem(id) {
  const mensagem = await buscaInformacoes(id);
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
            class="text-black peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
            placeholder="Editar Titulo"
            value="${titulo}"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
     
            >
            Título *
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
            onclick=UpdateMensagem(${id})
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

function UpdateMensagem(id) {
  const data = new Date().toISOString().split("T")[0];
  const texto = document.getElementById("conteudo").value;
  const titulo = document.getElementById("titulo").value;

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

  const formdata = new FormData();
  formdata.append("id", id);
  formdata.append("data", data);
  formdata.append("conteudo", texto);

  if (titulo.length > 0) {
    formdata.append("titulo", titulo);
  }

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

function deletarMensagem(id) {
  fetch(`http://localhost:3000/mensagem/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      alert("Mensagem deletada com sucesso!");
    })
    .catch((error) => console.log("Erro:" + error));
}
