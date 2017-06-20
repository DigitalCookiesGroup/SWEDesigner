/*
 * File: OperatorJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 03-06-2017
 * Author: Alberto Rossetti, Alessia Bragagnolo, Christian Cabrera, Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alberto Rossetti || 16-06-17 || corretto piccolo errore sul ritorno di getGeneratedSxCode()
 * Davide Albertini || 15-06-17 || aggiornate condizioni metodo getGeneratedOperator()
 * Christian Cabrera || 03-06-17 || creazione metodi getGeneratedSxCode(), getGeneratedDxCode()
 * Alessia Bragagnolo || 03-06-17 || creazione metodi getGeneratedOperator(), getGeneratedOperationCode()
 */

 
var instructionJavaGenerator = require('./InstructionJavaGenerator.js');

exports.operator = (lista, objNode, objRel, puntoVirgola) => {
	var array_temp = instructionJavaGenerator.cernitaNodeData(lista.key, objNode);
			var s = "";
			if(array_temp!=0){
				var array_temp_ord = instructionJavaGenerator.riordina(array_temp,objRel);
				for(var z=0; z<array_temp_ord.length;z++){
					s = s + instructionJavaGenerator.scrittura(array_temp_ord[z], objNode, objRel, puntoVirgola);
				}
			}
			if(puntoVirgola)
				s = s + ";\n";
			return s;
}

exports.sx = (lista, objNode, objRel) => {
	var array_temp = instructionJavaGenerator.cernitaNodeData(lista.key, objNode);
			if(array_temp!=0){
				var array_temp_ord = instructionJavaGenerator.riordina(array_temp,objRel);
				var s = "";
				for(var z=0;z<array_temp.length;z++){
					s = s + instructionJavaGenerator.scrittura(array_temp_ord[z], objNode, objRel, false);
				}
				return s;
			}
			else
				return "";//scrittura(array_temp[0], objNode, objRel);	
}

exports.dx = (lista, objNode, objRel) => {
	var array_temp = instructionJavaGenerator.cernitaNodeData(lista.key, objNode);
			if(array_temp!=0){
				var array_temp_ord = instructionJavaGenerator.riordina(array_temp,objRel);
				var s = "";
				for(var z=0;z<array_temp.length;z++){
					s = s + instructionJavaGenerator.scrittura(array_temp_ord[z], objNode, objRel, false);
				}
				return s;
			}
			else
				return "";//scrittura(array_temp[0], objNode, objRel);	
}

exports.operation = (lista) => {
	return lista.nome;
}