const perguntas = document.querySelectorAll('.pergunta');
const btn_proximo = document.getElementById('next_btn');
const btn_anterior = document.getElementById('back_btn');
const btn_enviar = document.getElementById('btn_enviar');
const cardErro = document.querySelector('.popup_login');

let pergunta_atual = 0;

verificar();

function validarSessao() {
    var id_usuario = sessionStorage.getItem('ID_USUARIO');

    if (!id_usuario) {
        cardErro.style.display = 'flex';
    }
} validarSessao();


function fecharPopup() {
    cardErro.style.display = 'none';
}

//verifica qual é a pergunta do quiz e a partir disso habilita ou nao o botao de voltar
function verificar() {
    btn_anterior.style.display = pergunta_atual <= 0 ? 'none' : 'block';

    //verificacao para ir na parte de enviar respostas
    if (pergunta_atual < perguntas.length) {
        perguntas[pergunta_atual].classList.add('ativa');
    } else {
        btn_proximo.style.display = 'none';
        btn_anterior.style.display = 'none';
        btn_enviar.style.display = 'block';
    }
}

//funcao de avançar no quiz
function avancar() {
    const respostaAtual = document.querySelector(`input[name="q${pergunta_atual + 1}"]:checked`);

    if (!respostaAtual) {
        cardErro.style.display = "flex";
        mensagem_erro.innerHTML = `Responda a questão atual antes de avançar!`;
        title_info.innerHTML = 'Não seja apressado!'
        img_icon.src = '../assets/img/erro.svg'
        
        return;
    }

    cardErro.style.display = "none";
    perguntas[pergunta_atual].classList.remove('ativa');
    pergunta_atual++;
    verificar();
}

//funcao de recuar no quiz
function recuar() {
    perguntas[pergunta_atual].classList.remove('ativa');
    pergunta_atual--;
    verificar();
}

function cadastrarRespostas() {
    let usuario_respostas =
    {
        "id_usuario": sessionStorage.getItem('ID_USUARIO'),
        "respostas": []
    };

    for (let i = 0; i < 10; i++) {
        let questao = document.querySelector(`input[name="q${i + 1}"]:checked`);

        //obs: dataset é como se fosse um objeto que armazena os atributos que vc colocou nele a partir do front
        //nesse caso, eu coloco os ids assim como estao cadastrados no banco de dados
        //  não é muito prático para ser escalável mas é simples de utilizar :)
        usuario_respostas.respostas.push({
            id_pergunta: questao.dataset.pergunta,
            id_alternativa: questao.dataset.id_resposta
        });

        console.log(usuario_respostas)
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
            validarSessao();

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function carregarDiv() {
    const btn = document.getElementById('btn_dash');

    cardErro.style.display = "flex";
    img_icon.src = '../assets/img/ok.svg';
    title_info.innerHTML = 'Parabéns!'
    mensagem_erro.innerHTML = "Respostas enviadas com sucesso";
    btn.textContent = 'Acessar Dashboard';

    btn.addEventListener('click', () => {
        window.location = '../dashboard.html';
    })
}