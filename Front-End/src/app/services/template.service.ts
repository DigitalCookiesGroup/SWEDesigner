/*
 * File: template.service.ts
 * Version: 1.0
 * Type: typescript
 * Date: 16-06-2017
 * Author: Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Saverio Follador || 16-06-2017 || creazione metodi per ottenere la lista delle classi e dei pattern recuperati dal Back-end
 *
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TemplateService {

  private host = ''; // cambiare prima di compilare
  private classesUrl = 'template/categoria/tc';
  private patternsUrl = 'template/categoria/dp';
  private templateUrl = 'template/';
  private activityUrl = 'template/categoria/ta';

  constructor(private http: Http) {}

  getClassesList() {
    return this.http.get(this.host + this.classesUrl)
      .map(this.elaborate);
  }

  getPatternsList() {
    return this.http.get(this.host + this.patternsUrl)
      .map(this.elaborate);
  }

  getActivityList() {
    return this.http.get(this.host + this.activityUrl)
      .map(this.elaborate);
  }

  getTemplate(x: string) {
    return this.http.get(this.host + this.templateUrl + x)
      .map(this.elaborate);

  }

  elaborate(res: Response) {
    console.log(res.json());
    return res.json();
  }

}

