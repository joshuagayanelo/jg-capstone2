
const express = require('express');
const router = express.Router();
// const auth = require('../auth');

const UserController = require('../controllers/userController');


// Registration for User
router.post('/register', (req, res) => {
	UserController.registerUser(req.body).then(result => res.send(result))
});

// Get all Users
router.get('/', (req, res) => {
	UserController.getAllUser(req.body).then(result => res.send(result))
});

// Login a user
router.post('/login', (req ,res) => {
	UserController.loginUser(req.body).then(result => res.send(result))
});

router.put('/set-to-admin/:id', (req, res) => {
	UserController.makeAdmin(req.params.id).then(result => res.send(result))
});

module.exports = router;