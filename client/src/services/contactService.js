import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/contacts`;

export const getAllContacts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getContactById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createContact = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateContact = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};