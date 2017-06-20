/*
 * File: Template.js
 * Version: 1.0
 * Type: javascript
 * Date: 06-06-2017
 * Author: Davide Albertini, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 *
 *
 * Saverio Follador || 14-06-17 || aggiornati codizioni if/else del metodo getTemplate
 * Davide Albertini || 06-06-17 || creati metodi getTemplate(), getCategoria() per la richiesta di un template al Database
 */
var Template = require('./../../models/template');  //riferimento allo schema
var template = require('./../../models/template.js'); //riferimento al modello

exports.getTemplate = (id, cb) => {
	template.findOne({Id: id}, function(err,r) {
		if(err || !r){
			console.log(err);
			//console.error("error get-template/id query");
			cb(err, null);
		}else{
			//res.json(r.Corpo);
			console.log(r);
			cb(null,r);  //funziona solo senza il res.send e senza il log
			//console.log(err,r);
		}	
	});
}


exports.getCategoria = (cat, cb) => {
	template.find({Categoria: cat}, function(err,r) {
		if(err || !r){
			cb(err, null);
		}else{
			cb(null, r);  //funziona solo senza il res.send e senza il log
			//console.log(err,r);
		}	
	}).select('Id Titolo');
}
