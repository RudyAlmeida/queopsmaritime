// declaração de uma classe.
class Servico {
  //definição dos atributos da classe
  constructor() {
    this.id = 11
    this.categoria = ''
    this.nomeRazaoSocial = ''
    this.cpfCnpj = ''
    this.email = ''
    this.telefone = ''
    this.arrayServico = [{
      id: 1,
      categoria: 'Consultoria Logística',
      nomeRazaoSocial: 'FedEx Brasil',
      cpfCnpj: '10.970.887/0001-02',
      email: 'transportes@fedex.com',
      telefone: '+55 27 3243-9700'
    },
    {
      id: 2,
      categoria: 'Consultoria Logística',
      nomeRazaoSocial: 'Transpotes Translovato LTDA',
      cpfCnpj: '89.823.918/0006-59',
      email: 'transpcargas@translovato.com.br',
      telefone: '+55 54 3026-2789'
    },
    {
      id: 3,
      categoria: 'Carga Fracionada',
      nomeRazaoSocial: 'Braspress Transportes Urgentes LTDA',
      cpfCnpj: '48.740.351/0001-65',
      email: 'fretes@braspress.com',
      telefone: '+55 11 3429-3333'
    },
    {
      id: 4,
      categoria: 'Carga Fracionada',
      nomeRazaoSocial: 'DHL Global Forwarding (Brazil) Logistics LTDA',
      cpfCnpj: '10.228.777/0002-42',
      email: 'brdgf.fiscaldhl.com@dhl.com',
      telefone: '+55 11 5042-5500'
    },
    {
      id: 5,
      categoria: 'Assessoria Aduaneira',
      nomeRazaoSocial: 'MegaComex Despachante Aduaneiro LTDA',
      cpfCnpj: '20.703.356/0001-07',
      email: 'rodrigo@megacomex.com.br',
      telefone: '+55 47 3045-4006'
    },
    {
      id: 6,
      categoria: 'Assessoria Aduaneira',
      nomeRazaoSocial: 'Brangex Comercial Importadora e Exportadora LTDA',
      cpfCnpj: '05.584.622/0001-28',
      email: 'atendimento@brangex.com.br',
      telefone: '+55 11 3227-8500'
    },
    {
      id: 7,
      categoria: 'Contêineres',
      nomeRazaoSocial: 'Hapag-Lloyd Container Linie Gmbh',
      cpfCnpj: '07.926.591/0001-71',
      email: 'info.de@hlcl.com',
      telefone: '+55 27 2124-9250'
    },
    {
      id: 8,
      categoria: 'Contêineres',
      nomeRazaoSocial: 'Delta Locações de Equipamentos e Containers Eireli',
      cpfCnpj: '01.420.277/0001-36',
      email: 'comercialsp@deltacontainers.com.br',
      telefone: '+55 41 3302-0700'
    },
    {
      id: 9,
      categoria: 'Seguro e Armazenagem',
      nomeRazaoSocial: 'Segura Logistics',
      cpfCnpj: '03.147.206/0001-37',
      email: 'segura@seguralogistica.com.br',
      telefone: '+55 11 4199-2399'
    },
    {
      id: 10,
      categoria: 'Seguro e Armazenagem',
      nomeRazaoSocial: 'Zattar Seguros',
      cpfCnpj: '19.503.817/0001-00',
      email: 'contato@zattarseguros.com.br',
      telefone: '+55 47 99967-1695'
    },
    ]
    //propriedade para testar qual método deve ser executado pelo botão btn1
    this.testeBtn = 0
  }

  // Quando o usuario apertar para salvar as informações ele chama o método salvar  e também já chama o método de leitura dos dados (lerdados)
  // Criação de variável que também será um objeto
  salvar() {
    //alert("vamos salvar");
    let servico = this.lerDados()

    //Chamamos o método para validar para verficar se os campos (inputs) estão vazios. Então vamos enviar os produtos para verificar se os dados lidos estão vazios. Essa validação será feita através de uma condicional.
    if (this.validarCampos(servico)) {
      //alert("Podemos salvar");
      if (this.testeBtn == 0) {
        this.adicionar(servico)
      } else {
        this.atualizar(this.testeBtn)
      }
      this.listaDados()
      this.cancelar()
      // this.atualizaDisplay()
    }
  }

  //Método para alimentar a tabela com os serviços
  listaDados() {
    // Declaração de uma variável para referenciar o tbody da tabela
    let tbody = document.getElementById('tbody')

    // Para limpar a tabela antes de ser mostrada
    tbody.innerText = ''

    //Ciclos para percorrer o array
    for (let i = 0; i < this.arrayServico.length; i++) {
      // Para inserir uma nova linha no tbody
      let novaLinha = tbody.insertRow()

      // Para criar cada coluna(célula) da linha
      let td_categoria = novaLinha.insertCell()
      let td_nomeRazaoSocial = novaLinha.insertCell()
      let td_cpfCnpj = novaLinha.insertCell()
      let td_email = novaLinha.insertCell()
      let td_telefone = novaLinha.insertCell()
      // let td_servico = novaLinha.insertCell()
      let td_acoes = novaLinha.insertCell()

      //Para alimentar as células
      td_categoria.innerText = this.arrayServico[i].categoria
      td_nomeRazaoSocial.innerText = this.arrayServico[i].nomeRazaoSocial
      td_cpfCnpj.innerText = this.arrayServico[i].cpfCnpj
      td_email.innerText = this.arrayServico[i].email
      td_telefone.innerText = this.arrayServico[i].telefone

      //Para adiconar uma classe (.center) as colunas
      // td_servico.classList.add('center')
      td_acoes.classList.add('center')

      //***********************************Colocando ícones através de imagens********************************/
      // Criando um elemento de imagem para ser colocado na sexta coluna da linha
      // let imgEdit = document.createElement('img')
      // Atribuindo a esse elemento o caminho
      // imgEdit.src = 'img/edit.png'
      // td_acoes.appendChild(imgEdit)

      // criando um elemento de imagem
      // let imgDelete = document.createElement('img')
      // atribuindo a esse elemento o caminho
      // imgDelete.src = 'img/delete.png'
      //adicionando um filho para a quinta coluna
      // td_acoes.appendChild(imgDelete)

      //********************************Colocondo ícones através do Bootstrap*********************************/

      td_acoes.classList.add('d-inline-flex', 'w-100', 'justify-content-around')
      //Criamos uma div para um código svg (imagem do botão para editar) 
      let imgEdit = document.createElement('div')
      //Criamos uma string para carregar o código svg
      let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg>`
      //Adicionamos o svg dentro da div
      imgEdit.innerHTML = svg
      //Adicionando um filho para a sexta coluna
      td_acoes.appendChild(imgEdit)

      let imgDelete = document.createElement('div')
      let svg2 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
       <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
       <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
     </svg>`
      imgDelete.innerHTML = svg2
      td_acoes.appendChild(imgDelete)

      //atribuir um método para imgDelete através do setAttribute como os parâmetros: ("evento", método). O evento será quando o usuário clicar (onclik) e no outro parâmetro será nossa função deletar
      imgDelete.setAttribute(
        'onclick',
        'servico.deletar(' + this.arrayServico[i].id + ')'
      )

      //atribuir um método para mostrar os dados do produto selecionado para posterior edição (evento, método)
      imgEdit.setAttribute(
        'onclick',
        'servico.mostrarDados(' + JSON.stringify(this.arrayServico[i]) + ')'
      )
    }
  }
  // O push vai adicionar o nossos campos dentro do array e realizando o incremento no ID
  adicionar(servico) {
    this.arrayServico.push(servico)
    this.id++
  }
  //método para limpar os inputs
  cancelar() {
    document.getElementById('categoriaServico').value = ''
    document.getElementById('nomeRazaoSocialServico').value = ''
    document.getElementById('cpfCnpjServico').value = ''
    document.getElementById('emailServico').value = ''
    document.getElementById('telefoneServico').value = ''

    // voltar a escrita do botão para Salvar
    document.getElementById('btn1').innerText = 'Salvar'
    this.testeBtn = 0
    //alert("vamos cancelar");
  }
  //capturar o que foi digitado pelo usuário nos inputs (de acordo com id de cada input). Teremos que colocar o value para pegar a informação do valor dos campos.
  lerDados() {
    let servico = {}

    servico.categoria = document.getElementById('categoriaServico').value
    servico.nomeRazaoSocial = document.getElementById('nomeRazaoSocialServico').value
    servico.cpfCnpj = document.getElementById('cpfCnpjServico').value
    servico.email = document.getElementById('emailServico').value
    servico.telefone = document.getElementById('telefoneServico').value
    servico.id = this.id

    return servico
  }

  //validação dos conteúdos dos inputs (impedindo input vazio)
  validarCampos(servico) {
    let msg = ''
    if (servico.categoria == '') {
      msg += '- informe a categoria do serviço \n'
    }
    if (servico.nomeRazaoSocial == '') {
      msg += '- informe o nome ou razão social \n'
    }
    if (servico.cpfCnpj == '') {
      msg += '- informe o CPF ou CNPJ \n'
    }
    if (servico.email == '') {
      msg += '- informe o e-mail \n'
    }
    if (servico.telefone == '') {
      msg += '- informe o telefone \n'
    }
    if (msg != '') {
      alert(msg)
      return false
    }
    return true
  }
  // Vamos fazer um for que vai iniciar com zero e vamos verificar até onde seja menor que os itens da array e realiza um incremento para percorrer o array. E através de uma condicional vamos verificar o item na qual se quer deletar e também iremos utilizar o splice
  deletar(idProcurado) {
    //alert("Vamos deletar o servico de id: " + idProcurado);
    if (confirm('Deseja realmente deletar o serviço de id ' + idProcurado)) {
      for (let i = 0; i < this.arrayServico.length; i++) {
        if (this.arrayServico[i].id == idProcurado) {
          this.arrayServico.splice(i, 1)
          tbody.deleteRow(i)
        }
      }
      // this.arrayServico.splice(idProcurado,1);
      // this.listaDados();
    }
  }

  mostrarDados(dados) {
    //alert(dados.id);

    //mostrar as propriedades dos serviços nos inputs
    document.getElementById('categoriaServico').value = dados.categoria
    document.getElementById('nomeRazaoSocialServico').value = dados.nomeRazaoSocial
    document.getElementById('cpfCnpjServico').value = dados.cpfCnpj
    document.getElementById('emailServico').value = dados.email
    document.getElementById('telefoneServico').value = dados.telefone
    //modificar o texto do botão "Salvar"
    document.getElementById('btn1').innerText = 'Atualizar'

    //atribuindo a propriedade testeBtn para o id do serviço selecionado
    this.testeBtn = dados.id
  }

  atualizar(id) {
    //alert("Agora vamos atualizar");
    //procurando pelo serviço a ser atualizado
    for (let i = 0; i < this.arrayServico.length; i++) {
      if (id == this.arrayServico[i].id) {
        //atualizando a categoria do serviço prestado
        this.arrayServico[i].categoria =
          document.getElementById('categoriaServico').value
        //atualizando o nome/razão social da empresa/parceiro
        this.arrayServico[i].nomeRazaoSocial =
          document.getElementById('nomeRazaoSocialServico').value
        //atualizando o CPF/CNPJ da empresa/parceiro
        this.arrayServico[i].cpfCnpj =
          document.getElementById('cpfCnpjServico').value
        //atualizando o email da empresa/parceiro
        this.arrayServico[i].email =
          document.getElementById('emailServico').value
        //atualizando o telefone da empresa/parceiro
        this.arrayServico[i].telefone =
          document.getElementById('telefoneServico').value
      }
    }
    //voltando a escrita do botão para "Salvar"
    document.getElementById('btn1').innerText = 'Salvar'
    //voltando a propriedade tesBtn para o modo de Adicionar
    this.testeBtn = 0
  }
}
var servico = new Servico()

//******************************************Efeito cards***************************************************/

$(document).ready(function() {
  $(".card,.table").hide();
  $(".card,.table").slideDown(5000);
});
