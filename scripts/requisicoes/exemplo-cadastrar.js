const campoCnpj = document.getElementById('campoCNPJ');
const mascara = {
    mask: "00.000.000/0000-00"
};
const mask = IMask(campoCnpj, mascara);


let botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener('click', salvar);


function salvar(e) {
    e.preventDefault(); // form não deve ser enviado, interrompe o envio do formulário 
    let campoNome = document.getElementById("campoNome");
    let nome = campoNome.value
    if (nome.length < 3) {
        alert("Nome deve conter no mínimo 3 caracteres");
        return; // Faz com que o código abaixo não seja executado, ou seja, encerrando a execução dessa função
    }

    if (nome.length > 20) {
        alert("Nome deve conter no máximo 20 caracteres");
        return;
    }

    let cnpj = campoCnpj.value;

    console.log("Passou por aquio: " + nome);
    console.log("CNPJ: " + cnpj);

} 