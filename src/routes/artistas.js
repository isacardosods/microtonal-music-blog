var express = require("express");
var router = express.Router();

var artistaController = require("../controllers/artistaController");

router.get("/buscarLikes/:id_usuario", function (req, res) {
    artistaController.buscarLikes(req, res);
})

router.post("/cadastrarLikes", function (req, res) {
    artistaController.cadastrarLikes(req, res);
});

module.exports = router;