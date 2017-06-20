/*
 * File: classpage.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 01-06-2017
 * Author: Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Davide Albertini || 01-01-2017 || creazione collegamenti a tutti i componenti del diagramma delle classi
 *
 */


import { Component, OnInit } from '@angular/core';
import { ClassdiagrameditorComponent } from './classdiagrameditor/classdiagrameditor.component';
import { ClassdiagrampaletteComponent } from './classdiagrampalette/classdiagrampalette.component';
import {Project} from "../../project";

@Component({
  selector: 'app-classpage',
  templateUrl: './classpage.component.html',
  styleUrls: ['./classpage.component.css']
})
export class ClasspageComponent implements OnInit {

  constructor(private project: Project) { }

  ngOnInit() {
  }

}
