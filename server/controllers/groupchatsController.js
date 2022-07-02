const { Groupchat } = require("../models");

const createGroupchat = async (req, res, next) => {
  try {
    const { type, link, lecture, courseId } = req.body;

    const groupchat = await Groupchat.create({
      type,
      link,
      lecture,
      courseId,
    });
    return res.send(groupchat);
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      next({ stats: 400, message: "Invalid courseId" });
    } else {
      next({ status: 500, message: "" });
    }
  }
};

module.exports = {
  createGroupchat,
};
