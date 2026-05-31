var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/buscarTentativas/:id_usuario", function (req, res) {
    dashController.buscarTentativas(req, res);
})

router.get("/buscarCorretas/:id_usuario", function (req, res) {
    dashController.buscarCorretas(req, res);
})

router.get("/buscarGeneros/:id_usuario", function (req, res) {
    dashController.buscarGeneros(req, res);
})

router.get("/buscarMusicas/:id_usuario", function (req, res) {
    dashController.buscarMusicas(req, res);
})

router.get("/buscarEvolucao/:id_usuario", function (req, res) {
    dashController.buscarEvolucao(req, res);
})

router.get("/buscarPercentual/:id_usuario", function (req, res) {
    dashController.buscarPercentual(req, res);
})

router.get("/ranking", function (req, res) {
    dashController.ranking(req, res);
})

module.exports = router;