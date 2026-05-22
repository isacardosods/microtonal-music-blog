const left_arrow = document.getElementById('left');
const right_arrow = document.getElementById('right');
const albuns = document.querySelectorAll('.album');


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
