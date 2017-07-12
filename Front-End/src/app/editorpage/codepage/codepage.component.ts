/*
 * File: codepage.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 16-06-2017
 * Author: Alberto Rossetti
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Alberto Rossetti || 16-06-2017 || integrazione del componente con editorpage
 *
 */



import { Component, OnInit } from '@angular/core';
import {Project} from '../../project';

@Component({
  selector: 'app-codepage',
  templateUrl: './codepage.component.html',
  styleUrls: ['./codepage.component.css']
})
export class CodepageComponent implements OnInit {

  constructor(private project: Project) { }

  ngOnInit() {
    this.project.setSelectedMethod(null, null);
    this.project.setSelectedCode(null);
    this.project.setSelectedFileName(null);
  }

}
