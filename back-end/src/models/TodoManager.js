const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const TodoShema = {
  todo: {
    title: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    default: () => new Date(),
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
const TodoModel = sequelize.define('Todo', TodoShema);

module.exports = TodoModel;
