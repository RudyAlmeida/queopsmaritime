// declaração de uma classe.
class Servico {
    //definição dos atributos da classe
    constructor() {
      this.id = 1
      this.servico = ''
      this.nomeRazaoSocial = ''
      this.cpfCnpj = ''
      this.email = ''
      this.telefone = ''
      this.arrayServico = []
  
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
        this.atualizaDisplay()
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
        let td_servico = novaLinha.insertCell()
        let td_nomeRazaoSocial = novaLinha.insertCell()
        let td_cpfCnpj = novaLinha.insertCell()
        let td_email = novaLinha.insertCell()
        let td_telefone = novaLinha.insertCell()

        //Para alimentar as células
        td_servico.innerText = this.arrayServico[i].servico
        td_nomeRazaoSocial.innerText = this.arrayServico[i].nomeRazaoSocial
        td_cpfCnpj.innerText = this.arrayServico[i].cpfCnpj
        td_email.innerText = this.arrayServico[i].email
        td_telefone.innerText = this.arrayServico[i].telefone
  
        //Para adiconar uma classe (.center) as colunas
        td_servico.classList.add('center')
        td_acoes.classList.add('center')
  
        // Criando um elemento de imagem para ser colocado na sexta coluna da linha
        let imgEdit = document.createElement('img')

//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
//   <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
//   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
// </svg>


        // Atribuindo a esse elemento o caminho
        imgEdit.src = 'img/edit.png'
        //Adicionando um filho para a sexta coluna
        td_acoes.appendChild(imgEdit)
  
        // criando um elemento de imagem
        let imgDelete = document.createElement('img')
        // atribuindo a esse elemento o caminho
        imgDelete.src = 'img/delete.png'
        //adicionando um filho para a quinta coluna
        td_acoes.appendChild(imgDelete)
  
        //atribuir um método para imgDelete através do setAttribute como os parâmetros: ("evento", método). O evento será quando o usuário clicar (onclik) e no outro parâmetro será nossa função deletar
        imgDelete.setAttribute(
          'onclick',
          'produto.deletar(' + this.arrayProdutos[i].id + ')'
        )
  
        //atribuir um método para mostrar os dados do produto selecionado para posterior edição (evento, método)
        imgEdit.setAttribute(
          'onclick',
          'produto.mostrarDados(' + JSON.stringify(this.arrayProdutos[i]) + ')'
        )
      }
    }
    // O push vai adicionar o nossos campos dentro do array e realizando o incremento no ID
    adicionar(produto) {
      this.arrayProdutos.push(produto)
      this.id++
    }
    //método para limpar os inputs
    cancelar() {
      document.getElementById('nomeProduto').value = ''
      document.getElementById('tipoServico').value = ''
  
      document.getElementById('valorProduto').value = ''
      // voltar a escrita do botão para Salvar
      document.getElementById('btn1').innerText = 'Salvar'
      this.testeBtn = 0
      //alert("vamos cancelar");
    }
    //capturar o que foi digitado pelo usuário nos inputs. Teremos que colocar o value para pegar a informação do valor dos campos.
    lerDados() {
      let produto = {}
  
      produto.nome = document.getElementById('nomeProduto').value
      produto.servico = document.getElementById('tipoServico').value
  
      produto.valor = document.getElementById('valorProduto').value
      produto.id = this.id
  
      return produto
    }
  
    //validação dos conteúdos dos inputs (impedindo input vazio)
    validarCampos(produto) {
      let msg = ''
      if (produto.nome == '') {
        msg += '- informe o nome da categoria \n'
      }
      if (produto.servico == '') {
        msg += '- informe o tipo de serviço \n'
      }
      if (produto.valor == '') {
        msg += '- informe o valor do serviço \n'
      }
      if (msg != '') {
        alert(msg)
        return false
      }
      return true
    }
    // Vamos fazer um for que vai iniciar com zero e vamos verificar até onde seja menor que os itens da array e realiza um incremento para percorrer o array. E através de uma condicional vamos verificar o item na qual se quer deletar e também iremos utilizar o splice
    deletar(idProcurado) {
      //alert("Vamos deletar o produto de id: " + idProcurado);
      if (confirm('Deseja realmente deletar o produto de id ' + idProcurado)) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
          if (this.arrayProdutos[i].id == idProcurado) {
            this.arrayProdutos.splice(i, 1)
            tbody.deleteRow(i)
          }
        }
        // this.arrayProdutos.splice(idProcurado,1);
        // this.listaDados();
      }
    }
  
    mostrarDados(dados) {
      //alert(dados.id);
  
      //mostrar as propriedades dos produtos nos inputs
      document.getElementById('nomeProduto').value = dados.nome
      document.getElementById('tipoServico').value = dados.servico
  
      document.getElementById('valorProduto').value = dados.valor
  
      //modificar o texto do botão "Salvar"
      document.getElementById('btn1').innerText = 'Atualizar'
  
      //atribuindo a propriedade testeBtn para o id do produto selecionado
      this.testeBtn = dados.id
    }
  
    atualizar(id) {
      //alert("Agora vamos atualizar");
      //procurando pelo produto a ser atualizado
      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (id == this.arrayProdutos[i].id) {
          //atualizando o nome do produto
          this.arrayProdutos[i].nome =
            document.getElementById('nomeProduto').value
          //atualizando o tipo de serviço
          //atualizando o nome do produto
          this.arrayProdutos[i].nome =
            document.getElementById('tipoServico').value
          //atualizando o valor do produto
          this.arrayProdutos[i].valor =
            document.getElementById('valorProduto').value
        }
      }
      //voltando a escrita do botão para "Salvar"
      document.getElementById('btn1').innerText = 'Salvar'
      //voltando a propriedade tesBtn para o modo de Adicionar
      this.testeBtn = 0
    }
  }
  var produto = new Produto()
  
  // lista das imagens a serem exibidas
  function clicar() {}