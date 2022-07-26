const express = require("express");

const  TodoController  = require("./controllers/TodoController");

const router = express.Router();

router.get("/todo", TodoController.getAll);

module.exports = router;
