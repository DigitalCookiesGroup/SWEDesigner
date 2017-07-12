/*
 * File: editorpage.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 15-06-2017
 * Author: Carlo Sindico
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Carlo Sindico || 15-06-2017 ||creazione metodo saveproject() per salvare il progetto in un JSON
 *
 */




import { Component, OnInit } from '@angular/core';
import { ClasspageComponent } from './classpage/classpage.component';
import { ActivitypageComponent } from './activitypage/activitypage.component';
import { CodepageComponent } from './codepage/codepage.component';
import * as FileSaver from 'file-saver';
import {Project} from '../project';

@Component({
  selector: 'app-editorpage',
  templateUrl: './editorpage.component.html',
  styleUrls: ['./editorpage.component.css']
})
export class EditorpageComponent implements OnInit {

  constructor(private project: Project) { }

  saveProject() {
    const blob = new Blob([JSON.stringify(this.project.save())], { type: 'text/plain'});
    FileSaver.saveAs(blob, '' + this.project.getName() + '.json');
  }

  ngOnInit() {
  }

}
