const Todomodel = require('../models/TodoManager');
Todomodel.sync();

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
  static getOne = async (req, res) => {
    const { id } = req.params;
    Todomodel.findOne({
      where: { id: id },
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  static create = async (req, res) => {
    const { title, description } = req.body;
    await Todomodel.create({ title, description })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  static updateOne = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, isDone } = req.body;
    await Todomodel.update(
      { title, description, dueDate, isDone },
      {
        where: { id: id },
      }
    )
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
