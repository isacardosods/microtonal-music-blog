function validarSessao() {
    const div_login_alert = document.getElementById('login_alert');
    var id = sessionStorage.ID_USUARIO;

    if (id == null) {
      div_login_alert.style.display = 'flex';
    } 
}

function limparSessao() {
    sessionStorage.clear();
}

function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    } else {
        divErrosLogin.style.display = "none";
        divErrosLogin.innerHTML = "";
    }
}

