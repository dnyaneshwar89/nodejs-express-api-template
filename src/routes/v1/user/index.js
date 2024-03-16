// Pacakages
const express = require('express');
const router = express();

// Middlewares
const auth = require('../../../middlewares/auth.middlewares');

// Controllers
const userController = require('../../../controllers/v1/user/user.controllers');

// Routes

// Get user for :user_id
router.get('/:user_id', auth, userController.getUser);

module.exports = router;
