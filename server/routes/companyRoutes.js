// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const companyService = require('../services/companyService');

// GET /api/companies
router.get('/', async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.json(companies);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/companies/:id
router.get('/:id', async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    res.json(company);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// POST /api/companies
router.post('/', async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// PUT /api/companies/:id
router.put('/:id', async (req, res) => {
  try {
    const company = await companyService.updateCompany(req.params.id, req.body);
    res.json(company);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// DELETE /api/companies/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await companyService.deleteCompany(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/companies/industry/:industry
router.get('/industry/:industry', async (req, res) => {
  try {
    const companies = await companyService.getCompaniesByIndustry(req.params.industry);
    res.json(companies);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;