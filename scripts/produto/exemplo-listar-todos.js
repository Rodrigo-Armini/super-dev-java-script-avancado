let tabelaProdutos = document.getElementById("tabela-produtos");
let botaoConsultarProdutos = document.getElementById("consultar-produtos");

let urlAPI = "https://public.franciscosensaulas.com"

function atribuirCliqueBotoesApagar() {
    // pegar a lista de elementos que contém a class="botao-apagar"
    let botoesApagar = document.getElementsByClassName("botao-apagar");
    // foreach percorre cada um dos elementos da lista
    Array.from(botoesApagar).forEach((botao) => {
        // cada um dos botões atribuiremos o evento de click que executará a função apagar
        botao.addEventListener('click', apagar);
    });
}

// Função responsável por questionar o usuário se o mesmo deseja realmente apagar aquele registro
async function apagar(evento) {
    // evento é uma variável que fica disponível quando ocorre o clique do botão, poderia ser qualquer nome no lugar de evento
    // utilizaremos o evento para saber qual o botão que ocorreu o clique

    // obter o botão que ocorreu o click do evento
    const botaoClique = evento.target;

    // data- são atributos(variáveis) colocadas no HTML, para podermos ter acesso no javascript
    // neste cenário colocamos data-id e data-nome, para podermos apresentar para o usuário o que ele está apagando
    // o id foi colocado para sabermos qual empresa deveremos apagar

    // obter o nome do atributo (data-nome) do botão de apagar
    const nome = botaoClique.getAttribute("data-nome");
    const id = botaoClique.getAttribute("data-id");

    Swal.fire({
        title: `Deseja apagar o produto da empresa '${nome}'?`,
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim apagar!",
        cancelButtonText: "Não",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            apagarProduto(id);
        }
    });
}

async function apagarProduto(id) {
    let url = `${urlAPI}/api/v1/produto/${id}`
    console.log(url);
    
    const resposta = await fetch(url, {method: "DELETE"});
    if(resposta.ok == false){
        alert("Não foi possível apagar");
        return;
    }

    Swal.fire({
        title: "Apagado!",
        text: "Produto removido com sucesso!",
        icon: "success"
    });
    consultarProdutos();
}

// Função responsável por fazer o request(requisição) para carregar os dados da empresa
async function consultarProdutos() {
    // debugger;
    // let url = urlAPI + "/api/v1/empresa"
    let url = `${urlAPI}/api/v1/produto`
    // fetch vai realizar a requisição, na variável resposta teremos os dados do response como: status, response em si(dados que o back-end retornou)  
    const resposta = await fetch(url);
    // Verificar se a requisição falhou por algum motivo
    if (resposta.ok == false) {
        alert("Não foi possível carregar os dados")
    }

    // Obter o response da requisição, que neste cenário será uma lista de objetos
    const produtos = await resposta.json();

    let tbody = tabelaProdutos.querySelector("tbody");
    tbody.innerHTML = "";

    produtos.forEach(produto => {
        const colunas = `
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>${produto.preço}</td>
        <td>${produto.categoria}</td>
        <td>
            <a href="editar.html?id=${produto.id}" class="btn btn-warning"><i class="fas fa-pencil"></i> Editar</a>
            <button 
                class="btn btn-danger botao-apagar" 
                data-id="${produto.id}"
                data-nome="${produto.nome}"
                ><i class="fas fa-trash"></i> Apagar
            </button>
        </td>`
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;

        tbody.appendChild(linha);

        console.log(produto);    
    });

    atribuirCliqueBotoesApagar();

}

botaoConsultarProdutos.addEventListener("click", consultarProdutos);

// Carregar os registros na tabela
consultarProdutos();