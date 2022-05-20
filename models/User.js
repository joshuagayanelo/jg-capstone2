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
				// productId: {
				// 	type: String,
				// 	required: [true, 'Product ID is required.']
				// },
				cartId: {
					type: String,
					required: [true, 'Cart ID is required.']
				},
				// qty: {
				// 	type: Number,
				// 	required: [true, 'Order quantity is required.']
				// },
				// price: {
				// 	type: Number,
				// 	required: [false, 'Price is required.']
				// },
				purchasedOn: {
					type: Date,
					default: new Date()
				}

			}

		]

	})

	module.exports = mongoose.model('User', userSchema);