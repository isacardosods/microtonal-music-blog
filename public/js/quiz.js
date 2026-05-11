//retorna uma lista de elementos que possuem essa classe!!!
const perguntas = document.querySelectorAll('.pergunta');
const btn_proximo = document.getElementById('next_btn');
const btn_anterior = document.getElementById('back_btn');
const btn_enviar = document.getElementById('btn_enviar');

let pergunta_atual = 0;

function verificar() {
    if (pergunta_atual < perguntas.length) {

        perguntas[pergunta_atual].classList.add('ativa');

    } else {

        btn_proximo.style.display = 'none';
        btn_anterior.style.display = 'none';
        btn_enviar.style.display = 'block';

    }
}

function avancar() {

    perguntas[pergunta_atual].classList.remove('ativa');

    pergunta_atual++;

    // if (pergunta_atual < perguntas.length) {

    //     perguntas[pergunta_atual].classList.add('ativa');

    // } else {

    //     btn_proximo.style.display = 'none';
    //     btn_enviar.style.display = 'block';
    // }
    verificar();
    console.log(pergunta_atual)
}

function recuar() {

    perguntas[pergunta_atual].classList.remove('ativa');

    pergunta_atual--;

    // if (pergunta_atual < perguntas.length) {

    //     perguntas[pergunta_atual].classList.add('ativa');

    // } else {

    //     btn_proximo.style.display = 'none';
    //     btn_enviar.style.display = 'block';

    // }
    verificar();
}
