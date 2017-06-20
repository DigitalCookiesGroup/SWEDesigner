/*
 * File: codegeneratepalette.component.ts
 * Version: 0.9
 * Type: typescript
 * Date: 18-06-2017
 * Author: Carlo Sindico, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Saverio Follador || 18-06-2017 || creazione metodo generateCode() per esportare il codice generato
 * Carlo Sindico || 18-06-2017 || creazione metodo generateCode() per generare il codice e visualizzarlo nell editor
 *
 */

import { Component, OnInit } from '@angular/core';
import {Project} from '../../../project';
import {CodeService} from '../../../services/code.service';
import {Generatedcode} from '../generatedcode';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-codegeneratepalette',
  templateUrl: './codegeneratepalette.component.html',
  styleUrls: ['./codegeneratepalette.component.css']
})
export class CodegeneratepaletteComponent implements OnInit {

  constructor(private project: Project, private codeService: CodeService) { }

  generateCode() {
    this.codeService.getGeneratedCode(this.project.getFullDiagram()).subscribe(vez => this.project.setCode(vez.toString()));
  }

  exportCode() {
    for (let i = 0; i < this.project.getCode().getFiles().length; ++i) {
      const blob = new Blob([this.project.getCode().getFiles()[i].getContent()], { type: 'text/plain'});
      FileSaver.saveAs(blob, 'file' + i + '.json');
    }
  }

  ngOnInit() {
  }

}
