/*
 * File: JavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 30-05-2017
 * Author: Christian Cabrera
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Christian Cabrera || 30-05-17 ||  aggiunta metodo per la richiesta di generazione di codice Java partendo dal file JSON
 */
var parser = require('./ClassDiaJavaGenerator/parser.js')

exports.getGeneratedCode = (string) =>{
	return parser.ClassDiaJavaGenerator(string);
}

