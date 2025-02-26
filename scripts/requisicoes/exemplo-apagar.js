// pegar a lista de elementos que contém a class="botao-apagar"
let botoesApagar = document.getElementsByClassName("botao-apagar");
// foreach percorre cada um dos elementos da lista
Array.from(botoesApagar).forEach((botao) => {
    // cada um dos botões atribuiremos o evento de click que executará a função apagar
    botao.addEventListener('click', apagar);
});
// Função responsável por questionar o usuário se o mesmo deseja realmente apagar aquele registro
function apagar() {
    Swal.fire({
        title: "Deseja apagar o cadastro da empresa 'Weg'?",
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
            Swal.fire({
                title: "Apagado!",
                text: "Empresa removida com sucesso!",
                icon: "success"
            });
        }
    });
}