var database = require("../database/config");

function buscarTentativas(id_usuario) {
  var instrucaoSql = `
    SELECT
	    fk_usuario AS usuario_id,
      COUNT(id_tentativa)/10 AS qtd_tentativa
    FROM usuario_resposta
    WHERE fk_usuario = ${id_usuario}
    GROUP BY usuario_id;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarCorretas(id_usuario) {
  var instrucaoSql = `
  SELECT 
	  COUNT(correta) AS respostas_corretas
  FROM usuario_resposta
  WHERE correta = 1 
  GROUP BY fk_usuario
  HAVING fk_usuario IN (
	  SELECT 
		  usuario.id_usuario
	  FROM usuario
	  WHERE id_usuario = ${id_usuario}
);`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarGeneros(id_usuario) {
  var instrucaoSql = `
SELECT 
	ROUND((COUNT(DISTINCT fk_genero) * 100) / 
	(
		SELECT
			COUNT(DISTINCT id_genero) AS generos_curtidos
		FROM genero
	), 1) AS porcentagem
FROM genero_entidades
JOIN artista
ON genero_entidades.fk_artista = artista.id_artista
JOIN album
ON album.fk_artista = artista.id_artista
JOIN musica 
ON musica.fk_album= album.id_album
JOIN like_musica
ON like_musica.fk_musica = musica.id_musica
WHERE tipo_like != 'DEFAULT' AND like_musica.fk_usuario = ${id_usuario};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMusicas(id_usuario) {
  var instrucaoSql = `
SELECT 
	ROUND(COUNT(fk_musica) * 100 / 
	(
	SELECT 
		COUNT(id_musica)
	FROM musica
	), 1) AS porcentagem
FROM like_musica
WHERE tipo_like != 'DEFAULT' AND fk_usuario = ${id_usuario};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

//para essa query, foi necessário consultar essa documentação: https://medium.com/lets-data/desvendando-o-poder-das-window-functions-em-sql-para-estudantes-de-ci%C3%AAncia-de-dados-71b65ec9962d
//a subquery usa a função ROW_NUMBER() que busca todas as respostas do usuário 
// e numera cada linha em ordem! (evitando de pegar por exemplo tentativas 1, 2 e 5 dependendo da ordem dos registros)
//depois disso a função ceil arredonda para cima e depois divide por 10, passando a considerar 10 registros como 1 tentativa
//gambiarrinha :)
function buscarEvolucao(id_usuario) {
  var instrucaoSql = `
SELECT
    CEIL(row_num / 10) AS tentativa,
    SUM(correta) AS respostas_corretas
FROM (
    SELECT
        correta,
        ROW_NUMBER() OVER (PARTITION BY fk_usuario ORDER BY id_tentativa) AS row_num
    FROM usuario_resposta
    WHERE fk_usuario = ${id_usuario}
) AS tentativas
GROUP BY tentativa
ORDER BY tentativa;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPercentual(id_usuario) {
  var instrucaoSql = `
SELECT
    COUNT(CASE WHEN correta = 1 THEN 1 END) AS acertos,
    COUNT(CASE WHEN correta = 0 THEN 1 END) AS erros
FROM usuario_resposta
WHERE fk_usuario = ${id_usuario};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function ranking() {
  var instrucaoSql = `
SELECT
	usuario.nome AS nome_usuario,
	COUNT(correta) AS respostas_corretas
FROM usuario_resposta JOIN usuario
ON fk_usuario = id_usuario
WHERE correta = 1 
GROUP BY fk_usuario
ORDER BY respostas_corretas DESC LIMIT 10;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarTentativas,
  buscarCorretas,
  buscarGeneros,
  buscarMusicas,
  buscarEvolucao,
  buscarPercentual,
  ranking
}
