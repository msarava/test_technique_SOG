const Todomodel = require('../models/TodoManager');

class TodoController {
  static getAll = async (req, res) => {
    Todomodel.findAll()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = TodoController;
