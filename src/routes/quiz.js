var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/cadastrarRespostas", function (req, res) {
    quizController.cadastrarRespostas(req, res);
})

router.get("/buscarAlternativas", function (req, res) {
    quizController.buscarAlternativas(req, res);
})


module.exports = router;