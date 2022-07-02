const { Report, Groupchat } = require("../models");
const { Sequelize } = require("sequelize");
const createReport = async (req, res, next) => {
  const DELETE_THRESHOLD = 3;
  const { reason, groupchatId } = req.body;
  try {
    const report = await Report.create({ reason, groupchatId });
    const groupchats = await Groupchat.findAll({
      raw: true,
      attributes: [
        "id",
        [Sequelize.fn("COUNT", Sequelize.col("reports.id")), "reportCount"],
      ],
      include: [
        {
          model: Report,
          attributes: [],
        },
      ],
      group: ["Groupchat.id"],
    });
    let deleted = false;
    if (groupchats[0].reportCount >= DELETE_THRESHOLD) {
      await Groupchat.destroy({
        where: { id: groupchats[0].id },
      });
      deleted = true;
    }
    return res.send({ deleted, ...report });
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
