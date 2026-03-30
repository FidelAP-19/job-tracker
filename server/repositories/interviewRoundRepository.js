const { InterviewRound, Application } = require('../models');

const findAll = async () => {
  return InterviewRound.findAll({
    include: [
      { model: Application, attributes: ['id', 'role_title', 'status'] },
    ],
  });
};

const findById = async (id) => {
  return InterviewRound.findByPk(id, {
    include: [
      { model: Application, attributes: ['id', 'role_title', 'status'] },
    ],
  });
};

const findByApplicationId = async (applicationId) => {
  return InterviewRound.findAll({
    where: { application_id: applicationId },
    include: [
      { model: Application, attributes: ['id', 'role_title', 'status'] },
    ],
  });
};

const findUpcoming = async () => {
  const { Op } = require('sequelize');
  const now = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(now.getDate() + 7);

  return InterviewRound.findAll({
    where: {
      scheduled_date: {
        [Op.between]: [now, sevenDaysFromNow],
      },
    },
    include: [
      { model: Application, attributes: ['id', 'role_title', 'status'] },
    ],
  });
};

const create = async (data) => {
  return InterviewRound.create(data);
};

const update = async (id, data) => {
  const round = await InterviewRound.findByPk(id);
  if (!round) return null;
  return round.update(data);
};

const remove = async (id) => {
  const round = await InterviewRound.findByPk(id);
  if (!round) return null;
  await round.destroy();
  return true;
};

module.exports = {
  findAll,
  findById,
  findByApplicationId,
  findUpcoming,
  create,
  update,
  remove,
};