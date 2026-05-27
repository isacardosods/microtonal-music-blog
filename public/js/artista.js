const left_arrow = document.getElementById('left');
const right_arrow = document.getElementById('right');
const albuns = document.querySelectorAll('.album');
const likes = document.querySelectorAll('.like');
const dislikes = document.querySelectorAll('.dislike');
const div_login_alert = document.querySelector('.popup_login');


let contador = 0;
let id_usuario = sessionStorage.getItem('ID_USUARIO');
albuns[0].style.display = 'flex';

function validarSessao() {
    if (!id_usuario) {
        div_login_alert.style.display = 'flex';
    }
} validarSessao();

function fecharPopup() {
    div_login_alert.style.display = 'none';
}

left_arrow.addEventListener('click', () => {
    if (contador <= 0) return;

    for (let i = 0; i < albuns.length; i++) {
        albuns[i].style.display = 'none';
    }

    contador--
    albuns[contador].style.display = 'flex';
})

right_arrow.addEventListener('click', () => {
    if (contador >= albuns.length - 1) return;

    for (let i = 0; i < albuns.length; i++) {
        albuns[i].style.display = 'none';
    }
    contador++
    albuns[contador].style.display = 'flex';
})

let like_musicas = [
    {
        "id_usuario": id_usuario,
        "id_musica": 1,
        "tipo_like": 'DEFAULT',
    },
    {
        "id_usuario": id_usuario,
        "id_musica": 2,
        "tipo_like": 'DEFAULT',
    },
    {
        "id_usuario": id_usuario,
        "id_musica": 3,
        "tipo_like": 'DEFAULT',
    },
    {
        "id_usuario": id_usuario,
        "id_musica": 4,
        "tipo_like": 'DEFAULT',
    },
    {
        "id_usuario": id_usuario,
        "id_musica": 5,
        "tipo_like": 'DEFAULT',
    },
    {
        "id_usuario": id_usuario,
        "id_musica": 6,
        "tipo_like": 'DEFAULT',
    }
]

async function buscarLikes() {
    fetch(`/artistas/buscarLikes/${id_usuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO buscarLikes()!")

        if (resposta.ok) {
            console.log(resposta);
            console.log('Likes buscados com sucesso!')

            resposta.json().then(json => {
                let response = JSON.stringify(json);
                console.log(response);

                for (let i = 0; i < json.length; i++) {
                    let item = json[i];
                    let index = item.fk_musica - 1;

                    like_musicas[index].tipo_like = item.tipo_like;

                    if (item.tipo_like == 'LIKE') {
                        likes[index].classList.add('ativo');
                    } else if (item.tipo_like == 'DISLIKE') {
                        dislikes[index].classList.add('ativo');
                    }
                }
            });

        } else {

            console.log("Houve um erro ao tentar buscar os likes!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

async function cadastrarLikes(index) {
    fetch("/artistas/cadastrarLikes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like_musicas[index])
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log("Curtida cadastrada com sucesso");

        } else {
            validarSessao();
            throw "Houve um erro ao tentar cadastrar curtida!";
        }
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

buscarLikes();
for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener('click', () => {
        
        if (dislikes[i].classList.contains('ativo')) {
            dislikes[i].classList.remove('ativo');
        };
        likes[i].classList.toggle('ativo');
        
        like_musicas[i].tipo_like = likes[i].classList.contains('ativo') ? 'LIKE' : 'DEFAULT';
        cadastrarLikes(i)
    })
}

for (let i = 0; i < dislikes.length; i++) {
    dislikes[i].addEventListener('click', () => {

        if (likes[i].classList.contains('ativo')) {
            likes[i].classList.remove('ativo');
        };
        dislikes[i].classList.toggle('ativo');

        like_musicas[i].tipo_like = dislikes[i].classList.contains('ativo') ? 'DISLIKE' : 'DEFAULT';
        cadastrarLikes(i);

    })
}





