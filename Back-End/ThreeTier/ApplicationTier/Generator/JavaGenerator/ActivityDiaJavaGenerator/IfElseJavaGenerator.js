/*
 * File: IfElseJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 04-06-2017
 * Author: Carlo Sindico, Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Reistro modifiche:
 * Davide Albertini || 04-06-17 || creazione metodi getGeneratedIfCode(), getGeneratedElseCode()
 * Carlo Sindico || 04-06-17 || crezione metodi getGeneratedWrapCode(), getGeneratedConditionCode()
 */




var instructionJavaGenerator = require('./InstructionJavaGenerator.js');

exports.wrap = (lista, objNode, objRel) => {
	var array_temp = instructionJavaGenerator.cernitaNodeData(lista.key, objNode);
			var s = "";
			if(array_temp!=0){
				var array_temp_ord = instructionJavaGenerator.riordina(array_temp,objRel);
				
				s = s + "if( ";
				if(array_temp_ord[0]!=0)	//controllo se esiste il blocco if condizione
					s = s + instructionJavaGenerator.scrittura(array_temp_ord[0], objNode, objRel, true);
				s = s + "){\n";
				if(array_temp_ord[1]!=0)	//controllo se esiste il blocco if corpo
					s = s + instructionJavaGenerator.scrittura(array_temp_ord[1], objNode, objRel, true);
				s = s + "}\n";
				if(array_temp_ord[2]!=0){	//controllo se esiste il blocco else corpo
					s = s + "else{\n " + instructionJavaGenerator.scrittura(array_temp_ord[2], objNode, objRel, true) + "}\n";
				}
			}
			return s;
}

exports.condition = (lista, objNode, objRel) => {
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

exports.if = (lista, objNode, objRel) => {
	var array_temp = instructionJavaGenerator.cernitaNodeData(lista.key, objNode);
			if(array_temp!=0){
				var array_temp_ord = instructionJavaGenerator.riordina(array_temp,objRel);
				var s="";
				for(var z=0;z<array_temp.length;z++){
					s = s + instructionJavaGenerator.scrittura(array_temp_ord[z], objNode, objRel, true);
				}
				return s;
			}
			else
				return ""; //scrittura(array_temp[0], objNode, objRel);
}

exports.else = (lista, objNode, objRel) => {
	var array_temp = instructionJavaGenerator.cernitaNodeData(lista.key, objNode);
			if(array_temp!=0){
				var array_temp_ord = instructionJavaGenerator.riordina(array_temp,objRel);
				var s="";
				for(var z=0;z<array_temp.length;z++){
					s = s + instructionJavaGenerator.scrittura(array_temp_ord[z], objNode, objRel, true);
				}
				return s;
			}
			else
				return "";//scrittura(array_temp[0], objNode, objRel);
}