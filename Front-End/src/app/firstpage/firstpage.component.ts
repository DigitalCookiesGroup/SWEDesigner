/*
 * File: firstpage.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 25-05-2017
 * Author: Saverio Follador, Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Davide Albertini || 25-05-2017 || creazione metodo opendialoguploadproject() per aprire la finestra carica progetto
 * Saverio Follador || 25-05-2017 || creazione metodo opendialognewproject() per aprire la finestra nuovo progetto
 *
 */



import { Component } from '@angular/core';
import { DialognewprojectComponent } from './dialognewproject/dialognewproject.component';
import { DialoguploadprojectComponent } from './dialoguploadproject/dialoguploadproject.component';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {Project} from "../project";

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})

export class FirstpageComponent{

	dialogRef: MdDialogRef<any>;




	titoloprogetto: string = "SWEDesigner";
	titoloslogan: string = "Progetta diagrammi UML. Genera codice. Circa.";

  constructor(private project: Project, public dialog: MdDialog) {
    this.project.reset();
  }

    opendialognewproject() {
    this.dialogRef = this.dialog.open(DialognewprojectComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }


  opendialoguploadproject() {
    this.dialogRef = this.dialog.open(DialoguploadprojectComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }


}
