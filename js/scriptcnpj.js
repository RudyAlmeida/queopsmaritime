function getCNPJ(){
    let cnpj = $("#cnpj").val();
    console.log(cnpj)
    consultaCNPJ(cnpj)
    
}
function consultaCNPJ(cnpj) {
   // Limpa o CNPJ para conter somente numeros, removendo traços e pontos
   cnpj = cnpj.replace(/\D/g, '');
   $('#cotacao').text('')
        fetch(`https://www.receitaws.com.br/v1/cnpj/`+ encodeURI(cnpj))
            .then(response => {
                response.json()
                    .then(data => console.log(data))
                    console.log(response.json);
            })
            .catch(x => alert("Par de moedas não encontrado"));

  /*  async function myFetch() {
    let response = await fetch(`https://www.receitaws.com.br/v1/cnpj/`+ encodeURI(cnpj));
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
myFetch().then(function (result) {
    console.log(result) */
    /* for (i = 0; i < result.length; i++) {
        getBid.push((result[i].bid)) */
    
    /* calcBid(getBid); */
/* }).catch(e => console.log(e)); */

   // Consulta o CNPJ na ReceitaWS com 60 segundos de tempo limite
   /* return fetch('https://www.receitaws.com.br/v1/cnpj/' + encodeURI(cnpj), 60000)
       .then((json) => {
           if (json['status'] === 'ERROR') {
               return Promise.reject(json['message']);
           } else {
               console.log(Promise.resolve(json))
               return Promise.resolve(json);
           }
       }); */
}