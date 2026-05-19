function cadastrarRespostas(id_usuario, id_resposta) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRespostas():", id_usuario, id_resposta);
    let inserts = [];

    for (let i = 0; i < id_resposta.length; i++) {
        let alternativa_acessada = id_resposta[i];

        var instrucaoSql = `
        INSERT INTO usuario_resposta (fk_usuario, fk_resposta, correta, dt_resposta) VALUES 
        ('${id_usuario}', 
        '${alternativa_acessada.id_alternativa}',
            (SELECT correta FROM alternativa_tb WHERE id_resposta = ${alternativa_acessada.id_alternativa}),
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
module.exports = {
    cadastrarRespostas
};