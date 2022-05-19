// const mongoose = rqeuire('mongoose');

// const cartSchema = new mongoose.Schema({

// 	userId:{
// 		type: String,
// 		required: [true, 'User ID is required.']
// 	}
// 	subTotal: {
// 		type: Number,
// 		required: [true, 'Subtotal is required.']
// 	}, 
// 	Total: {
// 		type: Number,
// 		required: [true, 'Total is required.']
// 	},
// 	addedToCartOn:{
// 		type: Date,
// 		required: new Date()
// 	},
// 	hasAddedToCart: {
// 		type: Boolean,
// 		default: false
// 	},
// 	cartItems: [
// 		{
// 			productId: {
// 				type: String,
// 				required: [true, 'Product ID is required.']
// 			},
// 			qty: {
// 				type: Number,
// 				required: [true, 'Order quantity is required.']
// 			},
// 			price: {
// 				type: Number,
// 				required: [true, 'Price is required.']
// 			},
// 			addtoCartOn: {
// 				type: Date,
// 				default: new Date()
// 			}
// 		}
// 	]

// })

// module.exports = mongoose.model('Cart', cartSchema)