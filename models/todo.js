"use strict";
const { Model , Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static getTodos(){
      return this.findAll();
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      //return a list of overdue items
      //return a list "[items..]" item.duedate < presnt
      //return an array of all tuples/items of that table where(conditon)
      const overdues = await Todo.findAll({
        where:{
          dueDate:{
            [Op.lt]:new Date()
          }
        }
      });
      return overdues
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const dueTodays = await Todo.findAll({
        where:{
          dueDate:{
            [Op.eq]:new Date()
          }
        }
      });
      return dueTodays
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const duelaters = await Todo.findAll({
        where:{
          dueDate:{
            [Op.gt]:new Date()
          }
        }
      });
      return duelaters
    }
    

    markAsCompleted() {
      return this.update({ completed: true });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
