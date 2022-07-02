"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Report.belongsTo(models.Groupchat, {
        foreignKey: "groupchatId",
        onDelete: "CASCADE",
      });
    }
  }
  Report.init(
    {
      reason: {
        type: DataTypes.ENUM(
          "Dead or expired link.",
          "Malicious or irrelevant link.",
          "Duplicate link."
        ),
        allowNull: false,
      },

      groupchatId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Report",
    }
  );
  return Report;
};
