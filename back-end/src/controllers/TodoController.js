const models = require('../models/TodoManager');

class TodoController {
  static getAll = (req, res) => {
    models.item
      .findAll()
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
