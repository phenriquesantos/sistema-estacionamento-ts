interface Veiculo {
  placa: string,
  nome: string,
  entrada: Date
}

(function () {
  const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query)

  function patio() {
    function ler(): Veiculo[] {
      return localStorage.patio ?
        JSON.parse(localStorage.patio) : []
    }

    function adicionar(veiculo: Veiculo) {
      const veiculos = ler();
      if (veiculos.find((veiVerifciar) => veiculo.placa == veiVerifciar.placa)) {
        alert('Já exise um veiculo com essa placa cadastrada')
        return
      }

      salvar([...ler(), veiculo])
      render();
    }

    function remover(placa: string) {
      const veiculos = ler()
      salvar(veiculos.filter(veiculo => veiculo.placa != placa))
      render()
    }

    function render() {
      $('#patio')!.innerHTML = ''
      const veiculos = ler()
      veiculos.map(veiculo => {
        const row = document.createElement('tr')
        row.classList.add('veiculo')
        const dataHoraEntrada = new Date(veiculo.entrada)
          .toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            hour: "numeric",
            minute: "numeric"
          })

        row.innerHTML = `
          <td>${veiculo.nome}</td>
          <td>${veiculo.placa}</td>
          <td>${dataHoraEntrada}
          </td>
          <td>
            <button class="btn btn-danger" data-placa ="${veiculo.placa}")">Deletar</button>
          </td>
        `

        row.querySelector('.btn')?.addEventListener("click", function () {
          remover(this.dataset.placa)
        })

        $('#patio')?.appendChild(row)
      })
    }

    function salvar(veiculos: Veiculo[]) {
      localStorage.patio = JSON.stringify(veiculos)
    }

    return { ler, adicionar, remover, salvar, render }
  }

  $('#cadastrar')?.addEventListener('click', () => {
    const nome = $('#nome')?.value;
    const placa = $('#placa')?.value;

    if (!nome || !placa) {
      alert('Os campos nome e placa são obrigatórios')
      return
    }

    patio().adicionar({ nome, placa, entrada: new Date() })
  });

  patio().render();
})();