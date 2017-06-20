/*
 * File: InstructionJavaGenerator.js
 * Version: 1.0
 * Type: javascript
 * Date: 01-06-2017
 * Author: Alberto Giudice, Alberto Rossetti, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alberto Rossetti || 13-06-17 || corretto errore sul metodo riordina() per una migliore precisione
 * Saverio Follador || 05-06-17 || aggiornati metodi
 * Alberto Giudice || 02-06-17 || creazione metodi scrittura(), cernitaNodeData(),  riordina()
 * Saverio Follador || 01-06-17 || creazione metodi  cercainRelto(), cercainRelfrom(), cerca()
 */

//screma nodeDataArray ritornando un array con solo i nodi appartenenti a quel gruppo
exports.cernitaNodeData = (gruppo, objNode) => {
	var x = [];
	var lunghezza_nodeDataArray = objNode.length;
	var count = 0;
	for(var s=0; s < lunghezza_nodeDataArray; s++){
		if(gruppo  == "undefined" && !objNode[s].group){
			x[count] =  objNode[s];
			count ++;
		}else{
			if(objNode[s].group == gruppo){  //fare una prova anche per questo if che ragruppa i nodi dentro un gruppo
				x[count] = objNode[s];
				count ++;
			}			
		}
	}
	return x;
}



//riordina l'array scremato tornato da cernitaNodeData in base alle relazioni presenti su linkDataArray
exports.riordina = (node,rel) => {
	var prima_istruzione;
	var ultima_istruzione;
	var trovato = false;
	//calcola la prima istruzione di node passato alla funzione
	for(var i=0 ; i < rel.length && trovato==false; i++){
		var ok=false;
		for(var j=0; j < rel.length && ok==false; j++){
			if(node[i].key == rel[j].to) 
				ok=true;
		}
		if(ok==false){
			/*devo trovare la relazione che ha come .from node[i].Key*/
			prima_istruzione = exports.cercainrel_from(node[i].key, rel);
			trovato = true;
		}
	}
	//se esiste solo un blocco dentro un gruppo ritorna solo questo
	if(prima_istruzione=="ultima relazione"){ 
		return node;
	}

	//calcola l'ultima istruzione di node passato alla funzione
	trovato=false;
	for(var i=0 ; i < rel.length && trovato==false; i++){
		var ok=false;
		for(var j=0; j < rel.length && ok==false; j++){
			if(node[i].key == rel[j].from) 
				ok=true;
		}
		if(ok==false){
			//console.log(node[i].key);
			ultima_istruzione = exports.cercainrel_to(node[i].key, rel);
			trovato = true;
		}
	}

   	//prepara la variabile risultato che tornerà i node riordinati in base alle relazioni
	var risultato = [];
	for(var i=0; i < rel.length ; i++){
		risultato[i] = exports.cerca(node,prima_istruzione.from);
		
		prima_istruzione = exports.cercainrel_from(prima_istruzione.to, rel);
		//console.log(prima_istruzione);
		if(prima_istruzione=="ultima relazione"){
			risultato[i+1] = exports.cerca(node,ultima_istruzione.to);
			return risultato;
		}
	}
}

//cerca nel to delle relazioni la chiave ins, in caso non la trovasse ritorna ultima relazione
exports.cercainrel_to = (ins, objRel) => {
	var i=0;
	for(i ; i<objRel.length ; i++){
		if(objRel[i].to == ins){
			return objRel[i];
		}
	}
	return "ultima relazione";
}

//cerca nel from delle relazioni la chiave ins, in caso non la trovasse ritorna ultima relazione
exports.cercainrel_from = (ins, objRel) => {
	var i=0;
	//console.log(ins);
	for(i ; i<objRel.length ; i++){
		if(objRel[i].from == ins){
			return objRel[i];
		}
	}
	return "ultima relazione";
}

//ritorna un blocco presente in node avete chiave = ogg
exports.cerca = (node, ogg) => {
	//console.log(node);
	for(var i=0 ; i<node.length ; i++){
		if(node[i].key == ogg)
			return node[i];
	}
}


var variableJavaGenerator = require('./VariableJavaGenerator.js');
var jollyJavaGenerator = require('./JollyJavaGenerator.js');
var methodCallJavaGenerator = require('./MethodCallJavaGenerator.js');
var cycleJavaGenerator = require('./CycleJavaGenerator.js');
var ifElseJavaGenerator = require('./IfElseJavaGenerator.js');
var operatorJavaGenerator = require('./OperatorJavaGenerator.js');


exports.scrittura = (lista, objNode, objRel, puntovirgola) => {
	if(lista){
		if(lista.category == "variabile"){
			return variableJavaGenerator(lista, puntovirgola);
		}
		if(lista.category == "jolly"){
			return jollyJavaGenerator(lista, puntovirgola);
		}
		if(lista.category == "chiamatametodo"){
			return methodCallJavaGenerator(lista, puntovirgola);
		}	

		////////////////////////////CICLO//////////////////////////////////
		if(lista.category == "ciclo"){
			return cycleJavaGenerator.cycle(lista, objNode, objRel);
		}
		if(lista.category == "ciclocondizione"){
			return cycleJavaGenerator.condition(lista, objNode, objRel);
		}
		if(lista.category == "ciclocorpo"){
			return cycleJavaGenerator.body(lista, objNode, objRel);
		}

		//////////////////////////////IF-ELSE//////////////////////////////////////
		if(lista.category == "ifelse"){
			return ifElseJavaGenerator.wrap(lista, objNode, objRel);
		}
		if(lista.category == "ifcondizione"){
			return ifElseJavaGenerator.condition(lista, objNode, objRel);
		}
		if(lista.category == "ifcorpo"){
			return ifElseJavaGenerator.if(lista, objNode, objRel);
		}
		if(lista.category == "elsecorpo"){
			return ifElseJavaGenerator.else(lista, objNode, objRel);
		}

		///////////////////////OPERATORE/////////////////////////

		if(lista.category == "operatore"){
			return operatorJavaGenerator.operator(lista, objNode, objRel, puntovirgola);
		}
		if(lista.category == "sxoperatore"){
			return operatorJavaGenerator.sx(lista, objNode, objRel);
		}
		if(lista.category == "dxoperatore"){
			return operatorJavaGenerator.dx(lista, objNode, objRel);
		}
		if(lista.category == "operazione"){
			return operatorJavaGenerator.operation(lista);
		}
	
	}else{
		return "";
	}
}


/*function main_parser_activity(string){

	//var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"key":"START", "color":"#b2ff59", "category":"start", "loc":"-380 -290"},{"key":"END", "color":"#f44336", "category":"end", "loc":"710 330"},{"key":"Variabile", "color":"#fff59d", "category":"variabile", "nomevariabile":"x", "tipivalori":[ {"type":"int", "name":"10", "tipovaloreID":0} ], "tipovaloreCount":1, "loc":"-300 -130"},{"key":"Ciclo", "nome":"Ciclo", "color":"#a4cfff", "category":"ciclo", "isGroup":true, "groupColor":"#a4cfff", "loc":"57 -373.56854249492386"},{"key":"Ciclocondizione", "nome":"Condizione", "color":"lightskyblue", "category":"ciclocondizione", "group":"Ciclo", "isGroup":true, "groupColor":"#b9d7f8", "loc":"73 -334.0456949966159"},{"key":"Ciclocorpo", "nome":"Corpo", "color":"lightskyblue", "category":"ciclocorpo", "group":"Ciclo", "isGroup":true, "groupColor":"#b9d7f8", "loc":"80 140"},{"key":"Variabile2", "color":"#fff59d", "category":"variabile", "nomevariabile":"y", "tipivalori":[ {"type":"int", "name":"5", "tipovaloreID":0} ], "tipovaloreCount":1, "loc":"-300 0"},{"key":"Operatore", "nome":"Operatore", "color":"aquamarine", "category":"operatore", "isGroup":true, "groupColor":"#64ffda", "loc":"89 -294.52284749830795", "group":"Ciclocondizione"},{"key":"Sxoperatore", "nome":"Sxoperatore", "color":"aquamarine", "category":"sxoperatore", "group":"Operatore", "isGroup":true, "groupColor":"#9afde5", "loc":"105 -255"},{"key":"Operazione", "nome":">", "color":"#42f7cc", "category":"operazione", "group":"Operatore", "loc":"110 -150"},{"key":"Dxoperatore", "nome":"Dxoperatore", "color":"aquamarine", "category":"dxoperatore", "group":"Operatore", "isGroup":true, "groupColor":"#9afde5", "loc":"110 -30"},{"key":"Variabile3", "color":"#fff59d", "category":"variabile", "nomevariabile":"x", "tipivalori":[ {"type":"", "name":"", "tipovaloreID":0} ], "tipovaloreCount":1, "loc":"110 -250", "group":"Sxoperatore"},{"key":"Variabile4", "color":"#fff59d", "category":"variabile", "nomevariabile":"y", "tipivalori":[ {"type":"", "name":"", "tipovaloreID":0} ], "tipovaloreCount":1, "loc":"115 -25", "group":"Dxoperatore"},{"key":"Operatore2", "nome":"Operatore", "color":"aquamarine", "category":"operatore", "isGroup":true, "groupColor":"#64ffda", "loc":"96 179.52284749830795", "group":"Ciclocorpo"},{"key":"Sxoperatore2", "nome":"Sxoperatore", "color":"aquamarine", "category":"sxoperatore", "group":"Operatore2", "isGroup":true, "groupColor":"#9afde5", "loc":"120 219.0456949966159"},{"key":"Operazione2", "nome":"++", "color":"#42f7cc", "category":"operazione", "group":"Operatore2", "loc":"101 307.737084989848"},{"key":"Variabile5", "color":"#fff59d", "category":"variabile", "nomevariabile":"y", "tipivalori":[ {"type":"", "name":"", "tipovaloreID":0} ], "tipovaloreCount":1, "loc":"125 224.0456949966159", "group":"Sxoperatore2"}],"linkDataArray": [ {"from":"START", "to":"Variabile", "points":[ -335,-199.9999999999999,-335,-189.9999999999999,-335,-164.99999999999994,-199.5,-164.99999999999994,-199.5,-140,-199.5,-130 ]},{"from":"Variabile", "to":"Variabile2", "points":[ -199.5,-79,-199.5,-69,-199.5,-39.5,-199.5,-39.5,-199.5,-10,-199.5,0 ]},{"from":"Variabile2", "to":"Ciclo", "points":[ -99,25.5,-89,25.5,-26.5,25.5,-26.5,4.322847498308022,36,4.322847498308022,46,4.322847498308022 ]},{"from":"Ciclo", "to":"END", "points":[ 390,4.322847498308022,400,4.322847498308022,550,4.322847498308022,550,375,700,375,710,375 ]}]}';


	var obj_json = JSON.parse(string); //il json è salvato dentro una variabile dalla quale si possono ricavare tutti i campi
	var risultato = ""; //controllare se inutile
	var objNode = obj_json.nodeDataArray;  //mi salvo su un oggetto solo il campo nodeDataArray che è l'unico che mi interessa per generare codice
	var objRel = obj_json.linkDataArray;

	var ritorno = "";

	var gruppo = "undefined"; //undefined corrisponde al primo livello compreso di start e end, mette in un array tutti i nodi di più alto livello
	var node_data = [];
	node_data = cernitaNodeData(gruppo, objNode); 
	if(node_data.length!=0){
		var node_data_ordinati = riordina(node_data, objRel); 
		for(var i=0; i<node_data_ordinati.length;i++){
			if(node_data_ordinati[i].key!="START" && node_data_ordinati[i].key!="END"){
				ritorno = ritorno + scrittura(node_data_ordinati[i], objNode, objRel);		
			}
		}

	}
	//console.log(node_data_ordinati);
	console.log("RISULTATO " + ritorno + " RISULTATO");
	return ritorno;
}
*/