var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/buscarLikes", function (req, res) {
    usuarioController.buscarLikes(req, res);
})

router.post("/cadastrarLikes", function (req, res) {
    usuarioController.cadastrarLikes(req, res);
});

module.exports = router;