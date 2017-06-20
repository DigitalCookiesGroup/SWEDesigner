/*
 * File: AttributeJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 31-05-2017
 * Author: Christian Cabrera, Davide Albertini, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Davide Albertini || 09-06-17 || correzione su array[].visibility
 * Saverio Follador || 07-06-17 || correzione condizione ciclo for
 * Christian Cabrera || 31-05-17 || creazione del metodo getGeneratedAttributeCode() per generare codice Java di un attributo
 */

 
exports.getGeneratedAttributeCode = (obj,ris) =>{
	if(obj.tipo != "<<interface>>" || obj.tipo != "interface"){
		if(obj.attributi != 0){  //se "attributes" : "VUOTO", "methods" : ...... non entra dentro il ciclo
			var array = obj.attributi;
			var lunghezza_att=obj.attributi.length;
			for(var i=0; i<lunghezza_att; i++){
				if(array[i].visibility=="-"){
					ris = ris + "private ";			
				}else{
					if(array[i].visibility=="#"){
						ris = ris + "protected ";	
					}else{
						ris = ris + "public ";
					}
				}
				ris = ris + array[i].type + " " + array[i].name + "; \n";		
			}
		}
	}
	return ris;
}