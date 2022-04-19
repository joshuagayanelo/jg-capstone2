const Product = require('../models/Product');
const bcrypt = require('bcrypt'); /*Password encryption*/
const auth = require('../auth');


// CREATE NEW PRODUCT
module.exports.newProduct = (reqBody) => {

	return Product.findOne({ productSku: reqBody.productSku }).then(result => {
		if(result === null) {
			
			let createProduct = new Product ({
				productName: reqBody.productName,
				productSku: reqBody.productSku,
				description: reqBody.description,
				price: reqBody.price,
				quantity: reqBody.quantity
				
			})

			return createProduct.save().then((result, error) => {
				// Product creation failed.
				if(error){
					return false;
				} else {
					// Product creation successful.
					return {message:'Your product has been sucecssfully created.'};
				}
			})

		} else {
			return {message: 'Product SKU already exists.'}
		}
	})

};


// UPDATE PRODUCT
module.exports.updateProduct = (id, reqBody) => {
 
 	let updatedProduct = {
 		productName: reqBody.productName,
 		productSku: reqBody.productSku,
 		description: reqBody.description,
 		quantity: reqBody.quantity,
 		price: reqBody.price

	};

	// findByIdAndUpdate(id), updatesToBeApplied
	return Product.findByIdAndUpdate(id, updatedProduct).then((result,err) => {
		if(err) {	
			return false;
		} else {
			// Course updated successfullu
			return {message: 'Your product has been updated.'};
		}
	})
};


// GET ALL PRODUCTS
module.exports.getAllProducts = (reqBody) => {
	return Product.find({ isActive: true }).then((result, err) => {
		if(err) {
			return false;
		} else {
			return result;
		}
	})
}

// GET PRODUCT BY ID
module.exports.getOneProduct = (reqParams) => {
	return Product.findById(reqParams).then((result, err) => {
		if(result.isActive === true) {
			return result;
		} else {
			return {message: 'This product is currently not available.'};
		}
	})
}


// ARCHIVE PRODUCT
module.exports.archiveProduct = (id, res) => {
 
 	let archivedProduct = {
 		isActive: false
	};

	return Product.findByIdAndUpdate(id, archivedProduct).then((result,err) => {
		if(err) {
			return false;
		} else {
			return {message: 'Product has been succesfully archived.'};
		}
	})
};


// ACTIVATE PRODUCT
module.exports.activateProduct = (id, res) => {
 
 	let activatedProduct = {
 		isActive: true
	};

	return Product.findByIdAndUpdate(id, activatedProduct).then((result,err) => {
		if(err) {	
			return false;
		} else {
			return {message: 'Product is now active.'};
		}
	})
};
