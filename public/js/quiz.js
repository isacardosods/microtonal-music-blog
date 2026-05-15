let perguntas = [];
const btn_proximo = document.getElementById('next_btn');
const btn_anterior = document.getElementById('back_btn');
const btn_enviar = document.getElementById('btn_enviar');
const cardErro = document.getElementById('cardErro');


fetch("/quiz/buscarAlternativas")
    .then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (dados) {

                renderizarQuiz(dados);
                perguntas = document.querySelectorAll('.pergunta')
                verificar();

            });

        } else {

            console.log("Erro ao carregar quiz");

        }

    }).catch(function (erro) {

        console.log(erro);

    });

function renderizarQuiz(dados) {

    let perguntas = {};

    for (let i = 0; i < dados.length; i++) {

        let linha = dados[i];

        if (perguntas[linha.id_pergunta] == undefined) {

            perguntas[linha.id_pergunta] = {
                pergunta: linha.pergunta,
                alternativas: []
            };

        }

        perguntas[linha.id_pergunta].alternativas.push({
            id_alternativa: linha.id_alternativa,
            alternativa: linha.alternativa,
            correta: linha.correta
        });

    }

    console.log(perguntas);

    let container = document.getElementById("perguntas-container");

    container.innerHTML = "";

    let contador = 0;

    for (let id_pergunta in perguntas) {

        let perguntaAtual = perguntas[id_pergunta];

        let classePergunta = contador == 0
            ? "pergunta ativa"
            : "pergunta";

        let perguntaHTML = `
        
            <div class="${classePergunta}">

                <h2>
                    ${id_pergunta}. ${perguntaAtual.pergunta}
                </h2>

                <div class="opcoes">
        `;

        for (let i = 0; i < perguntaAtual.alternativas.length; i++) {

            let alternativa = perguntaAtual.alternativas[i];

            perguntaHTML += `
            
                <label>

                    <input
                        type="radio"
                        name="q${id_pergunta}"
                        data-pergunta="${id_pergunta}"
                        data-id_resposta="${alternativa.id_alternativa}"
                        data-correta="${alternativa.correta}"
                    >

                    ${alternativa.alternativa}

                </label>
            `;
        }

        perguntaHTML += `
                </div>

            </div>
        `;

        container.innerHTML += perguntaHTML;

        contador++;

    }

}

let pergunta_atual = 0;

function verificar() {

    btn_proximo.style.display = 'block';

    btn_anterior.style.display = pergunta_atual <= 0 ? 'none' : 'block';

    btn_enviar.style.display = 'none';

    if (pergunta_atual < perguntas.length) {
        perguntas[pergunta_atual].classList.add('ativa');
    }

    if (pergunta_atual == perguntas.length - 1) {
        btn_proximo.style.display = 'none';
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

    for (let i = 0; i < 10; i++) {
        const questao = document.querySelector(`input[name="q${i + 1}"]:checked`);

        if (!questao) {
            cardErro.style.display = "flex";
            mensagem_erro.innerHTML = `É necessário responder todas as questões!`;
            return;
        }

        //obs: validar se a resposta é certa ou errada no controller
        //obs2: dataset é como se fosse um objeto que armazena os atributos que vc colocou nele a partir do front
        usuario_respostas.respostas.push({
            id_pergunta: questao.dataset.pergunta,
            id_alternativa: questao.dataset.id_resposta
        });

    }

    console.log('cadastro: ', usuario_respostas);

    fetch("/quiz/cadastrarRespostas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario_respostas)
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO cadastrarRespostas()!")

        if (resposta.ok) {
            console.log(resposta);
            console.log('Respostas cadastradas com sucesso!')
            carregarDiv();

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
            });

        } else {

            console.log("Houve um erro ao tentar cadastrar as respostas!");

            resposta.text().then(texto => {
                console.error(texto);

                cardErro.style.display = "flex";
                mensagem_erro.innerHTML = `É necessário estar logado para responder!`;
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function carregarDiv() {
    cardErro.style.display = "flex";
    mensagem_erro.innerHTML = `Respostas enviadas! Redirecionando para Home...`;

    setTimeout(() => {
        window.location = '../index.html';
    }, 2000);
}