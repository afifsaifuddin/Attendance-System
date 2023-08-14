"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Salary, { foreignKey: "salaryId" });
    }
  }
  History.init(
    {
      userId: DataTypes.INTEGER,
      salaryId: DataTypes.INTEGER,
      clockIn: DataTypes.DATE,
      clockOut: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      hourlyWork: DataTypes.FLOAT,
      daySalary: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      cuts: DataTypes.INTEGER,
      isOvertime: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "History",
      createdAt: "clockIn",
    }
  );
  return History;
};
