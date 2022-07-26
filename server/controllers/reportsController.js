const { Report, Groupchat } = require("../models");
const { Sequelize } = require("sequelize");
const createReport = async (req, res, next) => {
  const DELETE_THRESHOLD = 3;
  const { reason, groupchatId } = req.body;
  try {
    const report = await Report.create({ reason, groupchatId });
    return res.send(report);
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      next({ status: 400, message: "Invalid groupchatId" });
    } else {
      next({ status: 500, message: "" });
    }
  }
};

module.exports = {
  createReport,
};
