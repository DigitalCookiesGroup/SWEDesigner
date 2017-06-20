/*
 * File: dialognewproject.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 24-05-2017
 * Author: Saverio Follador, Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Davide Albertini || 24-05-2017 || integrazione con firstpage
 * Saverio Follador || 24-05-2017 || creazione componente dialognewproject
 *
 */



import { Component, OnInit, Input } from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {Project} from '../../project';
@Component({
  selector: 'app-dialognewproject',
  templateUrl: './dialognewproject.component.html',
  styleUrls: ['./dialognewproject.component.css'],
})
export class DialognewprojectComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<any>, private project: Project) { }

  ngOnInit() {
  }

}
