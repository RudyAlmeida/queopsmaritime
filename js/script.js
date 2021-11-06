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
    $('#maior').text('Maior cotação: ' + maiorBid)
    let variacaoBid = (((maiorBid - menorBid) / menorBid) * 100).toFixed(2)
    $('#variacao').text('Variação no Periodo: ' + variacaoBid)
    let bidMedio = (bidTotal / bidList.length).toFixed(2)
    $('#media').text('Media no periodo: ' + bidMedio)
    
}
function consultaTempoReal() {
    $('#cotacao').text('Dentro')
    fetch(`https://economia.awesomeapi.com.br/last/USD-BRL`)
        .then(response => {
            response.json()
                .then(data => $('#cotacao').text('Tempo real: ' + data['USDBRL']['bid'] + ' atualiza a cada 10 segundos'))
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
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    let nome = profile.getName()
    let img = profile.getImageUrl()
    let logImg = document.getElementById('loginImg')
    console.log(logImg)
    document.getElementById('paragrafo').innerText = "Nome: " + nome + " Link da imagem de perfil: " + img
    logImg.src = img
    document.getElementById('dropText').innerText = nome
    document.getElementById('loginBtn').removeAttribute("data-onsuccess")
    document.getElementById('loginBtn').setAttribute("onclick", "signOut()")
    console.log(document.getElementById('loginBtn'))
    let id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    let userData = {}
    userData.nome = profile.getName();
    userData.mail = profile.getEmail()
    userData.img = profile.getImageUrl()
    userData.id = profile.getId()
    localStorage.setItem('userData', JSON.stringify(userData))
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function getUser() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData != null) {
        let logImg = document.getElementById('loginImg')
        let img = userData.img
        logImg.src = img
        let nome = userData.nome
        document.getElementById('dropText').innerText = nome
    }
}

function cabecalho(){
    let header = $('header')
    let cabecalho = `<nav class="navbar navbar-expand-sm navbar-light" style="background-color: #e3f2fd;">
    <div class="container-fluid">
        <a class="navbar-brand" href="./index.html"><img src="./imagens/horizontal_on_transparent_by_logaster.png"
                style="width: 300px; height: 150px;" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown, #navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/sobreNos.html">Sobre Nós</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/servicos.html">
                        Serviços
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/reserva.html">
                        Reserva
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/cotacao.html">
                        Cotação
                    </a>
                </li>
                <li class="nav-item">
                <div id="loginBtn" class="g-signin2" data-onsuccess="onSignIn"></div>
                </li>
            </ul>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDarkDropdown" style="background-color: #e3f2fd;">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a id="dropHead" class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img id='loginImg' alt="" src="../img/person-circle.svg" class="bi bi-person-circle"
                            viewBox="0 0 16 16">
                        <span id="dropText">Cadastre-se / Login</span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink" style="background-color: #e3f2fd;">
                        <li><button type="button" class="btn btn-primary dropdown-item" data-toggle="modal" data-target="#exampleModal">
                        Perfil
                      </button></li>
                        <li><a class="dropdown-item" href="#">Historico</a></li>
                        <li><a class="dropdown-item" href="#">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>`
header.append(cabecalho)
        $('a.active').removeClass('active');
        console.log(location.pathname)
        $('a[href="' + location.pathname + '"]').addClass('active');
}
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
function rodapePrincipal(){
    let footer = $("#footer")
    let rodape = `<!-- ***************************************************COMECEI A SECTION************* -->
    <section class="sectionFooter">
        <div id="footer1">
            <nav class=" classfooter">
                <ul>
                    <p id="institucional"> INSTITUCIONAL </p>
                    <li>Sobre Nós</li>
                    <li>Cadastro</li>
                    <li>Cotação</a></li>
                    <li>Reserva</li>
                    <li>Seguro Aduaneiro</li>
                </ul>
            </nav>
        </div>
        <div id="footer2">
            <nav class="classfooter">
                <ul>
                    <section class="redesSociais">
                        <p id="redesSociais"> SIGA NOSSAS REDES </p>
                        <div id="central">
                            <div id="div1">
                                <li class="linha">
                                    <img src="https://img.icons8.com/material-outlined/24/000000/twitter.png"
                                        alt=" ícone do Twitter" a href="" />
                                </li>
                            </div>
                            <div id="div2">
                                <li>
                                    <img src="https://img.icons8.com/material-rounded/24/000000/linkedin.png"
                                        alt="ícone do linkedIn " />
                                </li>
                            </div>
                            <div id="div3">
                                <li>
                                    <img src="https://img.icons8.com/material-outlined/24/000000/instagram-new--v1.png"
                                        alt="ícone do instagram" />
                                </li>
                            </div>
                            <div id="div4">
                                <li>
                                    <img src="https://img.icons8.com/material-rounded/24/000000/facebook-new.png"
                                        alt="ícone do facebook" />
                                </li>
                            </div>
                        </div>
                    </section>
                </ul>
            </nav>
        </div>
        <div id="footer3">
            <nav class=" classfooter">
                <ul>
                    <p id="central"> FALE CONOSCO </p>
                    <li> <img src="https://img.icons8.com/material-sharp/24/000000/no-phones--v1.png"
                            alt=" ícone de telefone " /> (XX) XXXX-XXXX</li>
                    <li><img src="https://img.icons8.com/material-outlined/24/000000/email.png"
                            alt="ícone de email " />
                        queupsmaritime@gmail.com.br </li>
                    <li><img src="https://img.icons8.com/material/24/000000/internet.png"
                            alt="ícone de servidor " />
                        www.queupsmaritime.com.br </li>
                    <li><img src="https://img.icons8.com/material/24/000000/marker--v1.png" alt="ícone de mapa" />
                        Rua Coronel Lisboa, Vila Mariana-SP, Brasil, CEP 04041-050.
                    </li>
                </ul>
            </nav>
        </div>
    </section>
    <!-- *******************************************************FECHEI A SECTION*************
    <!-************************************* DIV PARA FORMAS DE PAGAMENTO -->
    <!-- <p id="formaPag"> Formas de pagamento:</p>
    <div id="pagamento">
        <div class="pagamento">
            <li>
                <img src="https://img.icons8.com/fluency/48/000000/mastercard.png" alt="ícone do cartão " />
            </li>
        </div>
        <div class="pagamento">
            <li>
                <img src="https://img.icons8.com/fluency/48/000000/visa.png" alt="ícone do cartão" />
            </li>
        </div>
        <div class="pagamento">
            <li>
                <img src="https://img.icons8.com/fluency/48/000000/card-in-use-1.png" />
            </li>
        </div>
        <div class="pagamento">
            <li>
                <img src="https://img.icons8.com/color/50/000000/mercado-pago.png" />
            </li>
        </div>
        <div class="pagamento">
            <li>
                <img src="https://img.icons8.com/color/48/000000/paypal.png" />
            </li>
        </div>
        <div class="pagamento">
            <li>
                <img src="https://img.icons8.com/fluency/48/000000/diners-club.png" />
            </li>
        </div>
        <div class="pagamento">
            <li>
                <img src="https://img.icons8.com/color/48/000000/american-express-squared.png" />
            </li>
        </div>
    </div>  -->`
    footer.append(rodape)
}
function rodapeSecundario(){
    let rodape2 = $("#rodape")
    console.log(rodape2)
    let appendRodape = `<p>
    Copyright © 2021 Queops Maritime | Todos os direitos reservados | Políticas de
    Privacidade | Políticas de
    Cookies
</p>`
    rodape2.append(appendRodape)
}

function inicar(){
    rodapePrincipal();
    cabecalho();
    consultaCotação();
    consultaTempoReal();
    getUser();
    rodapeSecundario();
}

