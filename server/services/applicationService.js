const applicationRepository = require('../repositories/applicationRepository');

// --- CRUD Operations ---

const getAllApplications = async () => {
  return applicationRepository.findAll();
};

const getApplicationById = async (id) => {
  const application = await applicationRepository.findById(id);
  if (!application) {
    const error = new Error('Application not found');
    error.status = 404;
    throw error;
  }
  return application;
};

const createApplication = async (data) => {
  const { role_title, status, date_applied, user_id, company_id } = data;

  if (!role_title || !date_applied || !user_id || !company_id) {
    const error = new Error('role_title, date_applied, user_id, and company_id are required');
    error.status = 400;
    throw error;
  }

  return applicationRepository.create(data);
};

const updateApplication = async (id, data) => {
  const application = await applicationRepository.update(id, data);
  if (!application) {
    const error = new Error('Application not found');
    error.status = 404;
    throw error;
  }
  return application;
};

const deleteApplication = async (id) => {
  const result = await applicationRepository.remove(id);
  if (!result) {
    const error = new Error('Application not found');
    error.status = 404;
    throw error;
  }
  return { message: 'Application deleted successfully' };
};

const getApplicationsByUser = async (userId) => {
  return applicationRepository.findByUserId(userId);
};

// --- Analytics ---

const getStatusBreakdown = async () => {
  const applications = await applicationRepository.findAll();

  // Count how many applications exist per status
  const breakdown = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return breakdown;
};

const getSuccessRate = async () => {
  const applications = await applicationRepository.findAll();
  const total = applications.length;
  if (total === 0) return { successRate: 0, total: 0, offers: 0 };

  const offers = applications.filter(app => app.status === 'Offer').length;
  const successRate = ((offers / total) * 100).toFixed(1);

  return { successRate: parseFloat(successRate), total, offers };
};

const getResponseRate = async () => {
  const applications = await applicationRepository.findAll();
  const total = applications.length;
  if (total === 0) return { responseRate: 0, total: 0, responded: 0 };

  // Response = anything that moved past 'Applied'
  const responded = applications.filter(app => app.status !== 'Applied').length;
  const responseRate = ((responded / total) * 100).toFixed(1);

  return { responseRate: parseFloat(responseRate), total, responded };
};

const getApplicationsPerWeek = async () => {
  const applications = await applicationRepository.findAll();

  // Group applications by the week they were submitted
  const perWeek = applications.reduce((acc, app) => {
    const date = new Date(app.date_applied);

    // Get the Monday of the week this application falls in
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    const weekKey = monday.toISOString().split('T')[0]; // "2024-03-11"

    acc[weekKey] = (acc[weekKey] || 0) + 1;
    return acc;
  }, {});

  // Convert to sorted array for easy charting on the frontend
  return Object.entries(perWeek)
    .map(([week, count]) => ({ week, count }))
    .sort((a, b) => new Date(a.week) - new Date(b.week));
};

const getMostAppliedIndustries = async () => {
  const applications = await applicationRepository.findAll();

  const industryCounts = applications.reduce((acc, app) => {
    const industry = app.Company?.industry || 'Unknown';
    acc[industry] = (acc[industry] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(industryCounts)
    .map(([industry, count]) => ({ industry, count }))
    .sort((a, b) => b.count - a.count);
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicationsByUser,
  getStatusBreakdown,
  getSuccessRate,
  getResponseRate,
  getApplicationsPerWeek,
  getMostAppliedIndustries,
};