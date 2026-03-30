// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactService = require('../services/contactService');

// GET /api/contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.json(contacts);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/contacts/:id
router.get('/:id', async (req, res) => {
  try {
    const contact = await contactService.getContactById(req.params.id);
    res.json(contact);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/contacts/company/:companyId
router.get('/company/:companyId', async (req, res) => {
  try {
    const contacts = await contactService.getContactsByCompany(req.params.companyId);
    res.json(contacts);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// POST /api/contacts
router.post('/', async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// PUT /api/contacts/:id
router.put('/:id', async (req, res) => {
  try {
    const contact = await contactService.updateContact(req.params.id, req.body);
    res.json(contact);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// DELETE /api/contacts/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await contactService.deleteContact(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;