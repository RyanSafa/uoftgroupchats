"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groupchat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Groupchat.belongsTo(models.Course, {
        foreignKey: "courseId",
        onDelete: "CASCADE",
      });
      Groupchat.hasMany(models.Report);
    }
  }
  Groupchat.init(
    {
      type: {
        type: DataTypes.ENUM(
          "WhatsApp",
          "Discord",
          "Facebook Messenger",
          "Telegram",
          "Slack",
          "Instagram" // Add Instagram as a new option
        ),        
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      lecture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Groupchat",
    }
  );
  return Groupchat;
};
