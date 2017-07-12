/*
 * File: activitydiagrameditor.component
 * Version: 1.0
 * Type: typescript
 * Date: 31-05-2017
 * Author: Carlo Sindico, Alberto Giudice, Alessia Bragagnolo
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alessia Bragagnolo || 03-06-2017 || correzioni e aggiunta di listener all'editor
 * Alberto Giudice || 01-06-2017 || creazione template per i blocchi del diagramma delle attività
 * Carlo Sindico || 31-05-2017 || creazione componenti della libreria GoJS
 *
 */


import {Component, ElementRef, AfterViewInit, ViewChild, AfterViewChecked} from '@angular/core';
import * as go from 'gojs';
import {Project} from '../../../project';
import {TemplateService} from 'app/services/template.service';

@Component({
  selector: 'app-activitydiagrameditor',
  templateUrl: './activitydiagrameditor.component.html',
  styleUrls: ['./activitydiagrameditor.component.css'],
})

export class ActivitydiagrameditorComponent implements AfterViewInit, AfterViewChecked {


  //ottengo l'id html che conterrà l'editor
  @ViewChild('activityDiagramDiv') element: ElementRef;

  constructor(private project: Project, private templateService: TemplateService) {}

  /* funzione che viene chiamata quando il componente ActivityDiagramEditor viene creato
   */
	ngAfterViewInit() {

		const $ = go.GraphObject.make;

		let index = 0;


    //creazione template per il nodo start
    const starttemplate =
      $(go.Node, 'Auto', {width: 90, height: 90}, { deletable: false },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Circle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'key').makeTwoWay()),
        )
      );


    //creazione template per il textblock tipovalore all'interno del blocco variabile
    const tipovaloreTemplate =
      $(go.Panel, 'Horizontal',

        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'type').makeTwoWay(),
          new go.Binding('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
          })),

        $(go.TextBlock, '',
          new go.Binding('text', 'name', function (t) {
            return (t ? ': ' : '');
          })),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'name').makeTwoWay()),

        $(go.TextBlock,
          {isMultiline: false, editable: false},
          new go.Binding('text', 'default', function (s) {
            return s ? ' = ' + s : '';
          })),
        $(go.TextBlock, {visible: false},
          new go.Binding('text', 'tipovaloreID').makeTwoWay()),
      );


    const getListaparametri = (e, node) => {
      const par = this.project.getSelectedMethodParamsCarlo();

      const array = par[0].split('(');
      const arr = array[1].split(')');
      let res = [];

      for (let i = 0; i < arr[0].length; i++){
        res = arr[0].split(',');
        myDiagram.startTransaction('agggiunta lista parametro');
        myDiagram.model.setDataProperty(node.part.data, 'menudata', res);
        myDiagram.commitTransaction('agggiunta lista parametro');
      }
    };


    const changeVariabile = (e, obj) => {
      var testo=(obj.data).split(":");
      var nomev=testo[0];
      var tipov=testo[1];


      myDiagram.startTransaction('Change nome variabile esistente');
      myDiagram.model.setDataProperty(obj.part.adornedPart.data, 'nomevariabile',nomev);
      myDiagram.commitTransaction('Changed nome variabile esistente');


      myDiagram.startTransaction('Change tipo variabile esistente');
      myDiagram.model.setDataProperty(obj.part.adornedPart.data.tipivalori[0], 'type', tipov);
      myDiagram.commitTransaction('Changed tipo variabile esistente');


      myDiagram.startTransaction('Change default value variabile esistente');
      myDiagram.model.setDataProperty(obj.part.adornedPart.data.tipivalori[0], 'name',"");
      myDiagram.commitTransaction('Changed default value variabile esistente');

    };


    //creazione template per il nodo variabile
    const variabiletemplate =
      $(go.Node, 'Auto',
        {
          contextMenu:
            $(go.Adornment, 'Vertical',
              new go.Binding('itemArray', 'menudata'),
              {
                itemTemplate:
                  $('Button', {width: 150}, { click: function(e, obj) { changeVariabile(e, obj); } },
                    $(go.TextBlock, new go.Binding('text', ''))
                  )
              }),
          mouseOver: getListaparametri
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Procedure', {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new go.Size(176, 50),
            portId: '', fromLinkable: true,
            toLinkable: true,
            toMaxLinks: 1,
            fromMaxLinks: 1,
            cursor: 'pointer'
          },
          new go.Binding('fill', 'color').makeTwoWay()
        ),
        $(go.Panel, 'Table',
          //linea che separa nomevariabile dal suo tipo e valore
          {minSize: new go.Size(160, 50)},
          $(go.RowColumnDefinition, {row: 2, separatorStrokeWidth: 1.5, separatorStroke: 'black'}),
          $(go.RowColumnDefinition, {row: 4, separatorStrokeWidth: 1.5, separatorStroke: 'black'}),

          $(go.TextBlock,
            {
              row: 1, alignment: go.Spot.Center,
              font: 'bold 12pt sans-serif',
              isMultiline: false,
              editable: true
            },
            new go.Binding('text', 'nomevariabile').makeTwoWay()),
          //Scritta che viene mostrata quando il pannello è ridotto
          $(go.TextBlock, 'Tipo-valore',
            {row: 4, font: 'italic 10pt sans-serif'},
            new go.Binding('visible', 'visible', function (v) {
              return !v;
            }).ofObject('TIPOVALORE')),
          // parametri
          $(go.Panel, 'Vertical', {name: 'TIPOVALORE'},
            new go.Binding('itemArray', 'tipivalori'),
            {
              row: 4, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left,
              itemTemplate: tipovaloreTemplate
            },
            new go.Binding('visible', 'variabileVisible').makeTwoWay()
          ),
          $('PanelExpanderButton', 'TIPOVALORE',
            {row: 4, visible: false, column: 1, alignment: go.Spot.TopRight},
            new go.Binding('visible', 'tipivalori', function (arr) {
              return arr.length > 0;
            })
          ),

        ),
      );


    /* funzione che aggiorna parametersCount in seguito all'aggiunta di un parametro
      @param {node} - node rappresenta il nodo del diagramma
      @param {integer} - lng è la lunghezza dell'array parameters che appartiene al nodo chiamatametodo
     */
    function updateParametersCount(node, lng) {
      myDiagram.model.setDataProperty(node.data, 'parametersCount', lng);
    }


    /* funzione che aggiunge un parametro tipovalore nel blocco chiamatametodo
     @param {obj} - obj è un parametro che definisce gojs in questo caso rappresenta l'oggetto nodo
     */
    function addParam(e, obj) {
      const node = obj.part;
      const data = node.data;
      if (data) {
        updateParametersCount(node, data.parameters.length);
        node.diagram.startTransaction('nuovo parametro');
        myDiagram.model.addArrayItem(data.parameters, {
          type: 'Tipo', variabile: 'Variabile' + ((data.parametersCount) + 1).toString(),  name: 'Valore',
        parametersID: data.parametersCount++
        });
        node.diagram.commitTransaction('nuovo parametro');
      }
    };


    /* funzione che  rimuove un parametro dal blocco chiamatametodo
     @param {obj} - obj è un parametro che definisce gojs in questo caso rappresenta l'oggetto nodo
     */
    function removeParam(e, obj) {
      const node = obj.part;
      const data = node.data;
      let ind = Number(obj.text);

      if (data) {
        node.diagram.startTransaction('rimosso parametro');
        myDiagram.model.removeArrayItem(data.parameters, ind);
        for (; ind < data.parameters.length; ind++) {
          myDiagram.model.setDataProperty(data.parameters[ind], 'paramatersID', ind);
        }
        node.diagram.commitTransaction('rimosso parametro');
        updateParametersCount(node, data.parameters.length);
      }
    };


    //creazione template per il textblock parametro all'interno del blocco chiamatametodo
    const methodTemplate =
      $(go.Panel, 'Horizontal', {defaultAlignment: go.Spot.Center },
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'type').makeTwoWay(),
          new go.Binding('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
          })),
        $(go.TextBlock, ''
          ),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'variabile').makeTwoWay(),
          new go.Binding('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
          })),
        $(go.TextBlock, '',
          new go.Binding('text', 'parameters', function (p) {
            return (p ? '(' : '()');
          })),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'parameters').makeTwoWay()),
        $(go.TextBlock, '',
          new go.Binding('text', 'parameters', function (p) {
            return (p ? ')' : '');
          })),
        $(go.TextBlock, '',
          new go.Binding('text', 'name', function (t) {
            return (t ? ': ' : '');
          })),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'name').makeTwoWay()),

        $(go.TextBlock, ' ', {editable: false}),

        $(go.Panel,
          $(go.TextBlock, 'x', {font: 'bold 10pt Verdana, sans-serif', stroke: 'red'}),
          $(go.TextBlock,
            new go.Binding('text', 'methodID').makeTwoWay(), {opacity: 0}, {click: removeParam})
        )
      );

    //creazione template nodo chiamatametodo
    const chiamatametodotemplate =
      $(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'DividedEvent', {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new go.Size(150, 50),
            portId: '', fromLinkable: true,
            toLinkable: true,
            toMaxLinks: 1,
            fromMaxLinks: 1,
            cursor: 'pointer'
          },
          new go.Binding('fill', 'color').makeTwoWay()
        ),
        $(go.Panel, 'Table',
          //linea che separa nomemetodo dai suoi parametri
          {minSize: new go.Size(200, 50)},
          $(go.RowColumnDefinition, {row: 2, separatorStrokeWidth: 1.5, separatorStroke: 'black'}),
          $(go.RowColumnDefinition, {row: 4, separatorStrokeWidth: 1.5, separatorStroke: 'black'}),

          $(go.TextBlock,
            {
              row: 1, alignment: go.Spot.Center,
              font: 'bold 12pt sans-serif',
              isMultiline: false,
              editable: true
            },
            new go.Binding('text', 'nomemetodo').makeTwoWay()),
          //Scritta che viene mostrata quando il pannello è ridotto
          $(go.TextBlock, 'Parametri',
            {row: 2, font: 'italic 10pt sans-serif'},
            new go.Binding('visible', 'visible', function (v) {
              return !v;
            }).ofObject('PARAMETRI')),
          $(go.TextBlock, '+',
            {
              name: 'aggiuntaparametro',
              stroke: 'green',
              margin: 2,
              row: 2,
              column: 2,
              font: 'bold 14pt sans-serif',
              alignment: go.Spot.BottomRight,
              click: addParam
            },
            new go.Binding('visible', 'visible', function (v) {
              return v;
            }).ofObject('PARAMETRI')),
          // parametri
          $(go.Panel, 'Vertical', {name: 'PARAMETRI'},
            new go.Binding('itemArray', 'parameters').makeTwoWay(),
            {
              row: 2, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left,
              itemTemplate: methodTemplate
            },
            new go.Binding('visible', 'chiamatametodoVisible').makeTwoWay()
          ),
          $('PanelExpanderButton', 'PARAMETRI',
            {row: 2, visible: false, column: 3, alignment: go.Spot.TopRight},
            new go.Binding('visible', 'parameters', function (arr) {
              return arr.length > 0;
            })
          )
        ),
      );


    //creazione template nodo ciclo
    const ciclotemplate =
      $(go.Node, 'Auto', {width: 100, height: 90},
        $(go.Shape, 'RoundedRectangle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );


    //creazione template nodo ciclocondizone all'interno di ciclo
    const ciclocondizionetemplate =
      $(go.Node, 'Auto', {width: 120, height: 50},
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Bottom },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );


    //creazione template nodo ciclocorpo all'interno di ciclo
    const ciclocorpotemplate =
      $(go.Node, 'Auto', {width: 80, height: 100},
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Bottom },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );


    //creazione template nodo ifelse
    const ifelsetemplate =
      $(go.Node, 'Auto', {width: 100, height: 90},
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );


    //creazione template nodo ifcondizione all'interno di ifelse
    const ifcondizionetemplate =
      $(go.Node, 'Auto', {width: 120, height: 50},
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Bottom },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );


    //creazione template nodo ifcorpo all'interno di ifelse
    const ifcorpotemplate =
      $(go.Node, 'Auto', {width: 80, height: 100},
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Bottom },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );


    //creazione template nodo elsecorpo all'interno di ifelse
    const elsecorpotemplate =
      $(go.Node, 'Auto', {width: 80, height: 100},
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Bottom },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );


    //creazione template nodo operatore
    const operatoretemplate =
      $(go.Node, 'Auto', {width: 100, height: 30},
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape,
          {fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );

    //creazione template nodo sxoperatore all'interno di operatore
    const sxoperatoretemplate =
      $(go.Node, 'Auto', {width: 60, height: 60},
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Bottom },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );

    //creazione template nodo dxoperatore all'interno di operatore
    const dxoperatoretemplate =
      $(go.Node, 'Auto', {width: 60, height: 60},
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Bottom },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: true, isMultiline: true}, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()),
        )
      );

    //creazione template nodo operazione all'interno di operatore
    const operazioneoperatoretemplate =
      $(go.Node, 'Auto',
        {
          contextMenu: //menu per la scelta della priorità
            $(go.Adornment, 'Vertical',
              { alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom },
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '*');
              }},  $(go.TextBlock, '*', {textAlign: 'center' , width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '+');
              }},  $(go.TextBlock, '+', {textAlign: 'center' , width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '-');
              }},  $(go.TextBlock, '-', {textAlign: 'center', width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '.');
              }},  $(go.TextBlock, '.', {textAlign: 'center' , width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '->');
              }},  $(go.TextBlock, '->', {textAlign: 'center' , width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '=');
              }},  $(go.TextBlock, '=', {textAlign: 'center', width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '===');
              }},  $(go.TextBlock, '===', {textAlign: 'center', width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '!=');
              }},  $(go.TextBlock, '!=', {textAlign: 'center', width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '<');
              }},  $(go.TextBlock, '<', {textAlign: 'center' , width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '>');
              }},  $(go.TextBlock, '>', {textAlign: 'center', width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '--');
              }},  $(go.TextBlock, '--', {textAlign: 'center', width: 30, height: 10 })),
              $('Button', { click: function(e, obj) { changeOperatore(obj.part, '++');
              }},  $(go.TextBlock, '++', {textAlign: 'center', width: 30, height: 10 }))

            )
        },


        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Diamond', {width: 165, height: 60},
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock, '', {visible: false},
            new go.Binding('text', 'key')),
          $(go.TextBlock,
            {editable: false, isMultiline: false}, { row: 0, column: 0, font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'nome').makeTwoWay()
            )
        )
      );



    //creazione template per il textblock descrizionejolly all'interno del blocco jolly
    const descrizionejollyTemplate =
      $(go.Panel, 'Horizontal',
        $(go.TextBlock,
          {isMultiline: true, editable: true},
          new go.Binding('text', 'testo').makeTwoWay()),

        $(go.TextBlock, {visible: false},
          new go.Binding('text', 'testoID').makeTwoWay()),
      );


    //creazione template nodo jolly
    const jollytemplate =
      $(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'ExternalOrganization', {
            name: 'SHAPE',
            fill: 'white', strokeWidth: 1,
            minSize: new go.Size(176, 50),
            portId: '', fromLinkable: true,
            toLinkable: true,
            toMaxLinks: 1,
            fromMaxLinks: 1,
            cursor: 'pointer'
          },
          new go.Binding('fill', 'color').makeTwoWay()
        ),
        $(go.Panel, 'Table',
          //Scritta che viene mostrata quando il pannello è ridotto
          $(go.TextBlock, 'Jolly', { row: 0, margin: 3, font: 'bold 12pt sans-serif' },
            new go.Binding('visible', 'visible', function (v) {
              return !v;
            }).ofObject('TESTO')),
          // parametri
          $(go.Panel, 'Vertical', {name: 'TESTO'},
            new go.Binding('itemArray', 'descrizione'),
            {
              row: 0, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Center,
              itemTemplate: descrizionejollyTemplate
            },
            new go.Binding('visible', 'jollyVisible').makeTwoWay()
          ),
          $('PanelExpanderButton', 'TESTO',
            {row: 0, visible: false, column: 1, alignment: go.Spot.TopRight},
            new go.Binding('visible', 'descrizione', function (arr) {
              return arr.length > 0;
            })
          ),

        ),
      );


    //creazione template nodo end

    const endtemplate =
      $(go.Node, 'Auto', {width: 90, height: 90}, { deletable: false },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Circle',
          { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock, {
              editable: false}, { font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'key')),
        )
      );

  //associazione per ogni nodo il suo template creato precedentemente
  const templmap = new go.Map('string', go.Node);
    templmap.add('start', starttemplate);
    templmap.add('end', endtemplate);
    templmap.add('variabile', variabiletemplate);
    templmap.add('chiamatametodo', chiamatametodotemplate);
    templmap.add('ciclo', ciclotemplate);
    templmap.add('ciclocondizione', ciclocondizionetemplate);
    templmap.add('ciclocorpo', ciclocorpotemplate);
    templmap.add('ifelse', ifelsetemplate);
    templmap.add('ifcondizione', ciclocondizionetemplate);
    templmap.add('ifcorpo', ciclocorpotemplate);
    templmap.add('elsecorpo', elsecorpotemplate);
    templmap.add('operatore', operatoretemplate);
    templmap.add('operazione', operazioneoperatoretemplate);
    templmap.add('sxoperatore', sxoperatoretemplate);
    templmap.add('dxoperatore', dxoperatoretemplate);
    templmap.add('jolly', jollytemplate);


    //creazione variabile MyDiagram per le operazioni sull'editor
    const myDiagram: go.Diagram = $(go.Diagram,  this.element.nativeElement,
      {
        allowDrop: true,
        allowCopy: false,
        nodeTemplateMap: templmap,
        'undoManager.isEnabled': true,
        'initialContentAlignment': go.Spot.Center,
        //sfondo
        grid: $(go.Panel, 'Grid',
          $(go.Shape, 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),
          $(go.Shape, 'LineH', { stroke: 'gray', strokeWidth: 0.5, interval: 10 }),
          $(go.Shape, 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 }),
          $(go.Shape, 'LineV', { stroke: 'gray', strokeWidth: 0.5, interval: 10 })
        ),


        'draggingTool.dragsLink': true,
        'draggingTool.isGridSnapEnabled': true,
        'linkingTool.isUnconnectedLinkValid': true,
        'relinkingTool.isUnconnectedLinkValid': true,


        //layout per i link selezionati nel diagramma
        'relinkingTool.fromHandleArchetype': $(go.Shape, 'Diamond', {
          segmentIndex: 0,
          cursor: 'pointer',
          desiredSize: new go.Size(8, 8),
          fill: 'tomato',
          stroke: 'darkred'
        }),
        'relinkingTool.toHandleArchetype': $(go.Shape, 'Diamond', {
          segmentIndex: -1,
          cursor: 'pointer',
          desiredSize: new go.Size(8, 8),
          fill: 'darkred',
          stroke: 'tomato'
        }),
        'linkReshapingTool.handleArchetype': $(go.Shape, 'Diamond', {
          desiredSize: new go.Size(7, 7),
          fill: 'lightblue',
          stroke: 'deepskyblue'
        })


      });


    //adornment per i link
    const linkSelectionAdornmentTemplate =
      $(go.Adornment, 'Link',
        $(go.Shape,

          {  isPanelMain: true, fill: null, stroke: null, strokeWidth: 0 })
      );


    //creazione template link Avanzamento
    myDiagram.linkTemplateMap.add('',
      $(go.Link,
        {selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate},
        {relinkableFrom: true, relinkableTo: true, reshapable: true},
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 2
        },
        new go.Binding('location', 'loc').makeTwoWay(),
        new go.Binding('points').makeTwoWay(),
        $(go.Shape,
          {stroke: 'black', isPanelMain: true, strokeWidth: 2}),
        $(go.Shape,  // the arrowhead
          {fill: 'black', toArrow: 'OpenTriangle', scale: 1, stroke: 'black', strokeWidth: 1.7}),
      )
    );



		//serve per il resize dei blocchi
    myDiagram.commandHandler.selectAll();

    const div = myDiagram.div;
    div.style.height = '100%';
    div.style.width = '100%';
    myDiagram.requestUpdate();



    //creazione template per i gruppi di nodi
    myDiagram.groupTemplate =
      $(go.Group, 'Auto',
        new go.Binding('isSubGraphExpanded', 'groupVisible').makeTwoWay(),
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          background: '#ededed',
           mouseDragEnter: function(e, grp, prev) { highlightGroup(e, grp, true); },
            mouseDragLeave: function(e, grp, next) { highlightGroup(e, grp, false); },
          computesBoundsAfterDrag: true,
          //////proprietà aggiunte per la location dei nodi:
          mouseDrop: finishDrop,
          handlesDragDropForMembers: true,
          layout:
            $(go.GridLayout,
              { alignment: go.GridLayout.Location,
                cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4) })
        },
        new go.Binding('background', 'isHighlighted', function(h) { return h ? 'rgba(255,0,0,0.2)' : 'white'; }).ofObject(),
        $(go.Shape, 'Rectangle',
          { fill: null, stroke: '#FFDD33', strokeWidth: 12, portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 },
          new go.Binding('stroke', 'groupColor')),
        $(go.Panel, 'Vertical',
          {minSize: new go.Size(155, 10)},
          $(go.Panel, 'Horizontal',
            { stretch: go.GraphObject.Horizontal, background: '#FFDD33' },
            new go.Binding('background', 'groupColor'),
            $('SubGraphExpanderButton',
              { alignment: go.Spot.Right, margin: 5 }),
            $(go.TextBlock,
              {
                alignment: go.Spot.Center,
                editable: true,
                font: 'bold 18px sans-serif',
                stroke: '#212121'
              },
              new go.Binding('text', 'nome').makeTwoWay())
          ),
          $(go.Placeholder,
            { padding: 5, margin: 5, visible: true })
        )
      );



    /* funzione che  illummina area di inserimento di un blocco dentro un gruppo
     @param {e, grp} - e, grp sono parametri di gojs e rappresentano gli eventi legati al drag and drop dei blocchi
     @param {bool} - show è una variabile booleana che viene settata a true o false a seconda degli eventi mousedragenter e mousedragleave
     */
    function highlightGroup(e, grp, show) {
      if (!grp) return;
      e.handled = true;
      if (show) {

        const tool = grp.diagram.toolManager.draggingTool;
        const map = tool.draggedParts || tool.copiedParts;

        if (grp.canAddMembers(map.toKeySet())) {
          grp.isHighlighted = true;
          return;
        }
      }
      grp.isHighlighted = false;
    }


    /* funzione che aggiunge un nodo all'interno del guppo
     @param {e, grp} - e, grp sono parametri di gojs e rappresentano gli eventi legati al drag and drop dei blocchi
     */
    function finishDrop(e, grp) {
      const ok = (grp !== null
        ? grp.addMembers(grp.diagram.selection, true)
        : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
      if (!ok) e.diagram.currentTool.doCancel();
    }


    const methods = document.getElementsByClassName('method');

    for (let i = 0; i < methods.length; ++i) {
      methods[i].addEventListener('click', (e) => {
        console.log(this.project.getSelectedMethodDiagram());
        myDiagram.model = go.Model.fromJson(this.project.getSelectedMethodDiagram()),
          $(go.GraphLinksModel,
            {
              copiesArrays: true,
              copiesArrayObjects: true
            }
          );
        console.log(this.project.getSelectedMethodDiagram());
      });
    }

    myDiagram.addDiagramListener('LayoutCompleted', (e) => {
      if (index >= 3) {
        console.log(myDiagram.model.toJson());
        this.project.setSelectedMethodDiagram(myDiagram.model.toJson());
      }else{
        ++index;
      }
    });

    myDiagram.addDiagramListener('Modified', (e) => {
      if (index >= 3) {
        console.log(myDiagram.model.toJson());
        this.project.setSelectedMethodDiagram(myDiagram.model.toJson());
      }else{
        ++index;
      }
    });

    myDiagram.addDiagramListener('ChangingSelection', (e) => {
      if (index >= 3) {
        console.log(myDiagram.model.toJson());
        this.project.setSelectedMethodDiagram(myDiagram.model.toJson());
      }else{
        ++index;
      }
    });

    document.getElementById("containerActivityDX").addEventListener('click', (e) => {
      setTimeout(() => {
        myDiagram.animationManager.isEnabled = false;
        myDiagram.model = go.Model.fromJson(this.project.getSelectedMethodDiagram(),
          $(go.GraphLinksModel,
            {
              copiesArrays: true,
              copiesArrayObjects: true
            }
          )
        );
        myDiagram.animationManager.isEnabled = true;
      }, 500);
    });

    /* funzione che modifica il tipo di operatore all'interno del blocco operazione
     @param {node, newoperator} - node è un parametro di tipo Node che si riferisce la nodo operazione
     - newoperator è un parametro di tipo stringa che rappresenta il nuovo operatore da inserire*/
    function changeOperatore(node, newoperator) {
      myDiagram.startTransaction('change block operator');
      myDiagram.model.setDataProperty(node.data, 'nome', newoperator);
      myDiagram.commitTransaction('Changed block operator');

    };
  }

  ngAfterViewChecked() {
    const sxcol = document.getElementsByClassName('insertMethod');
    for ( let i = 0; i < sxcol.length; ++i) {
      if (sxcol[i].getAttribute('listened') === 'false') {
        sxcol[i].setAttribute('listened', 'true');
        sxcol[i].addEventListener('click', (e) => {
          // si fa dare il template dal service con Id
          this.templateService.getTemplate(sxcol[i].id).subscribe(data =>
            this.project.addPatternToActivityDiagram(data));
        });
      }
    }
  }

}

