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
    const { title, description, dueDate, note } = req.body;
    await Todomodel.create({ title, description, dueDate, note })
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
    const { title, description, dueDate, isDone, note } = req.body;
    await Todomodel.update(
      { title, description, dueDate, isDone, note },
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
  static deleteOne = async (req, res) => {
    const { id } = req.params;
    await Todomodel.destroy({
      where: { id: id },
    })
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = TodoController;
