var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	Id: {type: String, required: true},
	Titolo: {type: String, required: true},
	Categoria: {type: String, required: true},
	Corpo: {type: JSON, required: true}
});

// make this available to our users in our Node applications
module.exports = mongoose.model('template', schema);





