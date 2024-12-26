const container = document.getElementById('container');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let currentIndex = 0;
const totalScreens = 5; // Total de telas

// Função para atualizar a exibição das telas
function updateScreens() {
    container.style.transform = `translateX(-${currentIndex * 100}vw)`;
}

// Eventos de navegação entre as telas
prev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateScreens();
    }
});

next.addEventListener('click', () => {
    if (currentIndex < totalScreens - 1) {
        currentIndex++;
        updateScreens();
    }
});

// Adicionar funcionalidade para a tabela na primeira tela
const addRowButton = document.getElementById('addRow');

if (addRowButton) {
    addRowButton.addEventListener('click', () => {
        const descricao = document.getElementById('descricao').value;
        const data = document.getElementById('data').value;
        const valor = parseFloat(document.getElementById('valor').value);

        if (!descricao || !data || isNaN(valor)) {
            alert('Preencha todos os campos!');
            return;
        }

        const tabela = document.getElementById('tabelaValores').querySelector('tbody');
        const ultimaLinha = tabela.lastElementChild;
        const ultimoTotal = ultimaLinha ? parseFloat(ultimaLinha.cells[3].textContent) : 0;

        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
            <td>${descricao}</td>
            <td>${data}</td>
            <td>${valor.toFixed(2)}</td>
            <td>${(ultimoTotal + valor).toFixed(2)}</td>
        `;

        // Limpar campos de entrada
        document.getElementById('descricao').value = '';
        document.getElementById('data').value = '';
        document.getElementById('valor').value = '';
    });
}
