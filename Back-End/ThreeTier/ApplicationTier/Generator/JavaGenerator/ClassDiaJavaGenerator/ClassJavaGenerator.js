/*
 * File: ClassJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 01-06-2017
 * Author: Alberto Giudice, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alberto Giudice || 05-06-17 || arricchimento codice generato con i metodi relativi alla classe
 * Saverio Follador || 01-06-17 || creazione metodo getGeneratedClassCode() per generare codice di una classe
 */

 
var AttributeJavaGenerator = require('./AttributeJavaGenerator.js');
var MethodJavaGenerator = require('./MethodJavaGenerator.js');

exports.getGeneratedClassCode = (obj, objRel, ris) =>{
	/*********************LISTA ATTRIBUTI*******************/
	ris =  AttributeJavaGenerator.getGeneratedAttributeCode(obj,ris);
	/*********************LISTA METODI***********************/
	ris =  MethodJavaGenerator.getGeneratedMethodCode(obj, objRel, ris);

	return ris;
}