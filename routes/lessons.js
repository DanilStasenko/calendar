const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

const { getLessonsForUser } = require('../controllers/lessons');

// /api/
router.get('/', auth, getLessonsForUser);

module.exports = router;
