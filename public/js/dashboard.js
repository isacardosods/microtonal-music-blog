const p = document.getElementById('bem_vindo').innerHTML = `Bem-vindo(a), ${sessionStorage.getItem('NOME_USUARIO')}`;
let id_usuario = sessionStorage.getItem('ID_USUARIO');

fetch(`/dashboard/buscarTentativas/${id_usuario}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (resposta) {
    console.log("ESTOU NO THEN DO buscarTentativas()!")

    if (resposta.ok) {
        console.log(resposta);
        console.log('Tentativas buscadas com sucesso!')

        resposta.json().then(json => {
            console.log(json)

            if (json.length == 0) {
                tentativas_value.innerHTML = 0;
            } else {
                tentativas_value.innerHTML = parseInt(json[0].qtd_tentativa);
            }
        });
    } else {

        console.log("Houve um erro ao tentar buscar as tentativas!");

        resposta.text().then(texto => {
            console.error(texto);
        });
    }

}).catch(function (erro) {
    console.log(erro);
})

fetch(`/dashboard/buscarCorretas/${id_usuario}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (resposta) {
    console.log("ESTOU NO THEN DO buscarCorretas()!")

    if (resposta.ok) {
        console.log(resposta);
        console.log('Respostas corretas buscadas com sucesso!')

        resposta.json().then(json => {
            if (json.length == 0) {
                corretas_value.innerHTML = 0;
            } else {
                corretas_value.innerHTML = parseInt(json[0].respostas_corretas);
            }
        });
    } else {

        console.log("Houve um erro ao tentar buscar as respostas corretas!");

        resposta.text().then(texto => {
            console.error(texto);
        });
    }

}).catch(function (erro) {
    console.log(erro);
})

fetch(`/dashboard/buscarGeneros/${id_usuario}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (resposta) {
    console.log("ESTOU NO THEN DO buscarGeneros()!")

    if (resposta.ok) {
        console.log(resposta);
        console.log('Gêneros buscados com sucesso!')

        resposta.json().then(json => {
            console.log(json)

            generos_porcentagem.innerHTML = `${json[0].porcentagem}%`;
        });
    } else {

        console.log("Houve um erro ao tentar buscar os gêneros!");

        resposta.text().then(texto => {
            console.error(texto);
        });
    }

}).catch(function (erro) {
    console.log(erro);
})

fetch(`/dashboard/buscarMusicas/${id_usuario}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (resposta) {
    console.log("ESTOU NO THEN DO buscarMusicas()!")

    if (resposta.ok) {
        console.log(resposta);
        console.log('Músicas buscados com sucesso!')

        resposta.json().then(json => {
            console.log(json)

            musicas_porcentagem.innerHTML = `${json[0].porcentagem}%`;
        });
    } else {

        console.log("Houve um erro ao tentar buscar as músicas exploradas!");

        resposta.text().then(texto => {
            console.error(texto);
        });
    }

}).catch(function (erro) {
    console.log(erro);
})

//gráficos
function buscarEvolucao(id_usuario) {
    console.log("ID DO FETCH:", id_usuario);

    fetch(`/dashboard/buscarEvolucao/${id_usuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    ).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                plotarEvolucao(resposta, id_usuario);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarEvolucao* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
function plotarEvolucao(resposta, id_usuario) {
    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let line_label = [];

    // Criando estrutura para plotar gráfico - dados
    let line_data = {
        labels: line_label,
        datasets: [{
            label: 'Respostas corretas',
            data: [],
            borderColor: '#f2c200',
            backgroundColor: '#f2c200',
            borderWidth: 4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#E6B800',
            tension: 0.4,
            fill: false
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "buscarEvolucao" e passados para "plotarEvolucao":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        line_label.push(registro.tentativa);
        line_data.datasets[0].data.push(registro.respostas_corretas);
    }

    // Criando estrutura para plotar gráfico - config
    const line_config = {
        type: 'line',
        data: line_data,
        responsive: true,
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Respostas corretas'
                    },
                    max: 12,
                    min: 0,
                    grid: {
                        color: 'rgba(255,255,255,0.08)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tentativa'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let line_chart = new Chart(
        document.getElementById(`grafico_line`),
        line_config
    );
}

//gráficos
function buscarPercentual(id_usuario) {

    fetch(`/dashboard/buscarPercentual/${id_usuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    ).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                plotarPercentual(resposta, id_usuario);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarPercentual* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
function plotarPercentual(resposta, id_usuario) {
    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let donut_label = [
        'Acertos',
        'Erros'
    ];

    // Criando estrutura para plotar gráfico - dados
    let donut_data = {
        labels: donut_label,
        datasets: [{
            label: 'Percentual ',
            backgroundColor: ['#f2c200', '#000000'],
            borderColor: ['#f2c200', '#000000'],
            data: [],
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "buscarPercentual" e passados para "plotarPercentual":')
    console.log('RESPOSTA OBTIDA:', resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        donut_data.datasets[0].data.push(registro.acertos);
        donut_data.datasets[0].data.push(registro.erros);
    }

    // Criando estrutura para plotar gráfico - config
    let donut_config = {
        type: 'doughnut',
        data: donut_data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: '#ffffff',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: (value, context) => {
                        const data = context.chart.data.datasets[0].data;
                        const total = data.reduce((acc, val) => acc + val, 0);
                        const porcentagem = (value / total * 100).toFixed(1);
                        return porcentagem + '%';
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    };

    // Adicionando gráfico criado em div na tela
    let donut_chart = new Chart(
        document.getElementById(`grafico_donut`),
        donut_config
    );
}


// buscarEvolucao(id_usuario)
window.onload = () => {
    buscarEvolucao(id_usuario)
    buscarPercentual(id_usuario)
}