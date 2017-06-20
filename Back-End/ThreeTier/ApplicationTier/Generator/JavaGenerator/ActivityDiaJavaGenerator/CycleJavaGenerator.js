/*
 * File: CycleJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 03-06-2017
 * Author: Alberto Rossetti, Carlo Sindico, Christian Cabrera
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alberto Rossetti || 19-06-17 || aggiornato metodo getGeneratedConditionCode()
 * Christian Cabrera || 04-06-17 ||  correzione metodo getGeneratedBodyConditionCode()
 * Carlo Sindico || 03-06-17 ||  creazione metodi getGeneratedConditionCode(), getGeneratedCycleCode(), getGeneratedBodyCode() per la generazione del codice Java di un blocco ciclo
 */

var instructionJavaGenerator = require('./InstructionJavaGenerator.js');

exports.cycle = (lista, objNode, objRel) => {
	var array_temp = instructionJavaGenerator.cernitaNodeData(lista.key, objNode);
	var s = "";
	if(array_temp!=0){  //controlla che ci sia almeno un blocco dentro il gruppo ciclo
		var array_temp_ord = instructionJavaGenerator.riordina(array_temp,objRel);
		s = s + "while(";
		if(array_temp_ord[0]!=0)
			s = s + instructionJavaGenerator.scrittura(array_temp_ord[0], objNode, objRel, true);
		s = s + "){\n";
		if(array_temp_ord[1]!=0)
			s = s + instructionJavaGenerator.scrittura(array_temp_ord[1], objNode, objRel, true);
		s = s + "}\n";
	}
	return s;
	//return "while( "+scrittura(array_temp_ord[0], objNode, objRel)+"){\n"+ scrittura(array_temp_ord[1], objNode, objRel) + "}\n";
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
				return "";//return scrittura(array_temp[0], objNode, objRel);
}

exports.body = (lista, objNode, objRel) => {
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
				return "";//return scrittura(array_temp[0], objNode, objRel);
}