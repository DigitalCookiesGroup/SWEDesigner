/*
 * File: code.service.ts
 * Version: 1.0
 * Type: typescript
 * Date: 15-06-2017
 * Author: Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Saverio Follador || 15-06-2017 || creazione metodo getGeneratedCode() per fare una richiesta http e ottenere il codice generato dal Back-end
 *
 */




import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CodeService {

  private host = '';

  constructor(private http: Http) {}

  getGeneratedCode(dia: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    console.log(dia);

    return this.http.post(this.host, dia, options)
        .map(this.elaborate);
  }

  elaborate(res: Response) {
    // console.log(res.text());
    return res.text();
  }
}
