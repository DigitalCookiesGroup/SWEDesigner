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
import {Project} from '../../../project';

@Component({
  selector: 'app-codelistafilepalette',
  templateUrl: './codelistafilepalette.component.html',
  styleUrls: ['./codelistafilepalette.component.css']
})
export class CodelistafilepaletteComponent implements OnInit {

  prova(x){
    console.log(x);
  }

  setSelectedFile(x) {
  this.project.setSelectedCode(x);
  this.project.setSelectedFileName(x);
}

  constructor(private project: Project) {

  }

  ngOnInit() {
  }

}
