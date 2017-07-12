/*
 * File: codeditor.component.ts
 * Version: 0.9
 * Type: typescript
 * Date: 19-06-2017
 * Author: Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Saverio Follador || 19-06-2017 || integrazione con il componente editorpage
 *
 */

import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {Project} from '../../../project';

import 'brace/theme/sqlserver';
import 'brace/mode/java';

@Component({
  selector: 'app-codeditor',
  templateUrl: './codeditor.component.html',
  styleUrls: ['./codeditor.component.css']
})
export class CodeditorComponent implements AfterViewInit {

  constructor(private project: Project) { }

  ngAfterViewInit() {

  }

}
