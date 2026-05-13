const perguntas = document.querySelectorAll('.pergunta');
const btn_proximo = document.getElementById('next_btn');
const btn_anterior = document.getElementById('back_btn');
const btn_enviar = document.getElementById('btn_enviar');
const cardErro = document.getElementById('cardErro');

let pergunta_atual = 0;

verificar();

function verificar() {
    btn_anterior.style.display = pergunta_atual <= 0 ? 'none' : 'block';

    if (pergunta_atual < perguntas.length) {
        perguntas[pergunta_atual].classList.add('ativa');
    } else {
        btn_proximo.style.display = 'none';
        btn_anterior.style.display = 'none';
        btn_enviar.style.display = 'block';
    }
}

function avancar() {
    const respostaAtual = document.querySelector(`input[name="q${pergunta_atual + 1}"]:checked`);

    if (!respostaAtual) {
        cardErro.style.display = "flex";
        mensagem_erro.innerHTML = `Responda a questão atual antes de avançar!`;
        return;
    }

    cardErro.style.display = "none";
    perguntas[pergunta_atual].classList.remove('ativa');
    pergunta_atual++;
    verificar();
}

function recuar() {
    perguntas[pergunta_atual].classList.remove('ativa');
    pergunta_atual--;
    verificar();
}

function cadastrarRespostas() {
    let usuario_respostas = [];
    let respostas = [];

    for (let i = 1; i <= 10; i++) {
        const resposta = document.querySelector(`input[name="q${i}"]:checked`);

        if (!resposta) {
            cardErro.style.display = "flex";
            mensagem_erro.innerHTML = `É necessário responder todas as questões!`;
            return;
        }

        //capturar através de um select ?
        usuario_respostas.push({
            id_usuario: `${sessionStorage.getItem('ID_USUARIO')}`,
            id_resposta: `q${i}`
        });

        respostas.push({
            resposta: resposta.id,
            tipo: resposta.value
        })
    }

    console.log('cadastro: ', usuario_respostas);
    carregarDiv();
}

function carregarDiv() {
    cardErro.style.display = "flex";
    mensagem_erro.innerHTML = `Respostas enviadas! Redirecionando para Home...`;

    setTimeout(() => {
        window.location = '../index.html';
    }, 2000);
}