//retorna uma lista de elementos que possuem essa classe!!!
const perguntas = document.querySelectorAll('.pergunta');
const btn_proximo = document.getElementById('next_btn');
const btn_anterior = document.getElementById('back_btn');
const btn_enviar = document.getElementById('btn_enviar');
const cardErro = document.getElementById('cardErro');

let pergunta_atual = 0;

verificar();

function verificar() {
    if (pergunta_atual <= 0) {
        btn_anterior.style.display = 'none';
    } else {
        btn_anterior.style.display = 'block';
    }

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

    verificar();
}

function recuar() {
    perguntas[pergunta_atual].classList.remove('ativa');

    pergunta_atual--;

    verificar();
}

function capturarRespostas() {
    let questoes = [];

    //checked retorna o elemento selecionado! nessa lógica, ele acessa o input atraves do for por conta do i++, que vai até 10 (pois existem 10 questões)
    for (let i = 1; i <= 10; i++) {

        //guarda no vetor 'respostas' o id da alternativa
        let resposta = document.querySelector(`input[name="q${i}"]:checked`);

        if (!resposta) {
            cardErro.style.display = "flex";
            mensagem_erro.innerHTML = `É necessário responder todas as questões!`
            return;
        }

        let questao = {
            "id": `q${i}`,
            "resposta": `${resposta.id}`,
            "tipo": `${resposta.value}`
        };

        questoes.push(questao);
    }
    console.log(questoes);
}
