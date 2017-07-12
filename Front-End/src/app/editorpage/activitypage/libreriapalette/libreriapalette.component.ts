/*
 * File: activitydiagrampalette.component
 * Version: 0.9
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
import { TemplateService } from '../../../services/template.service';
import {Project} from '../../../project';
@Component({
  selector: 'app-libreriapalette',
  templateUrl: './libreriapalette.component.html',
  styleUrls: ['./libreriapalette.component.css']
})
export class LibreriapaletteComponent implements OnInit {

  private toggleList: boolean[] = [false];
  private activityList;

  constructor(private project: Project, private templateService: TemplateService) {}

  open(index) {
    // console.log(this.classes.Id);
    this.toggleList[index] = !this.toggleList[index];
    // this.toggleList2 = false;
  }

  ngOnInit() {
    this.templateService.getActivityList().subscribe(activityList => this.activityList = activityList);
  }

}
