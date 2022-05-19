// Setup Dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');

// Server
const app = express();

// Allows all resources/origins to access our backend application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// http://localhost:3000/api/users
app.use('/api/users', userRoutes);
// http://localhost:3000/api/products
app.use('/api/products', productRoutes);
// http://localhost:3000/api/cart
// app.use('./api/products', cartRoutes);



// Connect to our MongoDB connection
mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.listen(process.env.PORT, () => {
	console.log(`API is now online on port ${process.env.PORT}`)
})


/*
Notes:
models > controllers > routes > index.js
*/

