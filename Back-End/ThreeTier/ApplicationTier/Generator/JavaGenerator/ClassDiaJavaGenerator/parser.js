/*
 * File: parser.js
 * Version: 1.0
 * Type: javascript
 * Date: 04-06-2017
 * Author: Alberto Giudice, Alberto Rossetti, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Saverio Follador || 16-06-17 || implementato metodo function()
 * Alberto Rossetti || 14-06-17 || aggiornate condizioni if/else
 * Alberto Giudice || 04-06-17 || creato metodo function() per avviare il parsing
 */

 
/*PROBLEMI DA RISOLVERE
1) pensare se implementare e come implementare la scrittura di codice delle varie relazioni tra le classi , ora è implementata solo la generalizzazione

*/


var fs = require("fs");
//var file = "file.txt" ; //CAMBIARE ESTENSIONE FILE



/* NON SERVONO!!!!!!!!!!!!!!!!!!!!!!!!!!!
FUNZIONE ASINCRONA DI PARSING JSON
fs.readFile('/path/to/file.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
});

FUNZIONE SINCRONA DI PARSING JSON
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('/path/to/file.json', 'utf8'));
*/




//funzione di scrittura sul file
/*function WriteFile(file, content) {
  fs.writeFile(file, content, function (err) {
    if (err) return console.log(err) ;
    console.log("Written: " + file) ;
  });
} ;*/

var ClassJavaGenerator = require('./ClassJavaGenerator.js');
var RelationJavaGenerator = require('./RelationJavaGenerator.js');

exports.ClassDiaJavaGenerator = (string) => {
//var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}';

	//var obj_json = JSON.parse(string); //il json è salvato dentro una variabile dalla quale si possono ricavare tutti i campi
	var obj_json = string;
	var obj = obj_json.nodeDataArray;  
	var objRel = obj_json.linkDataArray; 
	var res = [];
	if(obj != 0){
		var lunghezza_corpo_json = obj.length;
		for(var s=0; s < lunghezza_corpo_json; s++){
			var ris = {};
			ris.body = ""; 
			
			ris.name = obj[s].name;

			if(obj[s].category == "Classe"){
				ris.body = ris.body + "public ";
				if(obj[s].tipo == "abstract"){
					ris.body = ris.body + "abstract ";
				}else{
					if(obj[s].tipo == "<<interface>>" || obj[s].tipo == "interface"){
						ris.body = ris.body + "interface ";
					}
				}
				/*********************RELAZIONI DI DIPENDENZA*******************/
				ris.body =  RelationJavaGenerator.getGeneratedRelationCode(obj[s],obj,objRel,ris.body);

				ris.body = ris.body + "{ \n";
				/*********************CREAZIONE CORPO CLASSE*******************/
				ris.body = ClassJavaGenerator.getGeneratedClassCode(obj[s],objRel,ris.body);
				/*********************FINE CREAZIONE CORPO CLASSE*******************/
				ris.body = ris.body + "\n}\n\n" //fine classe
			}

			res[s] = ris;
		}
	}else{
		var ris = {};
		ris.name = "errore";
		ris.body = "ERRORE: non è stata creata ancora nessuna classe, impossibile generare codice.";
		res[0] = ris;
	}

	//var content = new Buffer(ris) ;
	//WriteFile(file, content) ;
	
	return res;
}

/*
var string = '{"class":"go.GraphLinksModel","copiesArrays":true,"copiesArrayObjects":true,"nodeDataArray":[{"category":"Classe","tipo":"default","name":"A","attributi":[{"name":"attributo1","type":"String","visibility":"+","attributeID":0}],"methods":[{"name":"metodo1","parameters":"param1:tipo1","type":"void","visibility":"+","methodID":0,"diagram":{"class":"go.GraphLinksModel","copiesArrays":true,"copiesArrayObjects":true,"nodeDataArray":[{"key":"START","color":"#b2ff59","category":"start","loc":"180 -220"},{"key":"END","color":"#f44336","category":"end","loc":"180 220"},{"key":"Variabile","color":"#fff59d","category":"variabile","nomevariabile":"Variabile","tipivalori":[{"type":"Tipo","name":"Valore","tipovaloreID":0}],"tipovaloreCount":1,"loc":"-20 -80"},{"key":"Variabile2","color":"#fff59d","category":"variabile","nomevariabile":"Variabile","tipivalori":[{"type":"Tipo","name":"Valore","tipovaloreID":0}],"tipovaloreCount":1,"loc":"260 10"}],"linkDataArray":[{"from":"START","to":"Variabile","points":[180,-175,170,-175,170,-105,191,-105,191,-54.5,181,-54.5]},{"from":"Variabile","to":"Variabile2","points":[181,-54.5,191,-54.5,220.5,-54.5,220.5,35.5,250,35.5,260,35.5]},{"from":"Variabile2","to":"END","points":[360.5,61,360.5,71,360.5,140.5,225,140.5,225,210,225,220]}]}}],"priority":1,"opacity":1,"color":"#fff59d","attributeCount":1,"methodCount":1,"key":-1,"loc":{"class":"go.Point","x":-148.20001220703125,"y":-155.71665954589844}},{"category":"Classe","tipo":"default","name":"B","attributi":[{"name":"attributo1","type":"String","visibility":"+","attributeID":0}],"methods":[{"name":"metodo1","parameters":"param1:tipo1","type":"void","visibility":"+","methodID":0,"diagram":{"class":"go.GraphLinksModel","copiesArrays":true,"copiesArrayObjects":true,"nodeDataArray":[{"key":"START","color":"#b2ff59","category":"start","loc":"180 -220"},{"key":"END","color":"#f44336","category":"end","loc":"180 220"},{"key":"Variabile","color":"#fff59d","category":"variabile","nomevariabile":"Variabile","tipivalori":[{"type":"Tipo","name":"Valore","tipovaloreID":0}],"tipovaloreCount":1,"loc":"-160 -70"},{"key":"Variabile2","color":"#fff59d","category":"variabile","nomevariabile":"Variabile","tipivalori":[{"type":"Tipo","name":"Valore","tipovaloreID":0}],"tipovaloreCount":1,"loc":"270 50"}],"linkDataArray":[{"from":"START","to":"Variabile","points":[180,-175,170,-175,110.5,-175,110.5,-44.5,51,-44.5,41,-44.5]},{"from":"Variabile","to":"Variabile2","points":[41,-44.5,51,-44.5,155.5,-44.5,155.5,75.5,260,75.5,270,75.5]},{"from":"Variabile2","to":"END","points":[370.5,101,370.5,111,370.5,160.5,225,160.5,225,210,225,220]}]}}],"priority":1,"opacity":1,"color":"#fff59d","attributeCount":1,"methodCount":1,"key":-2,"loc":{"class":"go.Point","x":17.79998779296875,"y":50.28334045410156}}],"linkDataArray":[{"points":[-22.20001220703125,-1.7166595458984375,-22.20001220703125,8.283340454101562,-22.20001220703125,24.283340454101562,143.79998779296875,24.283340454101562,143.79998779296875,40.28334045410156,143.79998779296875,50.28334045410156],"category":"Dipendenza","from":-1,"to":-2}]}';

var x = main_parsing(string);
*/


