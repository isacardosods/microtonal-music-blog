var quizModel = require("../models/quizModel");

function cadastrarRespostas(req, res){
    var id_usuario = req.body.id_usuario;
    var id_respostas = req.body.respostas;
}

    if (id_usuario == undefined) {
        res.status(400).send("Você não está logado");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

    }

module.exports = {
    cadastrarRespostas
}