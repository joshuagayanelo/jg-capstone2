// const mongoose = require('mongoose');

// const transactionSchema = new mongoose.Schema({

// 		grandTotal: {
// 			type: Number,
// 			required: [true, 'First name is required.']
// 		}, 
// 		purchasedOn: {
// 			type: Boolean,
// 			default:false
// 		}, 
// 		cartId: [
// 			{
// 				cartId: {
// 					type: String,
// 					required: [true, 'Cart ID is required.']
// 				},
// 				productName: {
// 					type: String,
// 					required: [true, 'Product Name is required.']
// 				},
// 				productSku: {
// 					type: String,
// 					required:  [true, 'Product SKU is required.']
// 				},
// 				description: {
// 					type: String,
// 					required:  [true, 'Description is required.']
// 				},
// 				qty: {
// 					type: Number,
// 					required:  [true, 'Quantity is required.']
// 				},,
// 				subTotal: {
// 					type: Number,
// 					required:  [true, 'Sub-total is required.']
// 				},
// 				purchasedOn: {
// 					type: Date,
// 					default: new Date()
// 				}
// 			}
// 		]
	

// 	})

// 	module.exports = mongoose.model('transaction', transactionSchema);