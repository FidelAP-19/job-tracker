import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/companies';

export const getAllCompanies = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getCompanyById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createCompany = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateCompany = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};