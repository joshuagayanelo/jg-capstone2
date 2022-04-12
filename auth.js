const jwt = require('jsonwebtoken');

const secret = 'CourseBookingAPI';

// JSON Web Token or JWT is a way of securely passing information from the server to the front end or to other parts of server.
//  Information is kept secure through the user of secret code.
// Only the system that knows the secret code that can decode the encrypted information.


// Token Creation
/*
	Analogy
	- Pack the gift and provide a lock with the secret code as the key
*/

module.exports.createAccessToken = (user) => {
	// The data will be received from the registration form.
	// When the user logs in, a token will be created with user's information.
	const data = {
		id: user._id,
		email: user.email,
		isAdmin:user.isAdmin
	};

	// Generate a JSON web token using the jwt's method (sign())
	return jwt.sign(data, secret, {expiresIn: '1h'})
}

// Token Verificaiton
/*
	Analogy
	- Receive the gift and open the lock to verify if the sender is legitimate and that the gift was not tampered.
*/

module.exports.verify = (req, res, next) => {
	// The token is retrieved from the request header
	let token = req.headers.authorization;

	// Token is received and is not undefined
	if(typeof token !== 'undefined') {

		console.log(token);
		// The slice method takes only the token from the information sent via the request header.
		// This removes the "Bearer " prefix and obtains only the token for verification.
		// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
		token = token.slice(7, token.length) 

		// Validate the token using the "verify" method decrypting the token using the secret code.
		return jwt.verify(token, secret, (err, data) => {
			// If JWT is not valid.
			if(err) {
				return res.send({ auth: "failed" })
			} else {
				// If JWT is valid.
				next()
			}
		})

	} else {
		// If token does not exists
		return res.send({ auth: 'token undefined'})
	}
}

// Token Decryption
/*
	Analogy
	- Open the gift and get the content
*/
module.exports.decode = (token) => {
	// Token received and is not undefined
	if(typeof token !== 'undefined') {
		// Retrieve only the token and removes the "Bearer " prefix
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if(err) {
				return null;
			} else {
				return jwt.decode(token, { complete: true }).payload
			}
		})
	} else {
		// Token does not exist
		return null
	}	
}