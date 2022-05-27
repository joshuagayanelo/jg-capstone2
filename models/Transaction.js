const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

		
		user: {
			type: String,
			required: [true, 'User Id is required.']
		}, 
		totalAmount: {
			type: Number,
			required: [true, 'Number is required.']
		}, 
		purchasedOn: {
			type: Date,
			default: new Date()
		}, 
		orders: [
			{
				cartId: {
					type: String,
					required: [true, 'Cart ID is required.']
				},
				productName: {
					type: String,
					required: [true, 'Product Name is required.']
				},
				productSku: {
					type: String,
					required:  [true, 'Product SKU is required.']
				},
				description: {
					type: String,
					required:  [true, 'Description is required.']
				},
				qty: {
					type: Number,
					required:  [true, 'Quantity is required.']
				},
				price: {
					type: Number,
					required:  [true, 'Price is required.']
				},
				subTotal: {
					type: Number,
					required:  [true, 'Sub-total is required.']
				}
				
			}
		]
	

	})

	module.exports = mongoose.model('transaction', transactionSchema);