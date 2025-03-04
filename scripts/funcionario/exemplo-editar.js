const campoNome = document.getElementById('campoNome');
const campoCPF = document.getElementById('campoCPF');
const campoCargo = document.getElementById('campoCargo');
const campoSalario = document.getElementById('campoSalario');
const mascara = {
    mask: "000.000.000-00"
};
const mask = IMask(campoCPF, mascara);

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");
const urlAPI = "https://public.franciscosensaulas.com"

async function consultarDadosFuncionarioPorId() {
    const urlParaConsultarFuncionario = `${urlAPI}/api/v1/funcionario/${idParaEditar}`
    console.log(urlParaConsultarFuncionario);

    const resposta = await fetch(urlParaConsultarFuncionario);

    if (resposta.ok == false) {
        alert("Funcionário não encontrado");
        window.location.href = "/exemplo-requisicoes.html";
        return;
    }

    const dadosFuncionario = await resposta.json();
    console.log(dadosFuncionario);

    campoNome.value = dadosFuncionario.nome;
    campoCPF.value = dadosFuncionario.cpf;
    campoCargo.value = dadosFuncionario.cargo;
    campoSalario.value = dadosFuncionario.salario;
}

async function editar(evento) {
    evento.preventDefault();

    let cpf = campoCPF.value;
    let nome = campoNome.value;
    let cargo = campoCargo.value;
    let salario = campoSalario.value;

    const dados = {
        nome: nome,
        cpf: cpf,
        cargo: cargo,
        salario: salario
    }
    let url = `${urlAPI}/api/v1/funcionario/${idParaEditar}`;
    const resposta = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok == false) {
        alert("Não foi possível alterar")
    } else {
        location.href = '/funcionario/index.html';
    }
}

const botaoEditar = document.getElementById("botao-alterar");
botaoEditar.addEventListener("click", editar);

consultarDadosFuncionarioPorId();