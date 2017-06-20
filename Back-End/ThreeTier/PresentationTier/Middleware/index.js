/*
 * File: index.js
 * Version: 1.0
 * Type: javascript
 * Date: 29-05-2017
 * Author: Alessia Bragagnolo, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 *
 *
 * Saverio Follador || 29-05-17 || creazioni chiamate get e post.
 * Alessia Bragagnolo || 29-05-17 || stabilita connessione al Database.
 */
var express = require('express');
var router = express.Router();
//var path = require('path');

var Template = require('./../../../models/template');  //riferimento allo schema
var template = require('./../../../models/template.js'); //riferimento al modello

var mongoose = require('mongoose');

var ApplicationController = require('./../../ApplicationTier/ApplicationController.js');
var IndexGiver = require("./../../PresentationTier/Controller/IndexGiver.js");


mongoose.connect('mongodb://albero:qwertyuiop@ds143221.mlab.com:43221/templatealberello', function() {

	/* GET home page. */
	router.get('/', function(req, res, next) {
		/*res.render('index', { title: 'Express' });*/
		res.sendFile(IndexGiver.getIndex());
	});


	/* GET di un template con un id specifico*/
	router.get('/template/:id', function(req, res, next) {
		var id=req.params.id;
		ApplicationController.getTemplate(id, (err,r) => {
			res.json(r);
		});
		
	});

	/*GET template di una determinata categoria c che può essere "tc (template classe)", "ta (template attività)", "dp (desing pattern)" */
	router.get('/template/categoria/:c', function(req, res, next) {
		var cat=req.params.c;
		if(cat == "tc" || cat == "ta" || cat == "dp" ){
			ApplicationController.getCategoria(cat, (err, r) =>{
				res.json(r);
			});
		}else{
			res.json("errore richiesta categoria");
		}
	});


	//RICHIESTA POST GENERAZIONE CODICE 
	router.post('/', function (req, res, next) {
		var json = req.body;
		var ris = ApplicationController.getGeneratedCode(json);

		//res.sendFile(path.join(__dirname, '../parser', my_file.txt));
		res.send(ris);
	});

	/*(NON UTILE PER IL PROGETTO) GET che stampa tutti gli elementi del db 
	router.get('/get-data',function(req,res,next){
		template.find().then(function(r,err){
			if(err || !r){
				//console.error("error get-data query");
				console.log(err);
			}else{
				res.json(r); //funziona solo senza il res.send e senza il log
				//console.log(r);			
			}
		});
	});
	*/

	/*router.get('/:x', function(req, res, next) {
	  var x=req.params.x;
	  res.sendFile(path.join(__dirname, '../public/dist', x));
	});
	*/
});

module.exports = router;
