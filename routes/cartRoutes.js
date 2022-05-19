const express = require('express');
const router = express.Router();
const auth = require('../auth');

const CartController = require('../controllers/cartController');

// ADD TO CART
router.post('/add-to-cart', auth.verify, (req,res) => {
	
	const data = {
		user: auth.decode(req.headers.authorization).id,
		productId: req.body.productId,
		qty: req.body.qty,
		price: req.body.price,
		subTotal: req.body.subTotal
		}
	
	CartController.addToCart(data).then(result => res.send(result));
});

// RETRIEVE USER CART
router.get('/my-cart', auth.verify, (req,res) => {

		const data = {
			userId: auth.decode(req.headers.authorization).id,
			user: req.body.user
		} 

	CartController.myCart(data).then(result => res.send(result));
});


//DELETE CART ITEM
router.put('/remove-item/:cartId', auth.verify, (req,res) => {
	
	const data = {
		user: auth.decode(req.headers.authorization).id
		}		
	
	if(data.user) {
		CartController.removeItem(req.params.cartId, ).then(result => res.send(result));
	} else {
		res.send('Invalid token')
	}
});

module.exports = router;