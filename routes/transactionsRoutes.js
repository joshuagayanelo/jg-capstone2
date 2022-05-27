// const express = require('express');
// const router = express.Router();
// const auth = require('../auth');

// const CartController = require('../controllers/cartController');

// // CHECKOUT
// router.post('/checkout', auth.verify, (req,res) => {
	
// 	const data = {
// 		user: auth.decode(req.headers.authorization).id,
// 		userId:req.body.userId,
// 		totalAmount: req.body.totalAmount,
// 		cartId: req.body.cartId,

// 		}
	
// 	CartController.checkOut(data).then(result => res.send(result));
// });

// module.exports = router;									