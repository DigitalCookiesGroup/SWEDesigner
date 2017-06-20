/*
 * File: method.service.ts
 * Version: 1.0
 * Type: typescript
 * Date: 16-06-2017
 * Author: Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Saverio Follador || 16-06-2017 || creazione metodi necessari per selezionare il metodo di cui creare
 * il corpo nel diagramma delle attività
 *
 */



import {Injectable} from "@angular/core";


@Injectable()
export class Method {

  private class;
  private name;
  private diagram;

  constructor(c, n, d) {
    this.class = c;
    this.name = n;
    this.diagram = d;
  }

  getClass() {
    return this.class;
  }

  getName() {
    return this.name;
  }

  getDiagram() {
    return this.diagram;
  }

  setDiagram(x) {
    this.diagram = x;
  }

}
