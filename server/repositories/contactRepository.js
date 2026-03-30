// repositories/contactRepository.js
const { Contact, Company } = require('../models');

const findAll = async () => {
  return Contact.findAll({
    include: [
      { model: Company, attributes: ['id', 'name', 'industry'] },
    ],
  });
};

const findById = async (id) => {
  return Contact.findByPk(id, {
    include: [
      { model: Company, attributes: ['id', 'name', 'industry'] },
    ],
  });
};

const findByCompanyId = async (companyId) => {
  return Contact.findAll({
    where: { company_id: companyId },
    include: [
      { model: Company, attributes: ['id', 'name', 'industry'] },
    ],
  });
};

const create = async (data) => {
  return Contact.create(data);
};

const update = async (id, data) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  return contact.update(data);
};

const remove = async (id) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.destroy();
  return true;
};

module.exports = {
  findAll,
  findById,
  findByCompanyId,
  create,
  update,
  remove,
};