var dadosCNPJ = [];
function getCNPJ(){
    let cnpj = $("#cnpj").val();
    console.log(cnpj)
    consultaCNPJ(cnpj)
    
}
function consultaCNPJ(cnpj) {
   // Limpa o CNPJ para conter somente numeros, removendo traços e pontos
   cnpj = cnpj.replace(/\D/g, '');

   $.ajax({
       'url': 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
       'type': "GET",
        'dataType': 'jsonp',
        'success': function(dado){
            console.log(dado)
            tratarCNPJ(dado)
        }
   })
   
}
function tratarCNPJ(dado){
    var dadosCNPJ = dado
    console.log(dadosCNPJ.situacao)
}