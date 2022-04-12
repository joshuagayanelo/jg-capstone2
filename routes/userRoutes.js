
const express = require('express');
const router = express.Router();
// const auth = require('../auth');

const UserController = require('../controllers/userController');


// Registration for User
router.post('/register', (req, res) => {
	UserController.registerUser(req.body).then(result => res.send(result))
});

module.exports = router;