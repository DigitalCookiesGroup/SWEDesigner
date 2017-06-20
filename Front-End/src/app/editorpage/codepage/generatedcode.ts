/*
 * File: template.service.ts
 * Version: 0.9
 * Type: typescript
 * Date: 18-06-2017
 * Author: Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Saverio Follador || 18-06-2017 || creazione possibili metodi per restituire i file con il codice generato
 *
 */
export class Generatedcode {

  private files: Codefile[] = [];

  constructor(x) {
    // prende il json
    // lo spara al backend
    // riceve il codice generato
    // crea gli oggetti Codefile che servono
    // crea l'array files
    // creo files per prova
    for (let i = 0; i < 4; i = i + 1) {
      this.files.push(new Codefile('file' + i.toString(), 'file content'));
    }
  }

  getFiles() {
    return this.files;
  }

}

export class Codefile {

  private name: string;
  private content: string;

  constructor(n: string, c: string) {
    this.name = n;
    this.content = c;
  }

  getName(): string {
    return this.name;
  }

  getContent(): string {
    return this.content;
  }

}
