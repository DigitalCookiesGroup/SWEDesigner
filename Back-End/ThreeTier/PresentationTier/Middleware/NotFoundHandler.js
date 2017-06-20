/*
 * File: NotFoundHandler.js
 * Version: 1.0
 * Type: javascript
 * Date: 30-05-2017
 * Author: Carlo Sindico
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Carlo Sindico || 30-05-17 || creazione metodo handler() per generare una pagina 404 in caso di errore
 */
exports.handler = (req, res, next) =>{
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
} 