var getBid = new Array()
function consultaCotação() {

    $('#cotacao').text('')
    fetch(`https://economia.awesomeapi.com.br/json/daily/USD-BRL/360`)
        .then(response => {
            response.json()
                .then(data => data.forEach(element =>{
                    getBid.push(element.bid)
                }))
        })
        .catch(x => alert("Par de moedas não encontrado"));
        console.log(getBid.length)
        console.log(getBid)
       

};

