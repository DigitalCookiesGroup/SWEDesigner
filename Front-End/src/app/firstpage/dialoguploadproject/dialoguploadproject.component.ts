/*
 * File: dialoguploadproject.component.ts
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
 * Davide Albertini || 25-05-2017 || creazione metodo read(input) per leggere il file caricato e salvare i contenuto in un JSON
 * Saverio Follador || 25-05-2017 || creazione metodo upload($event) per validare il file caricato
 *
 */

import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {Project} from '../../project';

@Component({
  selector: 'app-dialoguploadproject',
  templateUrl: './dialoguploadproject.component.html',
  styleUrls: ['./dialoguploadproject.component.css']
})
export class DialoguploadprojectComponent implements OnInit {

  validProject = false;
  firstTime = true;

  constructor(public dialogRef: MdDialogRef<any>, private project: Project) { }

  upload($event): void {
    this.firstTime = false;
    // validare il file
    // se non valido imposta validProject==true;
    // se valido imposta validProject==false e chiama la roba qua sotto
    this.read($event.target);
  }

  read(input: any): void {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // salva il contenuto del json caricato nella classe progetto
      this.project.setDiagram(reader.result);
    };
    reader.readAsText(file);
  }

  ngOnInit() {
  }

}
