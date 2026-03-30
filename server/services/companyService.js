// services/companyService.js
const companyRepository = require('../repositories/companyRepository');

// --- CRUD ---

const getAllCompanies = async () => {
  return companyRepository.findAll();
};

const getCompanyById = async (id) => {
  const company = await companyRepository.findById(id);
  if (!company) {
    const error = new Error('Company not found');
    error.status = 404;
    throw error;
  }
  return company;
};

const createCompany = async (data) => {
  const { name } = data;
  if (!name) {
    const error = new Error('Company name is required');
    error.status = 400;
    throw error;
  }
  return companyRepository.create(data);
};

const updateCompany = async (id, data) => {
  const company = await companyRepository.update(id, data);
  if (!company) {
    const error = new Error('Company not found');
    error.status = 404;
    throw error;
  }
  return company;
};

const deleteCompany = async (id) => {
  const result = await companyRepository.remove(id);
  if (!result) {
    const error = new Error('Company not found');
    error.status = 404;
    throw error;
  }
  return { message: 'Company deleted successfully' };
};

const getCompaniesByIndustry = async (industry) => {
  if (!industry) {
    const error = new Error('Industry is required');
    error.status = 400;
    throw error;
  }
  return companyRepository.findByIndustry(industry);
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompaniesByIndustry,
};