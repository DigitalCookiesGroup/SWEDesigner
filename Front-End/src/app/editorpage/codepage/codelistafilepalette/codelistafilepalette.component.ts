/*
 * File: codelistafilepalette.component.ts
 * Version: 0.9
 * Type: typescript
 * Date: 17-06-2017
 * Author: Alberto Rossetti
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Alberto Rossetti || 17-06-2017 || creazione metodo generateCode() utilizzato alla pressione del bottone generacodice
 *
 */

import { Component, OnInit } from '@angular/core';
import {Generatedcode} from '../generatedcode';
import {Project} from '../../../project';

@Component({
  selector: 'app-codelistafilepalette',
  templateUrl: './codelistafilepalette.component.html',
  styleUrls: ['./codelistafilepalette.component.css']
})
export class CodelistafilepaletteComponent implements OnInit {

  private code: Generatedcode;

  constructor(private project: Project) {
    // setto un code arbitrario per fare prove
    this.code = new Generatedcode('');
  }

  generateCode(): void {
    // metodo da invocare alla pressione di genera codice
    this.code = new Generatedcode(this.project.getFullDiagram());
  }

  ngOnInit() {
  }

}
