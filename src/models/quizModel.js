var database = require("../database/config");

function cadastrarRespostas(id_usuario, id_resposta) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRespostas():", id_usuario, id_resposta);
    let inserts = [];

    for (let i = 0; i < id_resposta.length; i++) {
        let alternativa_acessada = id_resposta[i];

        var instrucaoSql = `
        INSERT INTO usuario_resposta (fk_usuario, fk_alternativa, correta, dt_resposta) VALUES 
        ('${id_usuario}', 
        '${alternativa_acessada.id_alternativa}',
            (SELECT correta FROM alternativa WHERE id_alternativa = ${alternativa_acessada.id_alternativa}),
            NOW()    
        );
    `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        inserts.push(database.executar(instrucaoSql));

        console.log("VALORES:", id_usuario, id_resposta);
        console.log(instrucaoSql);
    }

    //é utilizado para receber todos os inserts sem interromper a execução
    return Promise.all(inserts)
}

function buscarAlternativas(id_quiz) {
    var instrucaoSql = `
        SELECT 
            p.id_pergunta, 
            p.descricao AS pergunta,
            a.id_alternativa,
            a.descricao AS alternativa
        FROM pergunta AS p JOIN alternativa AS a
        ON a.fk_pergunta = p.id_pergunta
        ORDER BY id_pergunta, id_alternativa;
    `

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarRespostas,
    buscarAlternativas
};