/*
 * File: IndexGiver.js
 * Version: 1.0
 * Type: javascript
 * Date: 31-05-2017
 * Author: Christian Cabrera
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 *
 *
 * Christian Cabrera || 31-05-17 || creazione metodo getIndex() che si occupa del ritorno del file index.htlml
 */
var path = require('path');

exports.getIndex = () => {  //cb è la callback
	return path.join(__dirname, '../../../public/dist', 'index.html');
}