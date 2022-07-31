const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const TodoShema = {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};
const TodoModel = sequelize.define('todo', TodoShema);

module.exports = TodoModel;
