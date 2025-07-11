// Captura dos elementos do DOM
const inputNome = document.getElementById("itemInput");
const inputPreco = document.getElementById("precoInput");
const inputQtd = document.getElementById("quantidadeInput");
const inputUnidade = document.getElementById("unidadeInput");
const botaoAdicionar = document.getElementById("btnAdicionar");
const listaUl = document.getElementById("lista");
const totalDiv = document.getElementById("total");

// Recupera os itens do localStorage ou cria um array vazio
let itens = JSON.parse(localStorage.getItem("itens")) || [];

// Função para salvar itens no localStorage
const salvarLocalStorage = () =>
  localStorage.setItem("itens", JSON.stringify(itens));

// Calcula o total dos itens na lista e exibe na tela
const calcularTotal = () => {
  const total = itens.reduce((soma, { preco, qtd }) => soma + preco * qtd, 0);
  totalDiv.textContent = `💰 Total: R$ ${total.toFixed(2)}`;
};

// Exibe os itens na tela, com botões para marcar como comprado e remover
const renderizarLista = () => {
  listaUl.innerHTML = "";

  itens.forEach(({ nome, preco, qtd, unidade, comprado }, i) => {
    const li = document.createElement("li");

    // Se o item foi comprado, adiciona a classe que estiliza como riscado
    if (comprado) li.classList.add("comprado");

    const subtotal = preco * qtd;
    const quantidadeFormatada = `${qtd} ${unidade}`;

    // Container para o conteúdo do item
    const divItem = document.createElement("div");
    divItem.className = "item-conteudo";

    // Cria o texto do item com nome, preço, quantidade e subtotal
    const texto = document.createElement("div");
    texto.innerHTML = `
      <strong>${nome}</strong><br>
      Preço: R$ ${preco.toFixed(2)}<br>
      Quantidade: ${quantidadeFormatada}<br>
      Subtotal: R$ ${subtotal.toFixed(2)}
    `;

    // Botão para marcar/desmarcar como comprado
    const btnMarcar = document.createElement("button");
    btnMarcar.textContent = comprado ? "❌ Desmarcar" : "✅ Marcar como comprado";
    btnMarcar.className = "comprar-btn";
    btnMarcar.addEventListener("click", e => {
      e.stopPropagation(); // evita que o evento "suba" para outros elementos
      itens[i].comprado = !itens[i].comprado;
      salvarLocalStorage();
      renderizarLista();
    });

    // Botão para remover o item da lista
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "🗑️ Remover";
    btnRemover.className = "remove-btn";
    btnRemover.addEventListener("click", e => {
      e.stopPropagation();
      itens.splice(i, 1);
      salvarLocalStorage();
      renderizarLista();
    });

    // Monta a estrutura do item na lista
    divItem.appendChild(texto);
    li.append(divItem, btnMarcar, btnRemover);
    listaUl.appendChild(li);
  });

  calcularTotal(); // Atualiza o total toda vez que renderiza a lista
};

// Evento para adicionar um novo item na lista ao clicar no botão
botaoAdicionar.addEventListener("click", () => {
  const nome = inputNome.value.trim();
  const preco = parseFloat(inputPreco.value);
  const qtd = parseFloat(inputQtd.value);
  const unidade = inputUnidade.value;

  // Validação básica dos dados de entrada
  if (!nome || isNaN(preco) || preco < 0 || isNaN(qtd) || qtd <= 0) {
    alert("Preencha nome, preço e quantidade válidos.");
    return;
  }

  // Adiciona o novo item no array e salva no localStorage
  itens.push({ nome, preco, qtd, unidade, comprado: false });
  salvarLocalStorage();
  renderizarLista();

  // Limpa os campos do formulário após adicionar
  inputNome.value = "";
  inputPreco.value = "";
  inputQtd.value = "";
});

// Controle do contador de cliques

const botao = document.getElementById("botaoDeClicks");
const contadorElemento = document.getElementById("contador");
const botaoZerar = document.getElementById("botaoReset");

// Recupera o valor salvo do contador ou inicia com zero
let contador = parseInt(localStorage.getItem("cliques")) || 0;
contadorElemento.textContent = "Cliques: " + contador;

// Incrementa o contador e salva no localStorage
botao.addEventListener("click", () => {
  contador++;
  contadorElemento.textContent = "Cliques: " + contador;
  localStorage.setItem("cliques", contador);
});

// Reseta o contador para zero e atualiza o localStorage
botaoZerar.addEventListener("click", () => {
  contador = 0;
  contadorElemento.textContent = "Cliques: " + contador;
  localStorage.setItem("cliques", contador);
});

// Controle do modo escuro

const botaoModoEscuro = document.getElementById("botaoModoEscuro");

// Alterna o modo escuro e salva a preferência no localStorage
botaoModoEscuro.addEventListener("click", () => {
  const ativado = document.body.classList.toggle("modo-escuro");
  botaoModoEscuro.textContent = ativado ? "Desativar modo escuro" : "Ativar modo escuro";
  localStorage.setItem("modoEscuro", ativado);
});

// Aplica o modo escuro automaticamente se já estiver salvo como ativo
if (localStorage.getItem("modoEscuro") === "true") {
  document.body.classList.add("modo-escuro");
  botaoModoEscuro.textContent = "Desativar modo escuro";
}

// Controle do modo rosa

const botaoModoRosa = document.getElementById("botaoModoRosa");

// Alterna o modo rosa e salva a preferência no localStorage
botaoModoRosa.addEventListener("click", () => {
  const ativado = document.body.classList.toggle("modo-rosa");
  botaoModoRosa.textContent = ativado ? "Desativar modo rosa" : "Ativar modo rosa";
  localStorage.setItem("modoRosa", ativado);
});

// Aplica o modo rosa automaticamente se já estiver salvo como ativo
if (localStorage.getItem("modoRosa") === "true") {
  document.body.classList.add("modo-rosa");
  botaoModoRosa.textContent = "Desativar modo rosa";
}
// Renderiza a lista inicialmente ao carregar a página
renderizarLista();
