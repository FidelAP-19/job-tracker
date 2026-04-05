import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/applications';

export const getAllApplications = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getApplicationById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createApplication = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateApplication = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const getStatusBreakdown = async () => {
  const response = await axios.get(`${BASE_URL}/analytics/status-breakdown`);
  return response.data;
};

export const getSuccessRate = async () => {
  const response = await axios.get(`${BASE_URL}/analytics/success-rate`);
  return response.data;
};

export const getResponseRate = async () => {
  const response = await axios.get(`${BASE_URL}/analytics/response-rate`);
  return response.data;
};

export const getApplicationsPerWeek = async () => {
  const response = await axios.get(`${BASE_URL}/analytics/per-week`);
  return response.data;
};

export const getMostAppliedIndustries = async () => {
  const response = await axios.get(`${BASE_URL}/analytics/top-industries`);
  return response.data;
};