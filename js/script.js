var getBid = new Array()
function consultaCotação() {

    async function myFetch() {
        let response = await fetch(`https://economia.awesomeapi.com.br/json/daily/USD-BRL/360`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
    myFetch().then(function (result) {
        for (i = 0; i < result.length; i++) {
            getBid.push((result[i].bid))

        }
        calcBid(getBid);
    }).catch(e => console.log(e));
};
function calcBid(bidList) {
    let bidTotal = 0
    bidList.forEach(element => {
        bidTotal += Number(element)
    });
    let menorBid = bidList.sort((a, b) => a - b)[0]
    $('#menor').text('Menor cotação: ' + menorBid)
    let maiorBid = bidList.sort((a, b) => a - b).at(-1)
    $('#maior').text('Menor cotação: ' + maiorBid)
    let variacaoBid = (((maiorBid - menorBid) / menorBid) * 100).toFixed(2)
    $('#variacao').text('Menor cotação: ' + variacaoBid)
    let bidMedio = (bidTotal / bidList.length).toFixed(2)
    $('#media').text('Menor cotação: ' + bidMedio)
    consultaTempoReal()
}
function consultaTempoReal() {
    $('#cotacao').text('Dentro')
    fetch(`https://economia.awesomeapi.com.br/last/USD-BRL`)
        .then(response => {
            response.json()
                .then(data => $('#cotacao').text('Tempo real: ' + data['USDBRL']['bid']+' atualiza a cada 10 segundos'))
        })
        .catch(x => alert("Par de moedas não encontrado"));
    setTimeout(consultaTempoReal, 10000)
}