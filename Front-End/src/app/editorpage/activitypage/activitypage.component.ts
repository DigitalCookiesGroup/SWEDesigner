/*
 * File: acitivitypage.component
 * Version: 1.0
 * Type: typescript
 * Date: 29-05-2017
 * Author: Carlo Sindico
 * E-mail: digital.cookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Carlo Sindico || 29-05-2017 || creazione componente activitypage per ospitare tutte le componenti relative al diagramma delle attività
 *
 */

import { Component, OnInit } from '@angular/core';
import { ActivitydiagrameditorComponent } from './activitydiagrameditor/activitydiagrameditor.component';
import { ActivitydiagrampaletteComponent } from './activitydiagrampalette/activitydiagrampalette.component';
import {Project} from '../../project';

@Component({
  selector: 'app-activitypage',
  templateUrl: './activitypage.component.html',
  styleUrls: ['./activitypage.component.css']
})
export class ActivitypageComponent implements OnInit {

  public openpalette = false;

  constructor(private project: Project) { }

  open() {
    this.openpalette = !this.openpalette;
  }

  ngOnInit() {
  }

}
