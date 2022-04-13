const User = require('../models/User');
const bcrypt = require('bcrypt'); /*Password encryption*/
const auth = require('../auth');


// Check if the email already exists
/*
	Business logic:
	1. Use mongoose "find" method to find duplicate emails.
	2. Use the "then" method to send a response back to the client.
*/
/*module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email }).then(result => {
		if(result.length > 0) {
			return true;
		} else {
			// No duplicate email found
			return false;
		}
	})
}*/

/*User Registration

	Business Logic
	1. Create a new User Object.
	2. Make sure that the password is encrypted.
	3. Save the new User to the database.
*/

module.exports.registerUser = (reqBody) => {
	// Creates a New User Object
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
};

// Get all uers
module.exports.getAllUser = (reqBody) => {
	return User.find({}).then((result, err) => {
		if(err) {
			return false
		} else {
			return result;
		}
	})
};

// Login User
module.exports.loginUser = (reqBody) => {

	return User.findOne({email: reqBody.email}).then(result =>{
		if(result == null) {
			return false;
		} else {
			const validatePassword = bcrypt.compareSync(reqBody.password, result.password)

			if(validatePassword) {
				// Generate access token
				return { token : auth.createAccessToken(result.toObject()) }
			} else {
				// Password does not match
				return false;
			}
		}
	})
};