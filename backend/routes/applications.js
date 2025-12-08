const express = require('express');
const router = express.Router();
const prescreen = require('../services/prescreenService');

router.get('/', async (req, res) => {
  const list = await prescreen.listApplications();
  res.json(list);
});

router.get('/:id', async (req, res) => {
  const app = await prescreen.getApplication(req.params.id);
  if (!app) return res.status(404).json({ error: 'Not found' });
  res.json(app);
});

router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.businessName || payload.turnover == null || payload.investment == null || !payload.docs) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const record = await prescreen.createApplication(payload);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
