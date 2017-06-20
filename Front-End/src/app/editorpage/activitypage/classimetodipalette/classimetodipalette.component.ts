/*
 * File: classimetodipalette.component
 * Version: 1.0
 * Type: typescript
 * Date: 04-06-2017
 * Author: Saverio Follador, Alberto Giudice
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alberto Giudice || 06-06-2017 ||  integrazione con il componente acitivitydiagrameditor.component.ts
 * Saverio Follador || 04-06-2017 || creazione possibili collegamenti a servizi per interfacciarsi al Back-end
 *
 */


import { Component, OnInit } from '@angular/core';
import {Project} from '../../../project';
import { TemplateService } from '../../../services/template.service';

@Component({
  selector: 'app-classimetodipalette',
  templateUrl: './classimetodipalette.component.html',
  styleUrls: ['./classimetodipalette.component.css']
})
export class ClassimetodipaletteComponent implements OnInit {

  private toggleList: boolean[] = [false];

  constructor(private templateService: TemplateService, private project: Project) {}

  open(index) {
    // console.log(this.classes.Id);
    this.toggleList[index] = !this.toggleList[index];
    // this.toggleList2 = false;
  }


  ngOnInit() {

  }



}
