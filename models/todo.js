"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
      });
      // define association here
    }

    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userId,
      });
    }

    static getTodos() {
      return this.findAll();
    }

    static async overdue(userId) {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      //return a list of overdue items
      //return a list "[items..]" item.duedate < presnt
      //return an array of all tuples/items of that table where(conditon)
      const overdues = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
          userId,
          completed: false,
        },
      });
      return overdues;
    }

    static async dueToday(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const dueTodays = await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
          userId,
          completed: false,
        },
      });
      return dueTodays;
    }

    static async dueLater(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const duelaters = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
          userId,
          completed: false,
        },
      });
      return duelaters;
    }

    static async completedItems(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const completeditems = await Todo.findAll({
        where: {
          completed: true,
          userId,
        },
      });
      return completeditems;
    }

    static async remove(id, userId) {
      return this.destroy({
        where: {
          id,
          userId,
        },
      });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
    setCompletionStatus(s) {
      return this.update({ completed: s });
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
