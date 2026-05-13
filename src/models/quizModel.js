function cadastrarRespostas(id_usuario, id_resposta) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRespostas():", id_usuario, id_resposta);
    
    var instrucaoSql = `
        INSERT INTO usuario_resposta (fk_usuario, fk_resposta) VALUES ('${id_usuario}', '${id_resposta}'');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

    console.log("VALORES:", id_usuario, id_resposta);
    console.log(instrucaoSql);
}

module.exports = {
    cadastrarRespostas
};