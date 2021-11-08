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
    $('#menor').text('Prix ​​le plus bas: R$:' + menorBid)
    let maiorBid = bidList.sort((a, b) => a - b).at(-1)
    $('#maior').text('Cotation la plus élevée: R$:' + parseFloat(maiorBid).toFixed(2) )
    let variacaoBid = (((maiorBid - menorBid) / menorBid) * 100).toFixed(2)
    $('#variacao').text('Variation de période: ' + variacaoBid+"%")
    let bidMedio = (bidTotal / bidList.length).toFixed(2)
    $('#media').text('Moyenne sur la période: R$' + bidMedio)

}
function consultaTempoReal() {
    $('#cotacao').text('Dentro')
    fetch(`https://economia.awesomeapi.com.br/last/USD-BRL`)
        .then(response => {
            response.json()
                .then(data => $('#cotacao').text('Temps réel: ' + data['USDBRL']['bid']))
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
    logImg.src = img
    document.getElementById('dropText').innerText = nome
    document.getElementById('loginBtn').removeAttribute("data-onsuccess")
    document.getElementById('loginBtn').setAttribute("onclick", "signOut()")
    console.log(document.getElementById('loginBtn'))
    let userData = {}
    userData.nome = profile.getName();
    userData.mail = profile.getEmail()
    userData.img = profile.getImageUrl()
    userData.id = profile.getId()
    localStorage.setItem('userData', JSON.stringify(userData))
    console.log(localStorage)
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.getElementById('dropText').innerText = "S'inscrire / Login"
        let logImg = document.getElementById('loginImg')
        logImg.src = "img/person-circle.svg"
        localStorage.clear();
        console.log('User signed out.');
        console.log(localStorage);

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
        $("#contato").val(userData.nome)
    }
}

function cabecalho() {
    let header = $('header')
    let cabecalho = `<nav class="navbar navbar-expand-sm navbar-light" style="background-color: #1F6D69;">
    <div class="container-fluid">
        <a class="navbar-brand" href="/queopsmaritime/index.html"><img src="../imagens/Keops.gif"
                style="width: 9vw; height: 6.5vw;" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown, #navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" style="color: #F1BE07";>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
                <li class="nav-item fontColorNav" >
                    <a class="nav-link active" aria-current="page" href="/queopsmaritime/fr/index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/queopsmaritime/fr/sobreNos.html">À propos de nous</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/queopsmaritime/fr/servicos.html">
                    Prestations de service
                    </a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/queopsmaritime/fr/cotacao.html">
                Prix
            </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/queopsmaritime/fr/contato.html">
                    Contact
                    </a>
                </li>
                <li class="nav-item">
        <a class="nav-link" href="/queopsmaritime/index.html">
            <img src="../imagens/bandeira-do-brasil.png" alt="" class="traducao" >
        </a>
        </li>
            <li class="nav-item">
            <a class="nav-link" href="/queopsmaritime/fr/index.html">
                <img src="../imagens/france.png" alt="" class="traducao" >
            </a>
        </li>
         <li class="nav-item">
             <a class="nav-link" href="/queopsmaritime/es/index.html">
                <img src="../imagens/spain.png" alt="" class="traducao" >
            </a>
         </li>
        <li class="nav-item">
            <a class="nav-link" href="/queopsmaritime/en/index.html">
             <img src="../imagens/united-kingdom.png" alt="" class="traducao" >
            </a>
        </li>
            </ul>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDarkDropdown" style="background-color: #1F6D69;">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a id="dropHead" class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img id='loginImg' alt="" src="../imagens/person-circle.svg" class="loginImg bi bi-person-circle"
                            viewBox="0 0 16 16">
                        <span id="dropText">S'inscrire / Login</span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink" style="background-color: #e3f2fd;">
                        <li><button type="button" class="btn btn-primary dropdown-item" onclick="abrirModal()">
                        Profil
                      </button></li>
                        <li><a class="dropdown-item" href="#">Historique</a></li>
                        <li><button class="dropdown-item" onclick="signOut()">Logout</button></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div class="container-fluid">
<div class="row d-flex justify-content-between" style="background-color: #F1BE07; color:#1F6D69">
    <div class="col-lg-2 col-md-4 col-sm-6" id="cotacao"></div>
    <div class="col-lg-2 col-md-4 col-sm-6 font-weight-bold">Variation sur 360 jours :</div>
    <div class="col-lg-2 col-md-4 col-sm-6"id="media"></div>
    <div class="col-lg-2 col-md-4 col-sm-6" id="menor"></div>
    <div class="col-lg-2 col-md-4 col-sm-6" id="maior"></div>
    <div class="col-lg-2 col-md-4 col-sm-6" id ="variacao"></div>
</div></div>`
    header.append(cabecalho)
    $('a.active').removeClass('active');
    console.log(location.pathname)
    $('a[href="' + location.pathname + '"]').addClass('active');
}
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
function rodapePrincipal() {
    let footer = $("#footer")
    let rodape = `
    <div class="container-fluid text-warning" style="background-color: #1F6D69;">
        <div class="row">
            <div class="col-lg-3 col-md-12 my-3">
                <div class="row d-flex justify-content-center">INSTITUTIONNEL</div>
                <div class="row d-flex justify-content-center pointer" onclick="window.location='/queopsmaritime/fr/sobreNos.html'" >À propos de nous</div>
                <div class="row d-flex justify-content-center pointer" onclick="window.location='href="/queopsmaritime/fr/servicos.html'">Prestations de service</div>
                <div class="row d-flex justify-content-center pointer" onclick="window.location='href="/queopsmaritime/fr/cotacao.html'">Prix</div>
                 <div class="row d-flex justify-content-center pointer" onclick="window.location='href="/queopsmaritime/fr/contato.html'">Contact</div>
            </div>
            <div class="col-lg-5 col-md-12 my-3">
                <div class="row justify-content-center">SUIVEZ NOS RÉSEAUX </div>
                <div class="row mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F1BE07"
                    class="bi bi-twitter" viewBox="0 0 16 16">
                    <path
                        d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg></div>
                <div class="row mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F1BE07"
                    class="bi bi-linkedin" viewBox="0 0 16 16">
                    <path
                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg></div>
                <div class="row mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F1BE07"
                    class="bi bi-instagram" viewBox="0 0 16 16">
                    <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg></div>
                <div class="row mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F1BE07"
                    class="bi bi-facebook" viewBox="0 0 16 16">
                    <path
                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg></div>
                <div class="row border border-warning mt-2"></div>
            </div>
            <div class="col-lg-4 col-md-12-d my-3">
                <div class="row d-flex justify-content-center">NOUS CONTACTER</div>
                <div class="row-inline d-flex justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg> (XX) XXXX-XXXX
                </div>
                    <div class="row-inline d-flex justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-at"
                    viewBox="0 0 16 16">
                    <path
                        d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                </svg>
                queopsmaritime@gmail.com.br
            </div>
            <div class="row-inline d-flex justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-hand-index-thumb-fill" viewBox="0 0 16 16">
                    <path
                        d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716.075.09.141.175.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0z" />
                </svg>
                www.queopsmaritime.com.br
            </div>
            <div class="row-inline d-flex justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path
                        d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                Rua Coronel Lisboa, Vila Mariana-SP, Brasil, CEP 04041-050.
            </div>
        </div>
        </div>
        <div class="row d-flex justify-content-center" style="background-color: #1F6D69; color:"#F1BE07">
         Copyright © 2021 Queops Maritime | Tous les droits sont réservés | Politiques de
         Intimité | Politiques de
             Cookies
            </div>
        </div>
    `
    footer.append(rodape)
}

function inicar() {
    rodapePrincipal();
    cabecalho();
    consultaCotação();
    consultaTempoReal();
    getUser();
}
function abrirModal() {
    var modal = document.getElementById("modalLogin");
    var elementoBootstrap = new bootstrap.Modal(modal);
    elementoBootstrap.show();
}
function fecharModal() {
    $("#modalLogin").modal("hide");
}
var dadosCNPJ = [];
function getCNPJ() {
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
        'success': function (dado) {
            console.log(dado)
            tratarCNPJ(dado)
        }
    })

}
function tratarCNPJ(dado) {
    var dadosCNPJ = dado
    console.log(dadosCNPJ.situacao)
    if (dadosCNPJ.situacao != "ATIVA") {
        let form = document.getElementById("cadastro");
        let elements = form.elements;
        for (let i = 0; i < elements.length; ++i) {
            elements[i].disabled = true;
            
        }
        $('#alerta').text('Devis uniquement pour les CNPJ actifs')
            abrirModalAlerta()
    } else {
        $("#situacao").val(dadosCNPJ.situacao);
        $("#razaoSocial").val(dadosCNPJ.nome);
        $("#nomeFantasia").val(dadosCNPJ.fantasia);
        $("#email").val(dadosCNPJ.email);
        $("#telefone").val(dadosCNPJ.telefone);
        $("#cep").val(dadosCNPJ.cep);
        $("#logradouro").val(dadosCNPJ.logradouro);
        $("#numero").val(dadosCNPJ.numero);
        $("#complemento").val(dadosCNPJ.complemento);
        $("#bairro").val(dadosCNPJ.bairro);
        $("#cidade").val(dadosCNPJ.municipio);
        $("#estado").val(dadosCNPJ.uf);
    }
}

function validarForm() {
    if ($("#razaoSocial").val().length < 3) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.razaoSocial.focus()
        return false;
    }
    if ($("#contato").val().length < 3) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.contato.focus()
        return false;
    }
    if ($("#email").val().length < 3) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.email.focus()
        return false;
    }
    if ($("#telefone").val().length < 10) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.telefone.focus()
        return false;
    }
    if ($("#celular").val().length < 10) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.celular.focus()
        return false;
    }
    if ($("#cep").val().length < 5) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.cep.focus()
        return false;
    }
    if ($("#logradouro").val().length < 5) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.logradouro.focus()
        return false;
    }
    if ($("#cidade").val().length < 5) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.cidade.focus()
        return false;
    }
    if ($("#estado").val().length < 2) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.estado.focus()
        return false;
    }
    if ($("#pais").val().length < 5) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.pais.focus()
        return false;
    }
    if ($("#transacao").val() === "") {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.transacao.focus()
        return false;
    }
    if ($("#carga").val() === "") {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.carga.focus()
        return false;
    }
    if ($("#quantidadeVol").val().length < 1) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.quantidadeVol.focus()
        return false;
    }
    if ($("#peso").val().length < 1) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.peso.focus()
        return false;
    }
    if ($("#cubagem").val().length < 1) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        return false;
    }
    if ($("#origem").val() === "") {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.origem.focus()
        return false;
    }
    if ($("#destino").val() === "") {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.destino.focus();
        return false;
    }
    if ($("#valor").val().length < 1) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.valor.focus()
        return false;
    }
    if ($("#descricaoMercadoria").val() === "") {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastro.descricaoMercadoria.focus()
        return false;
    }
    salvarDados()
}
var dadosCNPJPessoal = [];
function getCNPJPessoal() {
    let cnpj = $("#cnpjCadastro").val();
    console.log(cnpj)
    consultaCNPJPessoal(cnpj)

}
function consultaCNPJPessoal(cnpj) {
    // Limpa o CNPJ para conter somente numeros, removendo traços e pontos
    cnpj = cnpj.replace(/\D/g, '');

    $.ajax({
        'url': 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
        'type': "GET",
        'dataType': 'jsonp',
        'success': function (dado) {
            console.log(dado)
            tratarCNPJPessoal(dado)
        }
    })

}
function tratarCNPJPessoal(dado) {
    var dadosCNPJ = dado
    console.log(dadosCNPJ.situacao)
    if (dadosCNPJ.situacao != "ATIVA") {
        let form = document.getElementById("cadastro");
        let elements = form.elements;
        for (let i = 0; i < elements.length; ++i) {
            elements[i].disabled = true;
        }
    } else {
        $("#situacaoCadastro").val(dadosCNPJ.situacao);
        $("#razaoSocialCadastro").val(dadosCNPJ.nome);
        $("#nomeFantasiaCadastro").val(dadosCNPJ.fantasia);
        $("#emailCadastro").val(dadosCNPJ.email);
        $("#telefoneCadastro").val(dadosCNPJ.telefone);
        $("#cepCadastro").val(dadosCNPJ.cep);
        $("#logradouroCadastro").val(dadosCNPJ.logradouro);
        $("#numeroCadastro").val(dadosCNPJ.numero);
        $("#complementoCadastro").val(dadosCNPJ.complemento);
        $("#bairroCadastro").val(dadosCNPJ.bairro);
        $("#cidadeCadastro").val(dadosCNPJ.municipio);
        $("#estadoCadastro").val(dadosCNPJ.uf);
    }
}
function validarCadastro(){
    if ($("#nome").val().length < 3) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.razaoSocial.focus()
        return false;
    }
    if ($("#cpf").val().length < 11) {
        $('#alerta').text('Remplissez correctement le formulaire"')
            abrirModalAlerta()
        document.cadastroPessoal.razaoSocial.focus()
        return false;
    }
    if ($("#razaoSocialCadastro").val().length < 3) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.razaoSocial.focus()
        return false;
    }
    if ($("#contatoCadastro").val().length < 3) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.contato.focus()
        return false;
    }
    if ($("#emailCadastro").val().length < 3) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.email.focus()
        return false;
    }
    if ($("#telefoneCadastro").val().length < 10) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.telefone.focus()
        return false;
    }
    if ($("#celularCadastro").val().length < 10) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.celular.focus()
        return false;
    }
    if ($("#cepCadastro").val().length < 5) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.cep.focus()
        return false;
    }
    if ($("#logradouroCadastro").val().length < 5) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.logradouro.focus()
        return false;
    }
    if ($("#cidadeCadastro").val().length < 5) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.cidade.focus()
        return false;
    }
    if ($("#estadoCadastro").val().length < 2) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        return false;
    }
    if ($("#paisCadastro").val().length < 5) {
        $('#alerta').text('Remplissez correctement le formulaire')
            abrirModalAlerta()
        document.cadastroPessoal.pais.focus()
        return false;
    }
}
var mensagemWhatsapp = ''
function salvarDados() {
    let orcamento = {}
    orcamento.cnpj = $("#cnpj").val()
    $("#modalcnpj").text($("#cnpj").val())
    orcamento.razaoSocial = $("#razaoSocial").val()
    $("#modalrazaoSocial").text($("#razaoSocial").val())
    orcamento.nomeFantasia = $("#nomeFantasia").val()
    $("#modalnomeFantasia").text($("#nomeFantasia").val())
    orcamento.contato = $("#contato").val()
    $("#modalcontato").text($("#contato").val())
    orcamento.email = $("#email").val()
    $("#modalemail").text($("#email").val())
    orcamento.inscricaoEstadual = $("#inscricaoEstadual").val()
    $("#modalinscricaoEstadual").text($("#inscricaoEstadual").val())
    orcamento.telefone = $("#telefone").val()
    $("#modaltelefone").text($("#telefone").val())
    orcamento.celular = $("#celular").val()
    $("#modalcelular").text($("#celular").val())
    orcamento.cep = $("#cep").val()
    $("#modalcep").text($("#cep").val())
    orcamento.logradouro = $("#logradouro").val()
    $("#modallogradouro").text($("#logradouro").val())
    orcamento.numero = $("#numero").val()
    $("#modalnumero").text($("#numero").val())
    orcamento.complemento = $("#complemento").val()
    $("#modalcomplemento").text($("#complemento").val())
    orcamento.bairro = $("#bairro").val()
    $("#modalbairro").text($("#bairro").val())
    orcamento.cidade = $("#cidade").val()
    $("#modalcidade").text($("#cidade").val())
    orcamento.estado = $("#estado").val()
    $("#modalestado").text($("#estado").val())
    orcamento.pais = $("#pais").val()
    $("#modalpais").text($("#pais").val())
    orcamento.transacao = $("#transacao").val()
    $("#modaltipoTransacao").text($("#transacao").val())
    orcamento.carga = $("#carga").val()
    $("#modaltipoCarga").text($("#carga").val())
    orcamento.quantidadeVol = $("#quantidadeVol").val()
    $("#modalqtdVol").text($("#quantidadeVol").val())
    orcamento.peso = $("#peso").val()
    $("#modalpeso").text($("#peso").val())
    orcamento.cubagem = $("#cubagem").val()
    $("#modalcubagem").text($("#cubagem").val())
    orcamento.origem = $("#origem").val()
    $("#modalorigem").text($("#origem").val())
    orcamento.destino = $("#destino").val()
    $("#modaldestino").text($("#destino").val())
    orcamento.valor = $("#valor").val()
    $("#modalvalorMer").text($("#valor").val())
    orcamento.descricaoMercadoria = $("#descricaoMercadoria").val()
    $("#modaldescricaoMercadoria").text($("#descricaoMercadoria").val())
    mensagemWhatsapp = JSON.stringify(orcamento)
    abrirModalCotacao()
}
function enviarOrcamento() {
    window.open("https://api.whatsapp.com/send?phone=5527996998347&text=Voc%C3%AA%20acaba%20de%20receber%20um%20or%C3%A7amento%3A%20" + mensagemWhatsapp, '_blank');
    document.getElementById("cadastro").reset();
    fecharModalCotacao()
}
function abrirModalCotacao() {
    var modal2 = document.getElementById("modalCotacao");
    var elementoBootstrap = new bootstrap.Modal(modal2);
    elementoBootstrap.show();
}
function fecharModalCotacao() {
    $("#modalCotacao").modal("hide");
}

function VerificaCPF() {
    if (vercpf(document.getElementById("cpf").value)) { document.cadastroPessoal } else {
        errors = "1"; if (errors) {
            $('#alerta').text('CPF NON VALIDE')
            abrirModalAlerta()
        };
        $('#botaoFechar').css({ marginTop: "120px" });
        document.retorno = (errors == '');
    }
}
function vercpf(cpf) {
    let cpfSemTraco = cpf.replace("-", "");
    cpf = cpfSemTraco.replaceAll(".", "");
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
        return false;
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
        $('#alerta').text('CPF valide')
            abrirModalAlerta()
    
    return true;
}
// função para fechar a janela que mostra os dados
function fecharJanela() {
    $('#confirmaCpf').css({ display: "none" });
}
function abrirModalAlerta() {
    var modal3 = document.getElementById("modalAlerta");
    var elementoBootstrap = new bootstrap.Modal(modal3);
    elementoBootstrap.show();
}
function fecharModalAlerta() {
    $("#modalAlerta").modal("hide");
}