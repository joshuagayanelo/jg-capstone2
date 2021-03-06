const User = require('../models/User');
const Cart = require ('../models/Cart');
const Product = require('../models/Product')
const bcrypt = require('bcrypt'); /*Password encryption*/
const auth = require('../auth');



// ADD TO CART
module.exports.addToCart = async (data) => {

	let isCartUpdated = await Cart.findById(data.user).then(result => {

		let newCart = new Cart ({
			user: data.user,
			productId: data.productId,
			productName: data.productName,
			productSku: data.productSku,
			description: data.description,
			qty:data.qty,
			price: data.price,
			subTotal: data.price * data.qty
		})	


		return newCart.save().then((cart,err) => {
				if(err){
				return false;
			} else {
				return true;
			}
		})

	})

	let isProductUpdated = await Product.findById(data.productId).then(product => {

		product.quantity -= data.qty;

		return product.save().then((product, err) => {
			if(err) {
				return false;
			} else {
				return true;		
			}
		})

	})

	if(isCartUpdated && isProductUpdated) {
		return true;
	} else {
		return false;
	}
 
};



// REMOVE ITEM
module.exports.removeItem = (cartId, res) => {
	let newStatus = {
		isArchived: true
	}
	// findByIdAndUpdate(id), updatesToBeApplied
	return Cart.findByIdAndUpdate(cartId, newStatus).then((result,err) => {
		if(err) {	
			return false;
		} else {
			// Course updated successfullu
			return true
			// {
			// 	message: "Item successfully removed."
			// };
		}
	})
};

// VIEW CART ITEM
module.exports.viewItem = (cartId, res) => {
	return Cart.findById(cartId).then((result,err) => {
		if(err){
			return false;
		} else {
			return result;
		}
	})
};


//RETRIEVE USER CART
module.exports.myCart = (data) => {
	console.log(data)
return Cart.find({user: data, isPaid: false, isArchived: false }).then((result, err) => {
		if(err) {
			return false;
		} else {
			return result
		}
	})
	

}

// isPaid: false, isArchived: false