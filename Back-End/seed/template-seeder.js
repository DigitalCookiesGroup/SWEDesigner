/*Questo file può essere usato per popolare il database, può tornare utile ma non è in uso
per avviarlo basta completare i campi dei modelli e da terminale node template-seeder.js.
******Ricordarsi di controllare la connect*****/

var Template = require('../models/template');
var mongoose = require('mongoose');

mongoose.connect('mongodb://albero:qwertyuiop@ds143221.mlab.com:43221/templatealberello', function() {

var templates = [
	new Template({
		Id: 't1',
		Titolo: 'template 1',
		Categoria : 'dp',
		Corpo: 'dsffds'
	}),
	new Template({
		Id: 't2',
		Titolo: 'template 2',
		Categoria : 'dp',
		Corpo: 'sadsdaasddsaads'

	}),
	new Template({
		Id: 't3',
		Titolo: 'template 3',
		Categoria : 'tc',
		Corpo: 'dasdsaadsdas'

	}),
	new Template({
		Id: 't4',
		Titolo: 'template 4',
		Categoria : 'ta',
		Corpo: 'asdsdaasdads'
	})
];

var done = 0;
for(var i=0; i < templates.length; i++){
	//console.log(i, done);
	templates[i].save(function(err, result){
		console.log(i, done);
		done++;
		if(done == templates.length -1){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}

});