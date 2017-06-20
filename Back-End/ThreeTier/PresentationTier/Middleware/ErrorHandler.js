/*
 * File: ErrorHandler.js
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
 *
 *
 * Carlo Sindico || 30-05-17|| creazione metodo handler() si occupa di gestire gli errori verificatisi nei middleware precedenti
 */
exports.handler = (req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
} 