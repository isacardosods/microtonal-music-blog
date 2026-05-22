var database = require("../database/config")

function buscarLikes(id_usuario, id_musica, tipoLike) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRespostas():", id_usuario, id_musica, tipoLike);

        var instrucaoSql = `
        SELECT fk_usuario, fk_musica, tipo_like FROM like_musica WHERE fk_usuario = ${id_usuario};
    `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);

        console.log(`Buscando likes do usuário: ${id_usuario}`);
        console.log(instrucaoSql, [id_usuario]);
        return database.executar(instrucaoSql);

} 
module.exports = {
    buscarLikes
};