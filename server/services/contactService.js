// services/contactService.js
const contactRepository = require('../repositories/contactRepository');

const getAllContacts = async () => {
  return contactRepository.findAll();
};

const getContactById = async (id) => {
  const contact = await contactRepository.findById(id);
  if (!contact) {
    const error = new Error('Contact not found');
    error.status = 404;
    throw error;
  }
  return contact;
};

const getContactsByCompany = async (companyId) => {
  return contactRepository.findByCompanyId(companyId);
};

const createContact = async (data) => {
  const { name, company_id } = data;
  if (!name || !company_id) {
    const error = new Error('name and company_id are required');
    error.status = 400;
    throw error;
  }
  return contactRepository.create(data);
};

const updateContact = async (id, data) => {
  const contact = await contactRepository.update(id, data);
  if (!contact) {
    const error = new Error('Contact not found');
    error.status = 404;
    throw error;
  }
  return contact;
};

const deleteContact = async (id) => {
  const result = await contactRepository.remove(id);
  if (!result) {
    const error = new Error('Contact not found');
    error.status = 404;
    throw error;
  }
  return { message: 'Contact deleted successfully' };
};

module.exports = {
  getAllContacts,
  getContactById,
  getContactsByCompany,
  createContact,
  updateContact,
  deleteContact,
};