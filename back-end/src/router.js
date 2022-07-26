const express = require('express');

const TodoController = require('./controllers/TodoController');

const router = express.Router();

router.post("/todo", TodoController.create);
router.get("/todo", TodoController.getAll);
router.put("/todo/:id", TodoController.updateOne);
router.get("/todo/:id", TodoController.getOne);



module.exports = router;
