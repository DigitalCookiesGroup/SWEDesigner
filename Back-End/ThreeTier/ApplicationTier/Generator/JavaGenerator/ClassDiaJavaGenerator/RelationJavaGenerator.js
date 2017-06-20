/*
 * File: RelationJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 15-06-2017
 * Author: Alessia Bragagnolo, Carlo Sindico
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alessia Bragagnolo || 05-06-17 || creazione metodi getPadre() e controllo()
 * Carlo Sindico || 04-06-17 || crezione metodo getGeneratedRelationCode() per la generazione del codice delle relazioni tra le classi
 */

 
//ritorna il padre di una classe sottotipo
function get_padre(key, obj){
	var lung = obj.length;
	for(var y=0; y < lung; y++){
		if(obj[y].key==key)
			return obj[y];
	}
}

//ritorna true con la direzione "to" se la classe considerata è sottotipo di un'altra classe
function controllo(key, objRel){
	var lung = objRel.length;
	for(var y=0; y < lung; y++){
		if(objRel[y].category=="Generalizzazione" && objRel[y].from == key){
			var to = objRel[y].to;
			return [true,to];		
		}
	}
	return [false,""];
}


exports.getGeneratedRelationCode = (objs, obj, objRel, ris) =>{
	ris = ris + "class "  + objs.name;
	var key = objs.key;
	var ok = controllo(key,objRel);
	if(ok[0]==true){
		var padre = get_padre(ok[1],obj);
		if(padre.tipo=="<<abstract>>")
			ris = ris + " extends " + padre.name;
		if(padre.tipo=="<<interface>>" || padre.tipo=="interface")
			ris = ris + " implements " + padre.name;
	}
	return ris;
}