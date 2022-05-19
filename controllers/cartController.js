// const User = require ('../models/Cart');
// const Product = require('../models/Product')
// const auth = require('../auth');

// // ADD TO CART
// module.exports.addToCart = async (data) => {

// 	let isUserUpdated = await User.findById(data.userId).then(user => {
	
// 		user.hadAddedToCart = true;

// 		user.addedToCart.push({
// 			productId: data.productId,
// 			qty:data.qty,
// 			price: data.price * data.qty
// 		});

// 		return user.save().then((user, err) => {
// 			if(err) {
// 				return false;
// 			} else {
// 				return true;
// 			}
// 		})
// 	});

// 	let isProductUpdated = await Product.findById(data.productId).then(product => {
		
// 		product.quantity -= data.qty;

// 		//let subTotal = data.qty * data.price


// 		product.customers.push({
// 			userId: data.userId,
// 			qtyOrdered: data.qty,
// 			price: data.price 
// 		});

// 		return product.save().then((product, err) => {
// 			if(err) {
// 				return false;
// 			} else {
// 				return true;
// 			}
// 		})
// 	});

// 		if(isUserUpdated && isProductUpdated){
// 			return {message:'You product has been added.'}
// 		} else {
// 			return false;
// 		}
// 	};


// //GET USER CART
// module.exports.myCart = (reqParams) => {
// 	return User.findById(reqParams).then((result, err) => {
// 		if(err) {
// 			return false;
// 		} else {
// 			return [
// 				{
// 					orders:"Your orders",
// 					result
// 				}
// 			]
// 		}
// 	})
// }
