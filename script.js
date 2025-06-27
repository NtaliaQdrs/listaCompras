const inputNome = document.getElementById("itemInput");
const inputPreco = document.getElementById("precoInput");
const inputQtd = document.getElementById("quantidadeInput");
const inputUnidade = document.getElementById("unidadeInput");
const botaoAdicionar = document.getElementById("btnAdicionar");
const listaUl = document.getElementById("lista");
const totalDiv = document.getElementById("total");

let itens = JSON.parse(localStorage.getItem("itens")) || [];

function salvarLocalStorage() {
  localStorage.setItem("itens", JSON.stringify(itens));
}

function calcularTotal() {
  const total = itens.reduce((soma, item) => soma + (item.preco * item.qtd), 0);
  totalDiv.textContent = `💰 Total: R$ ${total.toFixed(2)}`;
}

function renderizarLista() {
  listaUl.innerHTML = "";

  itens.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.comprado) li.classList.add("comprado");

    const subtotal = item.preco * item.qtd;
    const quantidadeFormatada = `${item.qtd} ${item.unidade}`;

    const divItem = document.createElement("div");
    divItem.className = "item-conteudo";


    const texto = document.createElement("div");
    texto.innerHTML = `
      <strong>${item.nome}</strong><br>
      Preço: R$ ${item.preco.toFixed(2)}<br>
      Quantidade: ${quantidadeFormatada}<br>
      Subtotal: R$ ${subtotal.toFixed(2)}
    `;

    const btnMarcar = document.createElement("button");
    btnMarcar.textContent = item.comprado ? "❌ Desmarcar" : "✅ Marcar como comprado";
    btnMarcar.className = "comprar-btn";
    btnMarcar.addEventListener("click", (e) => {
      e.stopPropagation();
      itens[index].comprado = !itens[index].comprado;
      salvarLocalStorage();
      renderizarLista();
    });

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "🗑️ Remover";
    btnRemover.className = "remove-btn";
    btnRemover.addEventListener("click", (e) => {
      e.stopPropagation();
      itens.splice(index, 1);
      salvarLocalStorage();
      renderizarLista();
    });

   
    divItem.appendChild(texto);
    li.appendChild(divItem);
    li.appendChild(btnMarcar);
    li.appendChild(btnRemover);

    listaUl.appendChild(li);
  });

  calcularTotal();
}

botaoAdicionar.addEventListener("click", () => {
  const nome = inputNome.value.trim();
  const preco = parseFloat(inputPreco.value);
  const qtd = parseFloat(inputQtd.value);
  const unidade = inputUnidade.value;

  if (nome === "" || isNaN(preco) || preco < 0 || isNaN(qtd) || qtd <= 0) {
    alert("Preencha nome, preço e quantidade válidos.");
    return;
  }

  itens.push({ nome, preco, qtd, unidade, comprado: false });
  salvarLocalStorage();
  renderizarLista();

  inputNome.value = "";
  inputPreco.value = "";
  inputQtd.value = "";
});

renderizarLista();
