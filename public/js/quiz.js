const perguntas = document.querySelectorAll('.pergunta');
const btn_proximo = document.getElementById('next_btn');
const btn_anterior = document.getElementById('back_btn');
const btn_enviar = document.getElementById('btn_enviar');
const cardErro = document.getElementById('cardErro');

let pergunta_atual = 1;

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
    let usuario_respostas = 
        {
            "id_usuario": `${sessionStorage.getItem('ID_USUARIO')}`,
            "respostas": []
        };

    for (let i = 1; i <= 10; i++) {
        const questao = document.querySelector(`input[name="q${i}"]:checked`);

        if (!questao) {
            cardErro.style.display = "flex";
            mensagem_erro.innerHTML = `É necessário responder todas as questões!`;
            return;
        }

        //muita dificuldade aqui, tirar dúvidas depois
        //obs: validar se a resposta é certa ou errada no controller
        //obs2: dataset é como se fosse um objeto que armazena os atributos que vc colocou nele a partir do front
        usuario_respostas.respostas.push({
            id_pergunta: questao.dataset.pergunta,
            id_alternativa: questao.dataset.id_resposta
        });

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