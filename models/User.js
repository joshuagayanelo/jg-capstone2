const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

		firstName: {
			type: String,
			required: [true, 'First name is required.']
		}, 
		lastName: {
			type: String,
			required: [true, 'Last name is required.']
		},
		mobileNo:{
			type: String,
			required: [true, 'Mobile number is required.']
		},
		email: {
			type: String,
			required: [true, 'Email is required.']
		},
		password: {
			type: String,
			required: [true, 'Password is required.']
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		hasPurchased: {
			type: Boolean,
			default:false
		},
		orders: [
			{
				cartId: {
					type: String,
					required: [true, 'Cart ID is required.']
				},
				isPaid:{
					type: Boolean,
					default: false
				},
				purchasedOn: {
					type: Date,
					default: new Date()
				}

			}

		]

	})

	module.exports = mongoose.model('User', userSchema);