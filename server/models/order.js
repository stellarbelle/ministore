var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
	customer_name: String,
	product: String,
	quantity: Number,
	created_at: String
})

mongoose.model('Order', OrderSchema);