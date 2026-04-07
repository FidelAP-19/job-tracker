import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/interview-rounds`;

export const getAllRounds = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getRoundsByApplication = async (applicationId) => {
  const response = await axios.get(`${BASE_URL}/application/${applicationId}`);
  return response.data;
};

export const createRound = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateRound = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteRound = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const getUpcomingInterviews = async () => {
  const response = await axios.get(`${BASE_URL}/analytics/upcoming`);
  return response.data;
};