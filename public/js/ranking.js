const div_ranking = document.querySelector('.ranking-content');
const p = document.getElementById('bem_vindo').innerHTML = `Bem-vindo, ${sessionStorage.getItem('NOME_USUARIO')}`;

let id_usuario = sessionStorage.getItem('ID_USUARIO');


function carregarRanking(json){
    for (let i = 0; i < json.length; i++) {
        let user_atual = json[i];

        let nome_usuario = user_atual.nome_usuario;
        let respostas_corretas = user_atual.respostas_corretas;
        
        let div_user = document.createElement('div');
        div_user.classList.add('user');
        
        let div_name = document.createElement('div');
        div_name.classList.add('name');

        let colocacao_div = document.createElement('h2');
        let usuario_div = document.createElement('span');
        let acertos_div = document.createElement('span');
    
        colocacao_div.textContent = `${i + 1}°`;
        usuario_div.textContent = nome_usuario;
        acertos_div.textContent = `Acertos: ${respostas_corretas}`;

        div_name.appendChild(colocacao_div);
        div_name.appendChild(usuario_div);
        div_user.appendChild(div_name);
        div_user.appendChild(acertos_div);
        div_ranking.appendChild(div_user);
    }
}

fetch(`/dashboard/ranking`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (resposta) {
    console.log("ESTOU NO THEN DO ranking()!")

    if (resposta.ok) {
        console.log(resposta);
        console.log('Ranking buscado com sucesso!')

        resposta.json().then(json => {
            console.log(json)

            carregarRanking(json);
        });
    } else {

        console.log("Houve um erro ao tentar buscar os gêneros!");

        resposta.text().then(texto => {
            console.error(texto);
        });
    }

}).catch(function (erro) {
    console.log(erro);
})