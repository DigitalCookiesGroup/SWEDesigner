/*
 * File: parser_activity.js
 * Version: 1.0
 * Type: javascript
 * Date: 01-06-2017
 * Author: Alberto Rossetti, Carlo Sindico, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Saverio Follador || 16-06-17 || implementato metodo function()
 * Alberto Rossetti || 14-06-17 || migliorato ciclo for
 * Carlo Sindico || 01-06-17 || creata funzione function() per avviare il parsing del diagramma delle attività
 */



/*NOTE IMPORTANTI

1)Tutti i blocchi di un diagramma di attività devono avere almeno o una freccia entrante o una uscente

*/

/*PROBLEMI DA RISOLVERE:

2)problema return, l'idea è quella di tornare sempre e solo una variabile, parlarne con saverio e decidere
*/


var instructionJavaGenerator = require('./InstructionJavaGenerator.js');


///////////////////////////////////INIZIO CORPO DEL PARSER DELLE ATTIVITA'//////////////////////////



var corpo = function (string){
	//var obj_json = JSON.parse(string); //il json è salvato dentro una variabile dalla quale si possono ricavare tutti i campi
	var risultato = ""; //controllare se inutile
	var objNode = string.nodeDataArray;  //mi salvo su un oggetto solo il campo nodeDataArray che è l'unico che mi interessa per generare codice
	var objRel = string.linkDataArray;

	var ritorno = "";

	var gruppo = "undefined"; //undefined corrisponde al primo livello compreso di start e end, mette in un array tutti i nodi di più alto livello
	var node_data = [];
	node_data = instructionJavaGenerator.cernitaNodeData(gruppo, objNode); 
	if(node_data.length!=0){
		var node_data_ordinati = instructionJavaGenerator.riordina(node_data, objRel); 
		for(var i=0; i<node_data_ordinati.length;i++){
			if(node_data_ordinati[i].key!="START" && node_data_ordinati[i].key!="END"){
				ritorno = ritorno + instructionJavaGenerator.scrittura(node_data_ordinati[i], objNode, objRel, true);		
			}
		}

	}
	//console.log(node_data_ordinati);
	//console.log("RISULTATO " + ritorno + " RISULTATO");
	return ritorno;
};

module.exports = corpo;


/*PROVARE
solo con module.exports = ritorno;
*/

//module.exports = main_parser_activity();



