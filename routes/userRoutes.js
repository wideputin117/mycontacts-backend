// contains routes for registering and login handlers

const express = require('express');
 
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validToken = require('../middleware/validateTokenHandler');
// calling router

const router = express.Router();

// creating a post route for registering the user
router.post("/register", registerUser);


// route for loging the user
router.post("/login", loginUser)

// to give details about the current user
router.get("/current", validToken , currentUser)

module.exports = router;