const left_arrow = document.getElementById('left');
const right_arrow = document.getElementById('right');
const albuns = document.querySelectorAll('.album');
const likes = document.querySelectorAll('.like');
const dislikes = document.querySelectorAll('.dislike');

let contador = 0;
let id_usuario = sessionStorage.getItem('ID_USUARIO');
albuns[0].style.display = 'flex';

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

async function cadastrarLikes() {
    fetch("/artistas/cadastrarLikes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like_musicas)
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log("Curtida cadastrada com sucesso");

        } else {
            throw "Houve um erro ao tentar cadastrar curtida!";
        }
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

buscarLikes();

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

for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener('click', () => {
        if (dislikes[i].classList.contains('ativo')) {
            dislikes[i].classList.remove('ativo');
        };
        likes[i].classList.toggle('ativo');

        like_musicas[i].tipo_like = likes[i].classList.contains('ativo') ? 'LIKE' : 'DEFAULT';
        cadastrarLikes()

    })
}

for (let i = 0; i < dislikes.length; i++) {
    dislikes[i].addEventListener('click', () => {

        if (likes[i].classList.contains('ativo')) {
            likes[i].classList.remove('ativo');
        };
        dislikes[i].classList.toggle('ativo');

        like_musicas[i].tipo_like = dislikes[i].classList.contains('ativo') ? 'DISLIKE' : 'DEFAULT';
        cadastrarLikes();

    })

}





