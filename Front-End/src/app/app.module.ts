import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogModule } from '@angular/material';
import 'hammerjs';
import { AceEditorDirective } from 'ng2-ace-editor';

import { AppComponent } from './app.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { DialognewprojectComponent } from './firstpage/dialognewproject/dialognewproject.component';
import { DialoguploadprojectComponent } from './firstpage/dialoguploadproject/dialoguploadproject.component';
import { RouterModule } from '@angular/router';
import { EditorpageComponent } from './editorpage/editorpage.component';
import { ClasspageComponent } from './editorpage/classpage/classpage.component';
import { ClassdiagrameditorComponent } from './editorpage/classpage/classdiagrameditor/classdiagrameditor.component';
import { ClassdiagrampaletteComponent } from './editorpage/classpage/classdiagrampalette/classdiagrampalette.component';
import { ActivitypageComponent } from './editorpage/activitypage/activitypage.component';
import { ActivitydiagrameditorComponent } from './editorpage/activitypage/activitydiagrameditor/activitydiagrameditor.component';
import { ActivitydiagrampaletteComponent } from './editorpage/activitypage/activitydiagrampalette/activitydiagrampalette.component';
import { LibreriafiltripaletteComponent } from './editorpage/classpage/libreriafiltripalette/libreriafiltripalette.component';
import { ClassimetodipaletteComponent } from './editorpage/activitypage/classimetodipalette/classimetodipalette.component';
import { CodepageComponent } from './editorpage/codepage/codepage.component';
import { CodeditorComponent } from './editorpage/codepage/codeditor/codeditor.component';
import { CodelistafilepaletteComponent } from './editorpage/codepage/codelistafilepalette/codelistafilepalette.component';
import { CodegeneratepaletteComponent } from './editorpage/codepage/codegeneratepalette/codegeneratepalette.component';
import { Project } from './project';
import { LibreriapaletteComponent } from './editorpage/activitypage/libreriapalette/libreriapalette.component';
import {TemplateService} from './services/template.service';
import {CodeService} from './services/code.service';

@NgModule({
  declarations: [
    AppComponent,
    FirstpageComponent,
    DialognewprojectComponent,
    DialoguploadprojectComponent,
    EditorpageComponent,
    ClasspageComponent,
    ClassdiagrameditorComponent,
    ClassdiagrampaletteComponent,
    ActivitypageComponent,
    ActivitydiagrameditorComponent,
    ActivitydiagrampaletteComponent,
    LibreriafiltripaletteComponent,
    ClassimetodipaletteComponent,
    CodepageComponent,
    CodeditorComponent,
    CodelistafilepaletteComponent,
    CodegeneratepaletteComponent,
    AceEditorDirective,
    LibreriapaletteComponent,


  ],
  entryComponents: [DialognewprojectComponent, DialoguploadprojectComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdDialogModule,
    HttpModule,

    RouterModule.forRoot([
    {
    path: '',
    component: FirstpageComponent
    },



    { path: 'editorpage', component: EditorpageComponent,

        children: [
        { path: 'classpage', component: ClasspageComponent},
        { path: 'activitypage', component: ActivitypageComponent,
          children: [ {path: 'libreriapage', component: LibreriapaletteComponent},
            {path: 'activitypalette', component: ActivitydiagrampaletteComponent}, ]},
        { path: 'codepage', component: CodepageComponent},

                 ]
    }

    ])



  ],
  providers: [Project, TemplateService, CodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
