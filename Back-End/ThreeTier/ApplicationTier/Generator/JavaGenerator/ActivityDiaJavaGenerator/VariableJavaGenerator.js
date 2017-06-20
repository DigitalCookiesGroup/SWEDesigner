/*
 * File: VariableJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 02-06-2017
 * Author: Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Saverio Follador || 02-06-17 ||  creazione metodo per la generazione del codice Java di un blocco variabile del diagramma delle attività
 */

 
module.exports = (lista, puntoVirgola) => {
	var s = "";
	if(lista.tipivalori[0].type!="")
		s = s + lista.tipivalori[0].type + " ";
	s = s + lista.nomevariabile;
	if(lista.tipivalori[0].name!="")
		s = s + "=" + lista.tipivalori[0].name;
	if(puntoVirgola==true)
		s= s + ";\n";
	return s;
}
