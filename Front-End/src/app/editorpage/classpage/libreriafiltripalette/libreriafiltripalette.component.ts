/*
 * File: libreriafiltripalette.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 29-05-2017
 * Author: Christian Cabrera, Davide ALbertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Davide Albertini || 31-05-2017 || collegamento della palette a classdiagrameditor.component
 * Christian Cabrera || 29-05-2017 || creazione metodi per recuperare i pattern e le classi dal Back_end
 *
 */

import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../../services/template.service';
import { Project } from '../../../project';

@Component({
  selector: 'app-libreriafiltripalette',
  templateUrl: './libreriafiltripalette.component.html',
  styleUrls: ['./libreriafiltripalette.component.css']
})
export class LibreriafiltripaletteComponent implements OnInit {

  //private classes: string[] = ['class1', 'class2', 'class3']; // inizializzato a mano per prova
  private classes;
  private patterns; // inizializzato a mano per prova
  private toggleList1 = false;
  private toggleList2 = false;

  constructor(private templateService: TemplateService, private project: Project) {}

  retrieveClassesList() {
    // da invocare nel costruttore
    // pesca lista classi libreria da mongo e
    // la salva nell'array classes
    this.templateService.getClassesList().subscribe(classes => this.classes = classes);
  }

  retrievePatternList() {
    // da invocare nel costruttore
    // pesca lista pattern da mongo e
    // la salva nell'array patterns
    this.templateService.getPatternsList().subscribe(data => this.patterns = data);
  }

  isChecked1 = this.project.getCheckbox(1);
  isChecked2 = this.project.getCheckbox(2);
  isChecked3 = this.project.getCheckbox(3);
  isChecked4 = this.project.getCheckbox(4);

  toggle(index) {
    if(index === 1)
    {this.isChecked1 = !this.isChecked1;
        this.project.setCheckbox(index, this.isChecked1);
    }
    else if(index === 2)
    {this.isChecked2 = !this.isChecked2;
      this.project.setCheckbox(index, this.isChecked2);
    }
    else if(index === 3)
    {this.isChecked3 = !this.isChecked3;
      this.project.setCheckbox(index, this.isChecked3);
    }
    else if(index === 4)
    {this.isChecked4 = !this.isChecked4;
      this.project.setCheckbox(index, this.isChecked4);
    }
  }

  open1() {
    //console.log(this.classes.Id);
    this.toggleList1 = !this.toggleList1;
    this.toggleList2 = false;
  }

  open2() {
    this.toggleList1 = false;
    this.toggleList2 = !this.toggleList2;
  }

  ngOnInit() {
    this.retrieveClassesList();
    this.retrievePatternList();
  }


}
