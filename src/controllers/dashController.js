var dashModel = require("../models/dashModel");

function buscarTentativas(req, res) {
  var id_usuario = req.params.id_usuario;

  dashModel.buscarTentativas(id_usuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(200).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as tentativas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarCorretas(req, res) {
  var id_usuario = req.params.id_usuario;

  dashModel.buscarCorretas(id_usuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(200).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as respostas corretas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarGeneros(req, res) {
  var id_usuario = req.params.id_usuario;

  dashModel.buscarGeneros(id_usuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os gêneros explorados: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarMusicas(req, res) {
  var id_usuario = req.params.id_usuario;

  dashModel.buscarMusicas(id_usuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as músicas explorads: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarEvolucao(req, res) {
    var id_usuario = req.params.id_usuario;

    dashModel.buscarEvolucao(id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar aos últimos registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPercentual(req, res) {
    var id_usuario = req.params.id_usuario;
    
    dashModel.buscarPercentual(id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar aos últimos registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function ranking(req, res) {

    dashModel.ranking().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar aos últimos registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
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