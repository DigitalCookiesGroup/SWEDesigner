
import { Component } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { Project } from './project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private project: Project){}
}
