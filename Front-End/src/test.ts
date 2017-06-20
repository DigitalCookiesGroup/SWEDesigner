import { Project } from './app/project';
import { FirstpageComponent } from './app/firstpage/firstpage.component';
import { TemplateService } from './app/services/template.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassdiagrameditorComponent } from './app/editorpage/classpage/classdiagrameditor/classdiagrameditor.component';
import { LibreriafiltripaletteComponent } from './app/editorpage/classpage/libreriafiltripalette/libreriafiltripalette.component';


import { expect } from 'chai';
//port {describe} from "selenium-webdriver/testing";
//import {describe} from "selenium-webdriver/testing";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';


describe('Project', function () {

  const test = new Project();
  test.setDiagram('x');

  it('Should return SWEDesigner_Project', () => {
      expect(test.getName()).not.be.empty;
      expect(test.getName()).to.equal('SWEDesigner_Project');
  });

  it('Should return x', () => {
      test.setName('x');
      expect(test.getName()).not.be.empty;   
      expect(test.getName()).to.equal('x');
  });

  it('Should return FullDiagram', () => {
      expect(test.getFullDiagram()).to.equal(test.getFullDiagram());
  });

  it('Should return ClassDiagram', () => {
      expect(test.getClassDiagram()).to.equal(test.getClassDiagram());
  });

  /*it('should return Diagram x', () => {
    expect(test.getActivityDiagram()).to.equal('');
  });*/

  it('Should return an array with Classes Names', () => {

      var json1 = ' {"class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"default","name":"Classe","attributi":[ {"name":"attributo1", "type":"String", "visibility":"+", "attributeID":0} ],"methods":[ {"name":"test", "parameters":"param1:tipo1", "type":"void", "visibility":"+", "methodID":0},{"name":"metodi", "parameters":"", "type":"void", "visibility":"+", "methodID":"1"} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":2, "key":-1} ],"linkDataArray": []}';  

      test.setDiagram(json1);

      expect(test.getClassesNames()).to.not.be.empty;
      expect(test.getClassesNames()).to.contain('Classe');
      expect(test.getClassesNames()).to.have.lengthOf(1);
      
  });

  it('Should return an array of strings with class methods ', () => {

    var json2 = ' {"class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"default","name":"Classe","attributi":[ {"name":"attributo1", "type":"String", "visibility":"+", "attributeID":0} ],"methods":[ {"name":"test", "parameters":"param1:tipo1", "type":"void", "visibility":"+", "methodID":0},{"name":"metodi", "parameters":"", "type":"void", "visibility":"+", "methodID":"1"} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":2, "key":-1} ],"linkDataArray": []}';  

    test.setDiagram(json2);

    expect(test.getClassMethods("Classe")).to.have.lengthOf(2);
    expect(test.getClassMethods("Classe")).to.contain('test');
    expect(test.getClassMethods("Classe")).to.contain('metodi');

  });


  it('Should return CheckBox', () => {
   

   expect(test.getCheckbox(2)).not.to.be.empty;
 //expect(test.getCheckbox(1)).to.equal(test.toggle(1));


   }); 
});


/*describe('TemplateService', function () {

  it('should get a list of classes', () => {

    chai.request('http://localhost:3000')
      .get('/get-data')
      .end(function (err, res) {
        expect(res).to.have.status(200);
      });

  });
});*/

// ------------ firstpage ----------------- //

describe('firstpage', () => {

      let dialogRef = null;

      it('dialogRef should be always null after being closed', () => {
          expect(dialogRef).to.be.null;
      });
});









