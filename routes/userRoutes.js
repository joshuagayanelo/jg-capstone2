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
		res.send('Invalid token.')
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
		res.send('Invalid token.')
	}
});

// GET USER ORDER
router.get('/my-orders', auth.verify, (req,res) => {
	
	const data = auth.decode(req.headers.authorization);

	UserController.myOrders(data.id).then(result => res.send(result));
});

// RETRIEVE ALL ORDERS
router.get('/orders', (req, res) => {

	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin) {
		UserController.getOrders(req.body).then(result => res.send(result))
	} else {
		res.send('Invalid token.')
	}
});


// LOGIN USER
router.post('/login', (req ,res) => {
	UserController.loginUser(req.body).then(result => res.send(result))
});


//GET USER DETAILS
router.get('/details', auth.verify, (req, res) => {
	
	const data = auth.decode(req.headers.authorization)
	
	UserController.getUserDetails(data.id).then(result => res.send(result))
});


// ASSIGN USER AS ADMIN
router.put('/set-admin/:id', auth.verify, (req, res) => {
	
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin) {
		UserController.setAdmin(req.params.id).then(result => res.send(result));
	} else {
		res.send('Invalid token.')
	}
});


// ASSIGN USER AS ADMIN
router.put('/set-user/:id', auth.verify, (req, res) => {
	
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin) {
		UserController.setUser(req.params.id).then(result => res.send(result));
	} else {
		res.send('Invalid token.')
	}	
});


// CHECKOUT
router.post('/checkout', auth.verify, (req,res) => {
	
	const data = {
			userId: auth.decode(req.headers.authorization).id,
			orders: req.body.orders
		}

	UserController.checkOut(data).then(result => res.send(result));
});

module.exports = router;
