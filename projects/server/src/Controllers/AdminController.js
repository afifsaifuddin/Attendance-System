const db = require("../../models");
const user = db.User;
const role = db.Role;
const path = require("path");
const handlebars = require("handlebars");
const transporter = require("../../helpers/transporter");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AdminController = {
  createEmployee: async (req, res) => {
    try {
      const { email, roleId, baseSalary } = req.body;
      if (!email || !roleId || !baseSalary)
        return res.status(500).json({ message: "Data is not complete" });
      const checkEmail = await user.findOne({
        where: { email },
      });
      if (checkEmail)
        return res.status(500).json({ message: "Email Already Exist" });
      await db.sequelize.transaction(async (t) => {
        const result = await user.create(
          { email, roleId, baseSalary },
          { transaction: t }
        );
        let payload = {
          id: result.id,
          email: result.email,
          roleId: result.roleId,
        };
        const token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        const redirect = `http://localhost:3000/auth/${token}`;
        const data = await fs.readFile(
          path.resolve(__dirname, "../emails/registEmployee.html"),
          "utf-8"
        );
        const tempCompile = handlebars.compile(data);
        const tempResult = tempCompile({ email, redirect });
        await transporter.sendMail({
          to: email,
          html: tempResult,
        });
        return res
          .status(200)
          .json({ message: "Check your email", token: token });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  employeeForm: async (req, res) => {
    try {
      const { password, fullName, username, birthday } = req.body;
      if (!password || !fullName || !username || !birthday)
        return res.status(500).json({ message: "Data is not complete" });
      db.sequelize.transaction(async (t) => {
        const findUser = await user.findByPk(req.user.id);
        console.log("user", req.user.id);
        if (!findUser)
          return res.status(500).json({ message: "User not found" });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        findUser.password = hashPassword;
        findUser.fullName = fullName;
        findUser.username = username;
        findUser.birthday = birthday;
        await findUser.save(), { transaction: t };
        return res.status(200).json({ message: "Success" });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = AdminController;
