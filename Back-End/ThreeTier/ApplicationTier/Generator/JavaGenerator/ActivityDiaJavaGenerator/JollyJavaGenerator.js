/*
 * File: JollyJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 03-06-2017
 * Author: Carlo Sindico
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Carlo Sindico || 03-06-17 ||  creato metodo getGeneratedJollyCode() per generare il codice di un blocco jolly.
 */

 
module.exports = (lista, puntoVirgola) => {
	var s = "";
			s = s + "/*" + lista.descrizione[0].testo + "*/";
			if(puntoVirgola==true)
				s = s + ";\n";
			return s;
}