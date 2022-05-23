const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

	user:{
		type: String,
		required: [true, 'User ID is required.']
	},
	productId: {
		type: String,
		required: [true, 'Product ID is required.']
	},
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
		required: [true, 'Description is required.']
	},
	qty: {
		type: Number,
		required: [true, 'Order quantity is required.']
	},
	price: {
		type: Number,
		required: [true, 'Price is required.']
	},
	subTotal: {
		type: Number,
		required: [true, 'Subtotal is required.']
	},
	isPaid:{
		type: Boolean,
		default: false
	},
	addedtoCartOn: {
		type: Date,
		default: new Date()
	},
	isArchived:{
		type: Boolean,
		default:false
	}	

})

module.exports = mongoose.model('Cart', cartSchema)