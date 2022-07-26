const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const TodoShema = {
  todo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false,
  },
};
const TodoModel = sequelize.define('Todo', TodoShema);

module.exports = TodoModel;
