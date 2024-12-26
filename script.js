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
            <td><button class="delete-btn">-</button></td> <!-- Botão de excluir -->
        `;

        // Adicionar evento de excluir para o botão de cada linha
        novaLinha.querySelector('.delete-btn').addEventListener('click', () => {
            tabela.deleteRow(novaLinha.rowIndex - 1); // Remove a linha
            atualizarTotal(); // Atualiza os totais da tabela
        });

        // Limpar campos de entrada
        document.getElementById('descricao').value = '';
        document.getElementById('data').value = '';
        document.getElementById('valor').value = '';

        // Ordenar as linhas por data
        ordenarPorData();
    });
}

// Função para atualizar o total da coluna "Total"
function atualizarTotal() {
    const tabela = document.getElementById('tabelaValores').querySelector('tbody');
    let total = 0;

    Array.from(tabela.rows).forEach((linha, index) => {
        const valor = parseFloat(linha.cells[2].textContent);
        total += valor;

        linha.cells[3].textContent = total.toFixed(2); // Atualiza o total da linha
    });
}

// Função para ordenar as linhas da tabela por data
function ordenarPorData() {
    const tabela = document.getElementById('tabelaValores').querySelector('tbody');
    const linhas = Array.from(tabela.rows);

    // Ordena as linhas pela data (coluna 2)
    linhas.sort((a, b) => {
        const dataA = new Date(a.cells[1].textContent);
        const dataB = new Date(b.cells[1].textContent);

        return dataA - dataB; // Ordenação crescente
    });

    // Reinsere as linhas ordenadas na tabela
    linhas.forEach(linha => tabela.appendChild(linha));

    // Atualiza os totais após a ordenação
    atualizarTotal();
}
