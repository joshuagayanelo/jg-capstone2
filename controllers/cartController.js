const User = require('../models/User');
const Cart = require ('../models/Cart');
const Product = require('../models/Product')
const bcrypt = require('bcrypt'); /*Password encryption*/
const auth = require('../auth');



// ADD TO CART
module.exports.addToCart = (data) => {

	//return Cart.findById(data.user).then(result => {

		let newCart = new Cart ({
			user: data.user,
			productId: data.productId,
			qty:data.qty,
			price: data.price,
			subTotal: data.price * data.qty
		})	
		//return fals	
		return newCart.save().then((cart,err) => {
				if(err){
				return false;
			} else {
				return true;
			}
		})

	//})

}

//RETRIEVE USER CART
module.exports.myCart = (data) => {
return Cart.find({user:data.user}).then((result, err) => {
		if(err) {
			return false;
		} else {
			return [
				{
					orders:"Your cart",
					result
				}
			]
		}
	})
}

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
			return {
				message: "Course successfully archived."
			};
		}
	})
};

