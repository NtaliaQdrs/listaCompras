const inputNome = document.getElementById("itemInput");
const inputPreco = document.getElementById("precoInput");
const inputQtd = document.getElementById("quantidadeInput");
const inputUnidade = document.getElementById("unidadeInput");
const botaoAdicionar = document.getElementById("btnAdicionar");
const listaUl = document.getElementById("lista");
const totalDiv = document.getElementById("total");


//local storage
//carrega os itens salvos no local storage (se houver), ou começa vazio
let itens = JSON.parse(localStorage.getItem("itens")) || [];

//função que salva os dados no local storage
function salvarLocalStorage() {
  localStorage.setItem("itens", JSON.stringify(itens));
}

//função que calcula o total do valor da lista
function calcularTotal() {
  const total = itens.reduce((soma, item) => soma + (item.preco * item.qtd), 0);
  totalDiv.textContent = `💰 Total: R$ ${total.toFixed(2)}`;
}

//função que exibe os itens na tela
function renderizarLista() {
  listaUl.innerHTML = "";

  itens.forEach((item, index) => {
    const li = document.createElement("li");

    //se o item ja foi comprado, aplica a classe de estilização (riscado)
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

    //botão de 'marcar como comprado'
    const btnMarcar = document.createElement("button");
    btnMarcar.textContent = item.comprado ? "❌ Desmarcar" : "✅ Marcar como comprado";
    btnMarcar.className = "comprar-btn";

    //1° event listener no botao 'marcar como comprado'
    //alterna o estado de 'comprado', salva no localStorage e re-renderiza a lista
    btnMarcar.addEventListener("click", (e) => {
      e.stopPropagation(); 
      itens[index].comprado = !itens[index].comprado;
      salvarLocalStorage();
      renderizarLista();
    });

    //botao de remover o item
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "🗑️ Remover";
    btnRemover.className = "remove-btn";

    //2° event listener no botao de remover
    //remove o item da lista 
    btnRemover.addEventListener("click", (e) => {
      e.stopPropagation(); //evita bugs com outros eventos
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


//3° event listener no botao de 'adicionar'
// detectar quando o usuário clica no botão de adicionar, e fazer: Validação; inserção no array; atualização do localStorage; re-renderização da lista
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
  salvarLocalStorage(); //salva no local storage
  renderizarLista();

  inputNome.value = "";
  inputPreco.value = "";
  inputQtd.value = "";
});

renderizarLista();
