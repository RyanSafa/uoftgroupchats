"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Groupchats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM(
          "WhatsApp",
          "Discord",
          "Instagram",
          "WeChat",
          "Facebook Messenger"
        ),
      },
      link: {
        type: Sequelize.STRING,
      },
      lecture: {
        type: Sequelize.STRING,
      },
      courseId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Courses",
          key: "id",
          as: "groupchatId",
        },
      },
      createdAt: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Groupchats");
  },
};
