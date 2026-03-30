// routes/interviewRoundRoutes.js
const express = require('express');
const router = express.Router();
const interviewRoundService = require('../services/interviewRoundService');

// GET /api/interview-rounds
router.get('/', async (req, res) => {
  try {
    const rounds = await interviewRoundService.getAllRounds();
    res.json(rounds);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/interview-rounds/analytics/upcoming
router.get('/analytics/upcoming', async (req, res) => {
  try {
    const upcoming = await interviewRoundService.getUpcomingInterviews();
    res.json(upcoming);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/interview-rounds/analytics/average-rounds
router.get('/analytics/average-rounds', async (req, res) => {
  try {
    const average = await interviewRoundService.getAverageRoundsBeforeOffer();
    res.json(average);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/interview-rounds/:id
router.get('/:id', async (req, res) => {
  try {
    const round = await interviewRoundService.getRoundById(req.params.id);
    res.json(round);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/interview-rounds/application/:applicationId
router.get('/application/:applicationId', async (req, res) => {
  try {
    const rounds = await interviewRoundService.getRoundsByApplication(req.params.applicationId);
    res.json(rounds);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// POST /api/interview-rounds
router.post('/', async (req, res) => {
  try {
    const round = await interviewRoundService.createRound(req.body);
    res.status(201).json(round);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// PUT /api/interview-rounds/:id
router.put('/:id', async (req, res) => {
  try {
    const round = await interviewRoundService.updateRound(req.params.id, req.body);
    res.json(round);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// DELETE /api/interview-rounds/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await interviewRoundService.deleteRound(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;