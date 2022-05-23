const User = require('../models/User');
const Cart = require ('../models/Cart');
const Product = require('../models/Product')
const bcrypt = require('bcrypt'); /*Password encryption*/
const auth = require('../auth');


// REGISTER USER
module.exports.registerUser = (reqBody) => {
	
	return User.findOne({ email:reqBody.email }).then(result => {
		if(result === null) {

			let newUser = new User ({
				firstName: reqBody.firstName,
				lastName: reqBody.lastName,
				mobileNo: reqBody.mobileNo,
				email: reqBody.email,
				password: bcrypt.hashSync(reqBody.password, 10) 
			})

			return newUser.save().then((user,error) => {
				// User registration failed.
				if(error){
					return false;
				} else {
					// User registration successful.
					return true;
				}
			})

		} else {
			return false	
		}
	})
};


// LOGIN USER
module.exports.loginUser = (reqBody) => {

	return User.findOne({ email: reqBody.email }).then(result => {
		if(result == null) {
			return false;
		} else {
			const validatePassword = bcrypt.compareSync(reqBody.password, result.password)

			if(validatePassword) {
				return { accessToken : auth.createAccessToken(result.toObject()) }
			} else {
				return false
			}
		}
	})
};


// GET ALL USERS
module.exports.getAllUser = (reqBody) => {
	
	return User.find({ isAdmin: false}).then((result, err) => {
		if(err) {
			return false;
		} else {
			return result
		}
	})
};


// GET ALL ADMIN
module.exports.getAdmin = (reqBody) => {
	
	return User.find({ isAdmin: true }).then((result, err) => {
		if(err) {
			return false;
		} else {
			return result
		}
	})
};

// RETRIEVE ORDERS
module.exports.getOrders = (reqBody) => {
	
	return User.find({ isAdmin: false, hasPurchased: true }).then((result, err) => {

		if(err) {
			return false;
		} else {
			return {
				orders: result
			}
		}
	})
};


// GET USER DETAILS
module.exports.getUserDetails = (data) => {
	return User.findById(data).then((result, err) => {
		result.password = "";

		return result;
		
		// if(err) {
		// 	return false;
		// } else {
		// 	return result
		// }
	})
}


// ASSIGN USER AS ADMIN
module.exports.setAdmin = (id, res) => {
	
	let newStatus = {
		isAdmin: true
	}

	return User.findByIdAndUpdate(id, newStatus).then((result, err) => {
		if(result) {
			return {message: "User successfully assigned as Admin."}
		} else {
			return false;
		}
	})
};


// ASSIGN USER AS ADMIN
module.exports.setUser = (id, res) => {
	
	let newStatus = {
		isAdmin: false
	}

	return User.findByIdAndUpdate(id, newStatus).then((result, err) => {
		if(result) {
			return {message: "User successfully assigned as User."}
		} else {
			return false;
		}
	})
};

//GET USER ORDER
module.exports.myOrders = (reqParams) => {
	return User.findById(reqParams).then((result, err) => {
		if(err) {
			return false;
		} else {
			return [
				{
					orders:"Your orders",
					result
				}
			]
		}
	})
}


// CHECKOUT v2
module.exports.checkOut = async (data) => {

	let isUserUpdated = await User.findById(data.userId).then(user => {
	
		user.hasPurchased = true
		//user.orders.isPaid = true
		
		data.orders.forEach(element => {
			user.orders.push({
				cartId: element.cartId,
				isPaid: true
				//onsole.log(element.cartId)
			});
			
		});
		
		return user.save().then((user, err) => {
			if(err) {
				return false;
			} else {
				return true;
			}
		})


	});
		

	let isCartUpdated = await Cart.find({user: data.userId}).then(cart => {	
		
		//console.log({user: data.userId})

		data.orders.forEach(element => {
				cartId: element.cartId
				//console.log(element.cartId)

				Cart.findById(element.cartId).then(elementB => {
					
					//console.log(elementB);

					elementB.isPaid = true;

					return elementB.save().then((elementB,err)=>{
						if(elementB){
							return true;
						} else {
							return true;
						}
					})
				})
		})

	});

	if(!isCartUpdated && !isUserUpdated){
		return false
	} else {
		return true
	}


};



	// // CHECKOUT v1
	// module.exports.checkOut = async (data) => {

	// 	let isUserUpdated = await User.findById(data.userId).then(user => {
		
	// 		user.hasPurchased = true;

	// 		user.orders.push({
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
	// };
