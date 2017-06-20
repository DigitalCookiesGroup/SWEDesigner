/*
 * File: ApplicationController.js
 * Version: 1.0
 * Type: javascript
 * Date: 30-05-2017
 * Author: Alberto Rossetti, Christian Cabrera
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alberto Rossetti || 06-06-17 || correzioni al metodo getGeneratedCode
 * Christian Cabrera || 30-05-17 || creazione metodi per gestire le comunicazioni tra i tre package della struttura three-tier
 */
var JavaGenerator = require("./Generator/JavaGenerator/JavaGenerator.js");
var Template = require("./../DataTier/Template.js");

exports.getGeneratedCode = (string) => {
	return JavaGenerator.getGeneratedCode(string);
}


exports.getTemplate = (id, cb) => {  //cb è la callback
	Template.getTemplate(id, cb);
}


exports.getCategoria = (cat, cb) => {
	Template.getCategoria(cat, cb);
}


