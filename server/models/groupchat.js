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
        foreignKey: "CourseId",
        onDelete: "CASCADE",
      });
    }
  }
  Groupchat.init(
    {
      type: DataTypes.ENUM("Whatsapp", "Discord", "Instagram", "WeChat"),
      link: DataTypes.STRING,
      lecture: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Groupchat",
    }
  );
  return Groupchat;
};
