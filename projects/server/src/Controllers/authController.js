const db = require("../../models");
const user = db.User;
const role = db.Role;
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const handlebars = require("handlebars");

const authController = {
  getAccount: async (req, res) => {
    try {
      const account = await user.findAll();
      return res.status(200).json({ message: "success", account });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getRole: async (req, res) => {
    try {
      const account = await role.findAll();
      return res.status(200).json({ message: "Role", account });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkLogin = await user.findOne({
        where: { email },
        include: { model: db.Role, attributes: ["role"] },
      });
      if (!checkLogin)
        return res.status(404).json({ message: "Account Not Defined" });
      const checkPassword = await bcrypt.compare(password, checkLogin.password);
      if (!checkPassword)
        return res.status(500).json({ message: "Invalid Password" });
      let payload = {
        id: checkLogin.id,
        email: checkLogin.email,
        roleId: checkLogin.roleId,
        fullName: checkLogin.fullName,
        username: checkLogin.username,
      };
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "3h" });
      checkLogin.isLogin = true;
      await checkLogin.save();
      return res
        .status(200)
        .json({ message: "Login Success", Account: checkLogin, token: token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  keepLogin: async (req, res) => {
    try {
      const { id } = req.user;
      const findUser = await user.findOne({
        where: { id },
        include: { model: db.Role, attributes: ["role"] },
      });
      return res.status(200).json({ message: "Keep Login", findUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
