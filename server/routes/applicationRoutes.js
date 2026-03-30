const express = require('express');
const router = express.Router();
const applicationService = require('../services/applicationService');

// --- CRUD Routes ---

// GET /api/applications — get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await applicationService.getAllApplications();
    res.json(applications);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/applications/:id — get a single application by id
router.get('/:id', async (req, res) => {
  try {
    const application = await applicationService.getApplicationById(req.params.id);
    res.json(application);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// POST /api/applications — create a new application
router.post('/', async (req, res) => {
  try {
    const application = await applicationService.createApplication(req.body);
    res.status(201).json(application);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// PUT /api/applications/:id — update an existing application
router.put('/:id', async (req, res) => {
  try {
    const application = await applicationService.updateApplication(req.params.id, req.body);
    res.json(application);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// DELETE /api/applications/:id — delete an application
router.delete('/:id', async (req, res) => {
  try {
    const result = await applicationService.deleteApplication(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/applications/user/:userId — get all applications for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const applications = await applicationService.getApplicationsByUser(req.params.userId);
    res.json(applications);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// --- Analytics Routes ---

// GET /api/applications/analytics/status-breakdown
router.get('/analytics/status-breakdown', async (req, res) => {
  try {
    const breakdown = await applicationService.getStatusBreakdown();
    res.json(breakdown);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/applications/analytics/success-rate
router.get('/analytics/success-rate', async (req, res) => {
  try {
    const rate = await applicationService.getSuccessRate();
    res.json(rate);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/applications/analytics/response-rate
router.get('/analytics/response-rate', async (req, res) => {
  try {
    const rate = await applicationService.getResponseRate();
    res.json(rate);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/applications/analytics/per-week
router.get('/analytics/per-week', async (req, res) => {
  try {
    const perWeek = await applicationService.getApplicationsPerWeek();
    res.json(perWeek);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/applications/analytics/top-industries
router.get('/analytics/top-industries', async (req, res) => {
  try {
    const industries = await applicationService.getMostAppliedIndustries();
    res.json(industries);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;