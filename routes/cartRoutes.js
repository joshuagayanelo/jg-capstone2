const express = require('express');
const router = express.Router();
const auth = require('../auth');

const CartController = require('../controllers/cartController');

// ADD TO CART
router.post('/add-to-cart', auth.verify, (req,res) => {
	
	const data = {
		user: auth.decode(req.headers.authorization).id,
		productId: req.body.productId,
		productName: req.body.productName,
		productSku: req.body.productSku,
		description: req.body.description,
		qty: req.body.qty,
		price: req.body.price,
		subTotal: req.body.subTotal
		}
	
	CartController.addToCart(data).then(result => res.send(result));
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

//VIEW CART ITEM
router.get('/view-item/:cartId', auth.verify, (req, res) => {

	const data = {
		user: auth.decode(req.headers.authorization).id
	}

	if(data.user) {
		CartController.viewItem(req.params.cartId).then(result => res.send(result));
	} else {
		res.send('Invalid token')
	}
})

// RETRIEVE USER CART
router.get('/my-cart', auth.verify, (req,res) => {

		const data = auth.decode(req.headers.authorization)
			
			
	CartController.myCart(data.id).then(result => res.send(result));
});

module.exports = router;									