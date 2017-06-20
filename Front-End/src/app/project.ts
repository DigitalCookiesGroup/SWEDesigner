/*
 * File: project.service.ts
 * Version: 1.0
 * Type: typescript
 * Date: 15-06-2017
 * Author: Saverio Follador, Carlo Sindico
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Carlo Sindico, Saverio Follador || 20-06-2017 || ultime modifiche e correzioni metodi
 * Carlo Sindico || 15-06-2017 || creazione metodo clearSelectedMethodDiagram() per selezionare il metodo della classe da creare nel diagramma delle attività e ricaricare la struttura
 * Saverio Follador || 15-06-2017 || creazione metodi get e set per fare interagire le palette con i rispettivi editor delle classi e delle attività
 *
 */

import {Injectable} from '@angular/core';
import {Method} from './method';

@Injectable()
export class Project {
  private name = 'SWEDesigner_Project';
  private diagram = '{}'; // da modificare per avere una variabile con le classi e un array con gli attività
  private checkbox: boolean[] = [true, true, true, true, true];
  private selectedMethod = [];
  private methods: Method[] = [];
  private code;

  reset() {
    this.name = 'SWEDesigner_Project';
    this.diagram = '{}';
    this.checkbox = [true, true, true, true, true];
    this.selectedMethod = [];
    this.methods = [];
  }

  getName() {
    return this.name;
  }

  setName(x: string) {
    this.name = x;
  }

  addPatternToClassDiagram(x) {
    // aggiunge pattern x al diagramma delle classi
     console.log(x);
  }

  setDiagram(x) {
    this.diagram = x;
    console.log(this.diagram);
  }

  getFullDiagram() {
    // metodo che unisce il classi con gli attività
    const res = JSON.parse(this.diagram);

    for (let meth = 0; meth < this.methods.length; ++meth) {
      for (let i = 0; i < res.nodeDataArray.length; ++i) {
        if (res.nodeDataArray[i].category === 'Classe' && res.nodeDataArray[i].name === this.methods[meth].getClass()){
          for (let m = 0; m < res.nodeDataArray[i].methods.length; ++m){
            if (res.nodeDataArray[i].methods[m].name === this.methods[meth].getName()){
              res.nodeDataArray[i].methods[m].diagram = JSON.parse(this.methods[meth].getDiagram());
            }
          }
        }
      }
    }

    return JSON.stringify(res);
     // ritorna il diagramma completo
  }

  getClassDiagram() {
    return this.diagram; // da rimuovere
    // prende diagram
    // rimuove il contenuto dei diagrammi delle attività
    // ritorna il json creato
  }

  /*getActivityDiagram(x: string[]) {
    // prende diagram
    // seleziona la porzione contenente il diagramma delle attività richiesto (x contiene classer e metodo)
    // lo ritorna
    for (let i = 0; i < this.methods.length; ++i) {
      if (this.methods[i].getClass() === x[0] && this.methods[i].getName() === x[1]){
        return this.methods[i];
      }
    }
    return this.methods.push(new Method(x[0], x[1], JSON.stringify({ 'class': 'go.GraphLinksModel', 'nodeDataArray': [], 'linkDataArray': []})));

  }*/

  getClassesNames() {
    // ritorna un array di stringhe con i nomi delle classi prendendoli dal json
    const json = JSON.parse(this.diagram);
    const res = [];

    for (let i = 0; i < json.nodeDataArray.length; ++i) {
      if (json.nodeDataArray[i].category === 'Classe') {
        res.push(json.nodeDataArray[i].name);
      }
    }
    return res;
  }

  getClassMethods(classe: string) {
    // ritorna un array di stringhe con i nomi dei metodi della classe

    const json = JSON.parse(this.diagram);
    const res = [];
    let y = -5;

    for (let i = 0; i < json.nodeDataArray.length; ++i) {
      if (json.nodeDataArray[i].name === classe && json.nodeDataArray[i].category === 'Classe') { //check sulla categoria per sicurezza
        y = i;
      }
    }

    if (y >= 0) {
      for (let i = 0; i < json.nodeDataArray[y].methods.length; ++i) {
        res.push(json.nodeDataArray[y].methods[i].name);
      }
      return res;
    }else {
      return;
    }

  }

  getCheckbox(index) {
    return this.checkbox[index];
  }

  setCheckbox(index, checkValue) {
    this.checkbox[index] = checkValue;
  }

  setSelectedMethod(c, m) {
    this.selectedMethod[0] = c;
    this.selectedMethod[1] = m;
    //console.log(c, m);
  }

  getSelectedMethod(): string[] {
    return this.selectedMethod;
  }

  getSelectedMethodDiagram() {
    for (let i = 0; i < this.methods.length; ++i){
      if (this.methods[i].getClass() === this.selectedMethod[0] && this.methods[i].getName() === this.selectedMethod[1]){
        return this.methods[i].getDiagram();
      }
    }
    this.methods.push(new Method(this.selectedMethod[0], this.selectedMethod[1], '{ "class": "go.GraphLinksModel", "copiesArrays": true, "copiesArrayObjects": true, "nodeDataArray": [ {"key":"START", "color":"#b2ff59", "category":"start", "loc":"180 -220"}, {"key":"END", "color":"#f44336", "category":"end", "loc":"180 220"} ], "linkDataArray": []}'));
    return this.getSelectedMethodDiagram();
  }

  setSelectedMethodDiagram(x) {
    for (let i = 0; i < this.methods.length; ++i) {
      if (this.methods[i].getClass() === this.selectedMethod[0] && this.methods[i].getName() === this.selectedMethod[1]) {
        this.methods[i].setDiagram(x);
      }
    }
  }

  setCode(x: string) {
    this.code = x;
  }

  getCode() {
    return this.code;
  }

  clearSelectedMethodDiagram() {
    for (let i = 0; i < this.methods.length; ++i) {
      if (this.methods[i].getName() === this.selectedMethod[1] && this.methods[i].getClass() === this.selectedMethod[0]) {
          this.methods[i].setDiagram({
            'class': 'go.GraphLinksModel', 'copiesArrays': true, 'copiesArrayObjects': true, 'nodeDataArray': [
              {'key': 'START', 'color': '#b2ff59', 'category': 'start', 'loc': '180 -220'},
              {'key': 'END', 'color': '#f44336', 'category': 'end', 'loc': '180 220'} ], 'linkDataArray': []
          });
      }
    }
  }

}
