// Seleção de elementos do HTML
const inputNome = document.getElementById("itemInput");
const inputPreco = document.getElementById("precoInput");
const inputQtd = document.getElementById("quantidadeInput");
const inputUnidade = document.getElementById("unidadeInput");
const botaoAdicionar = document.getElementById("btnAdicionar");
const listaUl = document.getElementById("lista");
const totalDiv = document.getElementById("total");

// Recupera dados do localStorage ou começa com lista vazia
let itens = JSON.parse(localStorage.getItem("itens")) || [];

// Salva a lista no localStorage
function salvarLocalStorage() {
  localStorage.setItem("itens", JSON.stringify(itens));
}

// Calcula o total de todos os itens (preço x quantidade)
function calcularTotal() {
  const total = itens.reduce((soma, item) => soma + (item.preco * item.qtd), 0);
  totalDiv.textContent = `💰 Total: R$ ${total.toFixed(2)}`;
}

// Renderiza todos os itens na tela
function renderizarLista() {
  listaUl.innerHTML = "";

  itens.forEach((item, index) => {
    const li = document.createElement("li");

    if (item.comprado) li.classList.add("comprado");

    const subtotal = item.preco * item.qtd;
    const quantidadeFormatada = `${item.qtd} ${item.unidade}`;

    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      Preço: R$ ${item.preco.toFixed(2)} | Quantidade: ${quantidadeFormatada}<br>
      Subtotal: R$ ${subtotal.toFixed(2)}
    `;

    // Botão de remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.className = "remove-btn";

    // Remoção do item
    btnRemover.addEventListener("click", () => {
      itens.splice(index, 1);
      salvarLocalStorage();
      renderizarLista();
    });

    // Marcar/desmarcar como comprado ao clicar no item
    li.addEventListener("click", () => {
      itens[index].comprado = !itens[index].comprado;
      salvarLocalStorage();
      renderizarLista();
    });

    li.appendChild(btnRemover);
    listaUl.appendChild(li);
  });

  calcularTotal();
}

// Quando clicar em "Adicionar"
botaoAdicionar.addEventListener("click", () => {
  const nome = inputNome.value.trim();
  const preco = parseFloat(inputPreco.value);
  const qtd = parseFloat(inputQtd.value);
  const unidade = inputUnidade.value;

  // Validação
  if (nome === "" || isNaN(preco) || preco < 0 || isNaN(qtd) || qtd <= 0) {
    alert("Preencha nome, preço e quantidade válidos.");
    return;
  }

  // Adiciona à lista
  itens.push({ nome, preco, qtd, unidade, comprado: false });
  salvarLocalStorage();
  renderizarLista();

  // Limpa os campos
  inputNome.value = "";
  inputPreco.value = "";
  inputQtd.value = "";
});

// Renderiza ao abrir a página
renderizarLista();