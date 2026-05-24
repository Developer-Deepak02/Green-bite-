const express = require('express');

const {
  createContactMessage,
  getMessages,
} = require('../controllers/contactController');

const router = express.Router();

router.post('/', createContactMessage);

router.get('/', getMessages);

module.exports = router;
