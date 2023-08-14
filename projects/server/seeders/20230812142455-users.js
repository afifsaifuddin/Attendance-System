"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Admin",
          email: "admin@gmail.com",
          username: "admin",
          password:
            "$2a$10$nYAuCtBRY0rF7rfcU58ME.yeRBy.NWzJP7eVyC08vo/VFLwzP0PnS",
          birthday: new Date(1998, 7, 26),
          roleId: 1,
          baseSalary: 5000000,
          isLogin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
