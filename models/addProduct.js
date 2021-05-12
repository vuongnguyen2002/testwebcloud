var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addProductschema = new Schema({
	Type: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	imagePath: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('AddProduct', addProductschema, 'Phone');