const express = require('express');
const router = express.Router();
const auth = require('../auth');

const ProductController = require('../controllers/productController');

// CREATE NEW PRODUCT
router.post('/new', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin){
		ProductController.newProduct(req.body).then(result => res.send(result));
	} else {
		res.send('Invalid token.')
	}
});


// UPDATE PRODUCT
router.put('/update/:id', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin){
		ProductController.updateProduct(req.params.id, req.body).then(result => res.send(result));
	} else {
		res.send('Invalid token.')
	}
});


// GET ALL PRODUCTS
router.get('/', (req, res) => {
	ProductController.getAllProducts(req.body).then(result => res.send(result))
});


// GET PRODUCT BY ID
router.get('/:id', (req, res) => {
	ProductController.getOneProduct(req.params.id).then(result => res.send(result))
});


// ARCHIVE PRODUCT
router.put('/archive/:id', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin){
		ProductController.archiveProduct(req.params.id).then(result => res.send(result));
	} else {
		res.send('Invalid token.')
	}
});

// ACTIVATE PRODUCT
router.put('/activate/:id', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if(data.isAdmin){
		ProductController.activateProduct(req.params.id).then(result => res.send(result));
	} else {
		res.send('Invalid token.')
	}
});




module.exports = router;
