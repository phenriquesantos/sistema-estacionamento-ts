"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    const valorHora = 15;
    function calculaTempo(diffMs) {
        const msPorDia = 1000 * 60 * 60 * 24;
        const msPorHora = 1000 * 60 * 60;
        const msPorMinuto = 1000 * 60;
        const dias = Math.floor(diffMs / msPorDia);
        const horas = Math.floor(diffMs % msPorDia / msPorHora);
        const minutos = Math.floor(diffMs % msPorDia % msPorHora / msPorMinuto);
        return `${dias} Dias ${horas} Horas ${minutos} Minutos`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ?
                JSON.parse(localStorage.patio) : [];
        }
        function adicionar(veiculo) {
            const veiculos = ler();
            if (veiculos.find((veiVerifciar) => veiculo.placa == veiVerifciar.placa)) {
                alert('Já exise um veiculo com essa placa cadastrada');
                return;
            }
            salvar([...ler(), veiculo]);
            render();
        }
        function remover(placa) {
            const veiculos = ler();
            const veiculo = veiculos.find(veiculo => veiculo.placa === placa);
            const permanancia = calculaTempo(new Date().getTime() - new Date(veiculo.entrada).getTime());
            if (confirm(`O veiculo permaneceu no estacionamento por ${permanancia}. Deseja encerrar?`)) {
                salvar(veiculos.filter(veiculo => veiculo.placa !== placa));
                render();
            }
        }
        function render() {
            $('#patio').innerHTML = '';
            const veiculos = ler();
            veiculos.map(veiculo => {
                var _a, _b;
                const row = document.createElement('tr');
                row.classList.add('veiculo');
                const dataHoraEntrada = new Date(veiculo.entrada)
                    .toLocaleDateString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    hour: "numeric",
                    minute: "numeric"
                });
                row.innerHTML = `
          <td>${veiculo.nome}</td>
          <td>${veiculo.placa}</td>
          <td>${dataHoraEntrada}
          </td>
          <td>
            <button class="btn btn-danger" data-placa ="${veiculo.placa}")">Deletar</button>
          </td>
        `;
                (_a = row.querySelector('.btn')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                    remover(this.dataset.placa);
                });
                (_b = $('#patio')) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            });
        }
        function salvar(veiculos) {
            localStorage.patio = JSON.stringify(veiculos);
        }
        return { ler, adicionar, remover, salvar, render };
    }
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert('Os campos nome e placa são obrigatórios');
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date() });
    });
    patio().render();
})();
