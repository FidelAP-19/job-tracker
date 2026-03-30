// repositories/companyRepository.js
const { Company, Application, Contact } = require('../models');

const findAll = async () => {
  return Company.findAll();
};

const findById = async (id) => {
  return Company.findByPk(id, {
    include: [
      { model: Application, attributes: ['id', 'role_title', 'status', 'date_applied'] },
      { model: Contact, attributes: ['id', 'name', 'role', 'email'] },
    ],
  });
};

const create = async (data) => {
  return Company.create(data);
};

const update = async (id, data) => {
  const company = await Company.findByPk(id);
  if (!company) return null;
  return company.update(data);
};

const remove = async (id) => {
  const company = await Company.findByPk(id);
  if (!company) return null;
  await company.destroy();
  return true;
};

const findByIndustry = async (industry) => {
  return Company.findAll({
    where: { industry },
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  findByIndustry,
};