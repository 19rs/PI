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
   
      alert(data.message);
      console.log("Cadastro realizado com sucesso!");
    })
    .catch((error) => console.log("Erro:" + error));
}




