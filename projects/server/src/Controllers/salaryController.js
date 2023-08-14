const db = require("../../models");
const user = db.User;
const hs = db.History;
const sl = db.Salary;
const { Op } = require("sequelize");

const salaryController = {
  employeeSalary: async (req, res) => {
    try {
      const { id } = req.user;
      const findHistory = await hs.findOne({
        where: { userId: id, clockIn: { [Op.ne]: null } },
        order: [["clockIn", "DESC"]],
      });
      if (!findHistory)
        return res.status(404).json({ message: "No history working found" });
      const today = findHistory.clockIn;
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      const historyRecords = await hs.findAll({
        where: {
          userId: id,
          month: currentMonth,
          updatedAt: {
            [Op.between]: [
              new Date(currentYear, currentMonth - 1, 1),
              new Date(currentYear, currentMonth, 0),
            ],
          },
        },
      });
      let TotalSalary = 0;
      let salaryCuts = 0;
      historyRecords.forEach((history) => {
        TotalSalary += history.daySalary;
        salaryCuts += history.cuts;
      });
      const existingSalary = await sl.findOne({
        where: { userId: id, month: currentMonth, year: currentYear },
      });
      if (existingSalary) {
        existingSalary.totalSalary = TotalSalary;
        existingSalary.salaryCuts = salaryCuts;
        await existingSalary.save();
      } else {
        await sl.create({
          userId: id,
          month: currentMonth,
          year: currentYear,
          totalSalary: TotalSalary,
          salaryCuts: salaryCuts,
        });
      }
      return res.status(200).json({ message: "Salary Calculation Success" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getSalary: async (req, res) => {
    try {
      const { id } = req.user;
      const respon = await sl.findAll({
        where: { userId: id },
      });
      return res.status(200).json({ message: "Salary", respon });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = salaryController;
