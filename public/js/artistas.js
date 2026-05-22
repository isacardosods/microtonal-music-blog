const left_arrow = document.getElementById('left');
const right_arrow = document.getElementById('right');
const albuns = document.querySelectorAll('.album');
const likes = document.querySelectorAll('.like');
const dislikes = document.querySelectorAll('.dislike');

let contador = 0;
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

let like_musicas = [
    {
        "id_musica": 1,
        "id_usuario": sessionStorage.getItem('ID_USUARIO'),
        "tipo_like": 'DEFAULT',
        "salvo": false
    },
    {
        "id_musica": 2,
        "id_usuario": sessionStorage.getItem('ID_USUARIO'),
        "tipo_like": 'DEFAULT',
        "salvo": false
    },
    {
        "id_musica": 3,
        "id_usuario": sessionStorage.getItem('ID_USUARIO'),
        "tipo_like": 'DEFAULT',
        "salvo": false
    },
    {
        "id_musica": 4,
        "id_usuario": sessionStorage.getItem('ID_USUARIO'),
        "tipo_like": 'DEFAULT',
        "salvo": false
    },
    {
        "id_musica": 5,
        "id_usuario": sessionStorage.getItem('ID_USUARIO'),
        "tipo_like": 'DEFAULT',
        "salvo": false
    },
    {
        "id_musica": 6,
        "id_usuario": sessionStorage.getItem('ID_USUARIO'),
        "tipo_like": 'DEFAULT',
        "salvo": false
    }
]

for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener('click', () => {
        if (dislikes[i].classList.contains('ativo')) {
            dislikes[i].classList.remove('ativo');
        };
        likes[i].classList.toggle('ativo');

        like_musicas[i].tipo_like = likes[i].classList.contains('ativo') ? 'LIKE' : 'DEFAULT';

    })
}

for (let i = 0; i < dislikes.length; i++) {
    dislikes[i].addEventListener('click', () => {

        if (likes[i].classList.contains('ativo')) {
            likes[i].classList.remove('ativo');
        };
        dislikes[i].classList.toggle('ativo');

        like_musicas[i].tipo_like = dislikes[i].classList.contains('ativo') ? 'DISLIKE' : 'DEFAULT';
    })

}


