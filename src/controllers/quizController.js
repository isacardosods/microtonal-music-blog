var quizModel = require("../models/quizModel");

function cadastrarRespostas(req, res) {
    var id_usuario = req.body.id_usuario;
    var id_resposta = req.body.respostas;

    if (id_usuario == undefined) {
        res.status(400).send("Você não está logado");
    } else if (id_resposta == undefined) {
        res.status(400).send("Sua resposta está indefinida!");
    } else {
        quizModel.cadastrarRespostas(id_usuario, id_resposta)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro das respostas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrarRespostas
}