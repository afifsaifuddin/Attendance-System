"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Salary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.History, { foreignKey: "salaryId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Salary.init(
    {
      userId: DataTypes.INTEGER,
      totalSalary: DataTypes.INTEGER,
      salaryCuts: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Salary",
    }
  );
  return Salary;
};
