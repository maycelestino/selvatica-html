document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const dataList = document.getElementById('dataList');
    const noDataMessage = document.getElementById('noDataMessage');

    if (params.toString()) {
        const displayNome = document.getElementById('displayNome');
        const displayEmail = document.getElementById('displayEmail');
        const displayTelefone = document.getElementById('displayTelefone');
        const displayAssunto = document.getElementById('displayAssunto');
        const displayMensagem = document.getElementById('displayMensagem');
        const displayAceiteTermos = document.getElementById('displayAceiteTermos');

        if (displayNome) displayNome.textContent = params.get('nome') || 'Não informado';
        if (displayEmail) displayEmail.textContent = params.get('email') || 'Não informado';
        if (displayTelefone) displayTelefone.textContent = params.get('telefone') || 'Não informado';
        if (displayAssunto) displayAssunto.textContent = params.get('assunto') || 'Não informado';
        if (displayMensagem) displayMensagem.textContent = params.get('mensagem') || 'Não informado';
        if (displayAceiteTermos) displayAceiteTermos.textContent = params.get('aceiteTermos') ? 'Sim' : 'Não';

        dataList.style.display = 'block';
        noDataMessage.style.display = 'none';
    } else {
        dataList.style.display = 'none';
        noDataMessage.style.display = 'block';
    }
});