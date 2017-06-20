/*
 * File: MethodCallJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 04-06-2017
 * Author: Christian Cabrera
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Christian Cabrera || 04-06-17 ||  creato metodo per la generazione del codice Java di un blocco chiamata del metodo
 */

 
module.exports = (lista, puntoVirgola) => {
	var s = lista.nomemetodo + "(";
	if(lista.parameters != 0){
		for(var u=0; u<lista.parameters.length ; u++){
			if(lista.parameters[u].type)
				s = s + lista.parameters[u].type;
			if(lista.parameters[u].variabile) 
				s = s + " " + lista.parameters[u].variabile;
			if(lista.parameters[u].name)
				s = s + "=" + lista.parameters[u].name;
			if(u<lista.parameters.length-1)
				s = s + ",";
		}
	}
	s = s + ")";
	if(puntoVirgola==true)
		s = s + ";\n";
	return s; 
}