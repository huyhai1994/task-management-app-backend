const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/userController');

// Register new user
router.post('/register', registerUser);

// Login existing user
router.post('/login', loginUser);

 module.exports = router;
