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
function start() {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: '113301151213-ikv65divt4p5v64laeidjmlsnfkmat5d.apps.googleusercontent.com',
            // Scopes to request in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
    });
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var nome = profile.getName()
    var img = profile.getImageUrl()
    /* logImg = document.createElement('img')
    logImg.classList.add("nav-link", "dropdown-toggle") */
    var logImg = document.getElementById('loginImg')
    console.log(logImg)
    document.getElementById('paragrafo').innerText = "Nome: "+nome+" Link da imagem de perfil: " + img
    logImg.src = img
    document.getElementById('dropHead').beforeend = nome
    /* document.getElementById('loginBtn').removeAttribute("data-onsuccess")
    document.getElementById('loginBtn').removeAttribute("data-gapiscan")
    document.getElementById('loginBtn').removeAttribute("data-onload")
    document.getElementById('loginBtn').setAttribute("onclick", "signOut()") */
    console.log(document.getElementById('loginBtn'))

}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}