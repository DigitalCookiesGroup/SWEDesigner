/*
 * File: MethodJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 01-06-2017
 * Author: Alberto Giudice, Christian Cabrera
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alberto Giudice || 04-06-17 || correzioni creazione corpo metodo della classe
 * Christian Cabrera || 01-06-17 || creazione metodo getGeneratedMethodcCode() per generare il codice dei metodi di una classe
 */

 
var crea_corpo = require('./../ActivityDiaJavaGenerator/parser_activity.js');
exports.getGeneratedMethodCode = (obj, objRel, ris) =>{
	if(obj.methods != 0){
		var array = obj.methods;
		var lunghezza_met=obj.methods.length;
		for(var i=0; i<lunghezza_met; i++){
			if(array[i].visibility=="-"){
				ris = ris + "private ";			
			}else{
				if(array[i].visibility=="#"){
					ris = ris + "protected ";
				}else{
					ris = ris + "public ";	
				}
			}
			ris = ris + array[i].type + " " + array[i].name + "(";
			//LISTA PARAMETRI FORMALI DELLA FUNZIONE
			if(array[i].parameters != 0){
				var list_par = array[i].parameters.split(",");
				var length_list_par = list_par.length;
				for(var k=0; k<length_list_par; k++){
					var single_par = list_par[k].split(":");
					if( single_par[1].split("=").length == 2 ){ // inserimento valori di default per parametri formali di un metodo
						ris = ris +  single_par[1].split("=")[0] + " " + single_par[0] + "="+ single_par[1].split("=")[1];
					}else{		
						ris = ris + single_par[1] + " " + single_par[0];
					}
					if(k < length_list_par-1){
						ris = ris + ", ";
					}
				}
			}
			ris = ris +"){\n";
			//CREAZIONE CORPO DEL METODO
			//console.log(array[i]);
			ris = ris + crea_corpo(array[i].diagram); 
			//ris = ris + "return x + y;" //prova
			ris = ris +"}\n"; //fine metodo
		}
	}
	return ris;
}