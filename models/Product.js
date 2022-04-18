const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

	productName: {
		type: String,
		required: [true, 'Product name is required.']
	}, 
	productSku: {
		type: String,
		required: [true, 'Product SKU is required.']
	},
	description: {
		type: String,
		required: [true, 'Description is required'.]
	},
	quantity: {
		type: Number,
		required: [true, 'Description is required.']
	},
	price: {
		type: Number,
		required: [true, 'Price is required.']
	}
	isActive: {
		type: Boolean,
		default: true
	}, 
	createdOn: {
		type: Date,
		default: new Date()
	}

	module.exports = mongoose.model('User', userSchema);