var bot = document.querySelector("btnSalvar");
var list = [];
var user = [];

document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById('form').addEventListener("submit", function (e) {
    e.preventDefault();
    sincronizar(e);
  });
  buscar();
});

function salvar() {
  list.push(nome.value);
  list.push(email.value);
  list.push(telefone.value);
}

function sincronizar(event) {
  const myFormData = new FormData(event.target);
  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));

  fetch("https://63055f75697408f7edc567d8.mockapi.io/Contato", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Sincronizado com sucesso!");
      location.reload();
    })
    .catch((error) => {
      alert("Não foi possível sincronizar!");
    });
}

function buscar() {
  fetch('https://63055f75697408f7edc567d8.mockapi.io/Contato')
    .then((response) => response.json())
    .then((data) => {
      user = data;
      atualizar(user);
    });
}

function atualizar(list) {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = " ";
  list.forEach(usu => {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    tdId.innerHTML = usu.id;
    let tdNome = document.createElement("td");
    tdNome.innerHTML = usu.nome;
    let tdEmail = document.createElement("td");
    tdEmail.innerHTML = usu.email;
    let tdTelefone = document.createElement("td");
    tdTelefone.innerHTML = usu.telefone;

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTelefone);
    tbody.appendChild(tr);
  });
}
