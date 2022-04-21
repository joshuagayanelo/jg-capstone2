const User = require('../models/User');
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
					return {message:"User successfully registered."};
				}
			})

		} else {
			return {message: 'User already exists.'}	
		}
	})
};


// LOGIN USER
module.exports.loginUser = (reqBody) => {

	return User.findOne({email: reqBody.email}).then(result => {
		if(result == null) {
			return {message:'Incorrect email or password'};
		} else {
			const validatePassword = bcrypt.compareSync(reqBody.password, result.password)

			if(validatePassword) {
				return { token : auth.createAccessToken(result.toObject()) }
			} else {
				return {message:'Incorrect email or password'};
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
	
	return User.find({ isAdmin: false, hasOrdered: true }).then((result, err) => {

		if(err) {
			return false;
		} else {
			return {
				orders: result
			}
		}
	})
};


// GET USER BY ID
module.exports.getOneUser = (reqParams) => {
	return User.findById(reqParams).then((result, err) => {
		if(err) {
			return false;
		} else {
			return result
		}
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


// CREATE ORDER
module.exports.checkout = async (data) => {

	let isUserUpdated = await User.findById(data.userId).then(user => {
	
		user.hasOrdered = true;

		user.orderedProducts.push({
			productId: data.productId,
			qty:data.qty
		});

		return user.save().then((user, err) => {
			if(err) {
				return false;
			} else {
				return true;
			}
		})
	});

	let isProductUpdated = await Product.findById(data.productId).then(product => {
		
		product.quantity -= data.qty;

		product.customers.push({
			userId: data.userId,
			qtyOrdered:data.qty
		});

		return product.save().then((product, err) => {
			if(err) {
				return false;
			} else {
				return true;
			}
		})
	})

	if(isUserUpdated && isProductUpdated) {
		return {message: 'Your product has been added.'};
	} else {
		return false;
	}

};

// GET USER ORDER
module.exports.myOrders = (reqParams) => {
	return User.findById(reqParams).then((result, err) => {
		if(err) {
			return false;
		} else {
			return {orders:result};
		}
	})
}