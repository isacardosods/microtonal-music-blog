var artistaModel = require("../models/artistaModel");

function buscarLikes(req, res) {
    var id_usuario = req.params.id_usuario; 

    if (!id_usuario) {
        return res.status(400).send("Você não está logado!");
    }

    artistaModel.buscarLikes(id_usuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarLikes,
    // cadastrarLikes
}