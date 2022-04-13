
const express = require('express');
const router = express.Router();
const auth = require('../auth');

const UserController = require('../controllers/userController');


// REGISTER USER
router.post('/register', (req, res) => {
	UserController.registerUser(req.body).then(result => res.send(result))
});


// GET ALL USERS
router.get('/', (req, res) => {

	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin) {
		UserController.getAllUser(req.body).then(result => res.send(result))
	} else {
		res.send("Invalid token.")
	}
});


// GET ALL ADMIN
router.get('/admin', (req, res) => {
	
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin) {	
		UserController.getAdmin(req.body).then(result => res.send(result))
	} else {
		res.send("Invalid token.")
	}
});


// LOGIN USER
router.post('/login', (req ,res) => {
	UserController.loginUser(req.body).then(result => res.send(result))
});


// ASSIGN USER AS ADMIN
router.put('/set-admin/:id', auth.verify, (req, res) => {
	
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin){
		UserController.setAdmin(req.params.id).then(result => res.send(result));
	} else {
		res.send("Invalid token.")
	}
});


// ASSIGN USER AS ADMIN
router.put('/set-user/:id', auth.verify, (req, res) => {
	
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin){
		UserController.setUser(req.params.id).then(result => res.send(result));
	} else {
		res.send("Invalid token.")
	}	
});

module.exports = router;