/*
 * File: classdiagrameditor.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 29-05-2017
 * Author: Alessia Bragagnolo, Christian Cabrera, Davide Albertini, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Saverio Follador || 01-06-2017 || correzioni ai listener del diagramma delle classi
 * Davide Albertini || 31-05-2017 || aggiunta metodi per interagire con la priorità di una classe e listener
 * Christian Cabrera || 30-05-2017 || arricchimento template dei blocchi del diagramma delle classi
 * Alessia Bragagnolo || 29-05-2017 || creazione template di base per rappresentare i blocchi del diagramma delle classi
 *
 */


import {
  Component, OnInit, ElementRef, Directive, AfterViewInit, ViewChild, QueryList, ViewChildren, Input,
  AfterViewChecked, AfterContentChecked
} from '@angular/core';
import * as go from 'gojs';
import {Project} from '../../../project';
import {forEach} from '@angular/router/src/utils/collection';
import {TemplateService} from 'app/services/template.service';

@Component({
  selector: 'app-classdiagrameditor',
  templateUrl: './classdiagrameditor.component.html',
  styleUrls: ['./classdiagrameditor.component.css'],
})

export class ClassdiagrameditorComponent implements AfterViewInit, AfterViewChecked {

  @ViewChild('myDiagramDiv') element: ElementRef;

  constructor(private project: Project, private templateService: TemplateService) {}

  ngAfterViewInit() {

    this.project.setSelectedMethod(null, null);

    const $ = go.GraphObject.make;


    const priority1 = this.project.getCheckbox(0);
    let priority2 = this.project.getCheckbox(1);
    let priority3 = this.project.getCheckbox(2);
    let priority4 = this.project.getCheckbox(3);
    let priority5 = this.project.getCheckbox(4);


    const myDiagram: go.Diagram = $(go.Diagram,  this.element.nativeElement,

      {


        initialContentAlignment: go.Spot.Center,
        allowDrop: true, // da trascinare i nodi dalla palette
        allowClipboard: false, //non fa copiare i nodi nel diagramma

        //sfondo
        grid: $(go.Panel, 'Grid',
          $(go.Shape, 'LineH', {stroke: 'lightgray', strokeWidth: 0.5}),
          $(go.Shape, 'LineH', {stroke: 'gray', strokeWidth: 0.5, interval: 10}),
          $(go.Shape, 'LineV', {stroke: 'lightgray', strokeWidth: 0.5}),
          $(go.Shape, 'LineV', {stroke: 'gray', strokeWidth: 0.5, interval: 10})
        ),

        'undoManager.isEnabled': true,
        'draggingTool.dragsLink': true,
        'relinkingTool.isUnconnectedLinkValid': true,


        //layout per le frecce elezionate nel diagramma
        'relinkingTool.fromHandleArchetype': $(go.Shape, 'Diamond', {
          segmentIndex: 0,

          desiredSize: new go.Size(8, 8),
          fill: 'tomato',
          stroke: 'darkred'
        }),
        'relinkingTool.toHandleArchetype': $(go.Shape, 'Diamond', {
          segmentIndex: -1,

          desiredSize: new go.Size(8, 8),
          fill: 'darkred',
          stroke: 'tomato'
        }),
        'linkReshapingTool.handleArchetype': $(go.Shape, 'Diamond', {
          desiredSize: new go.Size(7, 7),
          fill: 'lightblue',
          stroke: 'deepskyblue'
        })
      }
    );

    myDiagram.commandHandler.selectAll(); //serve per fare la resize del commento

    const div = myDiagram.div;
    div.style.height = '100%';
    div.style.width = '100%';
    myDiagram.requestUpdate();

    myDiagram.allowLink = false; //impedisce il disegno delle frecce
    const linkSelectionAdornmentTemplate =
      $(go.Adornment, 'Link',
        $(go.Shape,
          {isPanelMain: true, fill: null, stroke: 'deepskyblue', strokeWidth: 0})  // use selection object's strokeWidth
      );

    myDiagram.linkTemplateMap.add('',
      $(go.Link,
        {selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate},
        {relinkableFrom: true, relinkableTo: true, reshapable: true},
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding('location', 'loc').makeTwoWay(),
        new go.Binding('points').makeTwoWay(),
        $(go.Shape,
          {stroke: 'black', isPanelMain: true, strokeWidth: 2})
      )
    );

    myDiagram.linkTemplateMap.add('Generalizzazione',
      $(go.Link,
        {selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate},
        {relinkableFrom: true, relinkableTo: true, reshapable: true},
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding('location', 'loc').makeTwoWay(),
        new go.Binding('points').makeTwoWay(),
        $(go.Shape,
          {stroke: 'black', isPanelMain: true, strokeWidth: 2}),
        $(go.Shape,  // la punta della freccia
          {fill: 'yellow', toArrow: 'Standard', stroke: 'black', strokeWidth: 1})
      )
    );

    myDiagram.linkTemplateMap.add('Aggregazione',
      $(go.Link,
        {selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate},
        {relinkableFrom: true, relinkableTo: true, reshapable: true},
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding('points').makeTwoWay(),
        $(go.Shape,
          {stroke: 'black', isPanelMain: true, strokeWidth: 2}),
        $(go.Shape,
          {fill: 'yellow', toArrow: 'StretchedDiamond', scale: 1, stroke: 'black', strokeWidth: 1}),
        $(go.TextBlock, ' ',
          {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            stroke: '#1967B3',
            isMultiline: false,
            editable: true,
            minSize: new go.Size(10, NaN),
            segmentIndex: 0,
            background: 'white',
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding('text', 'fromtext').makeTwoWay()),
        $(go.TextBlock, ' ',
          {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            alignment: go.Spot.Left,
            isMultiline: false,
            stroke: '#1967B3',
            editable: true,
            minSize: new go.Size(10, NaN),
            segmentIndex: -1,
            background: 'white',
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding('text', 'totext').makeTwoWay())
      )
    );
    myDiagram.linkTemplateMap.add('Composizione',
      $(go.Link,
        {selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate},
        {relinkableFrom: true, relinkableTo: true, reshapable: true},
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding('location', 'loc').makeTwoWay(),
        new go.Binding('points').makeTwoWay(),
        $(go.Shape,
          {stroke: 'black', isPanelMain: true, strokeWidth: 2}),
        $(go.Shape,  //la punta della freccia
          {fill: 'black', toArrow: 'StretchedDiamond', scale: 1, stroke: 'black', strokeWidth: 1}),
        $(go.TextBlock, ' ',
          {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            stroke: '#1967B3',
            editable: true,
            isMultiline: false,
            minSize: new go.Size(10, NaN),
            segmentIndex: 0,
            background: 'white',
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding('text', 'fromtext').makeTwoWay()),
        $(go.TextBlock, ' ',
          {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            alignment: go.Spot.Left,
            stroke: '#1967B3',
            editable: true,
            isMultiline: false,
            minSize: new go.Size(10, NaN),
            segmentIndex: -1,
            background: 'white',
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding('text', 'totext').makeTwoWay())
      )
    );

    myDiagram.linkTemplateMap.add('Associazione', //mettere cardinalità
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
        $(go.TextBlock, ' ', // label alla partenza della freccia
          {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            stroke: '#1967B3',
            editable: true,
            isMultiline: false,
            minSize: new go.Size(10, NaN),
            segmentIndex: 0,
            background: 'white',
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding('text', 'fromtext').makeTwoWay()),
        $(go.TextBlock, ' ', //label arrrivo della fdreccia
          {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            alignment: go.Spot.Left,
            stroke: '#1967B3',
            editable: true,
            isMultiline: false,
            minSize: new go.Size(10, NaN),
            segmentIndex: -1,
            background: 'white',
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding('text', 'totext').makeTwoWay())
      )
    );

    myDiagram.linkTemplateMap.add('Dipendenza', //mettere cardinalità
      $(go.Link,  // the whole link panel
        {selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate},
        {relinkableFrom: true, relinkableTo: true, reshapable: true},
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 0
        },
        new go.Binding('points').makeTwoWay(),
        $(go.Shape,
          {stroke: 'black', isPanelMain: true, strokeWidth: 2})
      )
    );

    // template per i metodi
    const methodTemplate =
      $(go.Panel, 'Horizontal', {defaultAlignment: go.Spot.Center },
        {
          contextMenu: //menu per la scelta della priorità
            $(go.Adornment, 'Vertical',
              { alignment: go.Spot.Top, alignmentFocus: go.Spot.Right },
              $('Button', { width: 100, click: function(e, obj) { changeVisibilityMethod(obj.part, '+');
              }},  $(go.TextBlock, '(+) public')),
              $('Button', { width: 100, click: function(e, obj) { changeVisibilityMethod(obj.part, '-');
              }},  $(go.TextBlock, '(-) private')),
              $('Button', { width: 100, click: function(e, obj) { changeVisibilityMethod(obj.part, '~');
              }},  $(go.TextBlock, '(~) package')),
              $('Button', { width: 100, click: function(e, obj) { changeVisibilityMethod(obj.part, '#');
              }},  $(go.TextBlock, '(#) protected'))
            )
        },
        $(go.TextBlock,
          {isMultiline: false, editable: false, width: 12},
          new go.Binding('text', 'visibility').makeTwoWay()),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'name').makeTwoWay(),
          new go.Binding('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
          })),
        // parametri del metodo
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
          new go.Binding('text', 'type', function (t) {
            return (t ? ': ' : '');
          })),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'type').makeTwoWay()),

        $(go.TextBlock, ' ', {editable: false}),

        $(go.Panel,
          $(go.TextBlock, 'x', {font: 'bold 10pt Verdana, sans-serif', stroke: 'red'}),
          $(go.TextBlock,
            new go.Binding('text', 'methodID').makeTwoWay(), {opacity: 0}, {click: deleteMetodo})
        )
      );

    myDiagram.nodeTemplateMap.add('Commento',  //definizione del blocco commento
      $(go.Node, 'Auto',
        new go.Binding('location', 'loc').makeTwoWay(),
        $(go.Shape, 'File',
          {fill: '#ff9e80', minSize: new go.Size(170, 60), portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'}
        ),
        $(go.Panel, 'Table',
          {defaultAlignment: go.Spot.Center},
          $(go.TextBlock, 'Commento',
            {row: 2, font: 'bold 12pt sans-serif', margin: 3},
            new go.Binding('visible', 'visible', function (v) {
              return !v;
            }).ofObject('TESTO')),
          $(go.Panel, 'Vertical', {name: 'TESTO'},
            $(go.TextBlock, {editable: true, isMultiline: true, margin: 10},
              {row: 0, column: 0, columnSpan: 2, font: '10pt sans-serif'},
              new go.Binding('text', 'description').makeTwoWay(),
              new go.Binding('visible', 'descvisibile', function (v) {
                return !v;
              }).ofObject('TESTO')),
          new go.Binding('visible', 'commentVisible').makeTwoWay()
          ),
          $('PanelExpanderButton', 'TESTO',
            {row: 0, visible: true, column: 2, alignment: go.Spot.TopRight},
            new go.Binding('visible', 'descvisibile', function (arr) {
              return arr.length > 0;
            })
          )
        )
      )
    );

    const changeColorClass = (e, button) => {
      const node = button.part.adornedPart;
      const shape = node.findObject('SHAPE');
      if (shape === null) return;

      node.diagram.startTransaction('Change color');
      shape.fill = button['_buttonFillNormal'];
      node.diagram.commitTransaction('Change color');

      this.project.setDiagram(myDiagram.model.toJson());
    };


    const attributiTemplate =
      $(go.Panel, 'Horizontal',
        {
          contextMenu: //menu per la scelta della priorità
            $(go.Adornment, 'Vertical',
              { alignment: go.Spot.Top, alignmentFocus: go.Spot.Right },
              $('Button', { width: 100, click: function(e, obj) { changeVisibilityAttribute(obj.part, '+');
              }},  $(go.TextBlock, '(+) public')),
              $('Button', { width: 100, click: function(e, obj) { changeVisibilityAttribute(obj.part, '-');
              }},  $(go.TextBlock, '(-) private')),
              $('Button', { width: 100, click: function(e, obj) { changeVisibilityAttribute(obj.part, '~');
              }},  $(go.TextBlock, '(~) package')),
              $('Button', { width: 100, click: function(e, obj) { changeVisibilityAttribute(obj.part, '#');
              }},  $(go.TextBlock, '(#) protected'))
            )
        },
        $(go.TextBlock,
          {isMultiline: false, editable: false, width: 12},
          new go.Binding('text', 'visibility').makeTwoWay()
          ),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'name').makeTwoWay(),
          new go.Binding('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
          })),
        // tipo della proprietà
        $(go.TextBlock, '',
          new go.Binding('text', 'type', function (t) {
            return (t ? ': ' : '');
          })),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'type').makeTwoWay()),
        // property default value, if any
        $(go.TextBlock,
          {isMultiline: false, editable: false},
          new go.Binding('text', 'default', function (s) {
            return s ? ' = ' + s : '';
          })),

        $(go.TextBlock, ' ', {editable: false}),

        $(go.Panel,
          $(go.TextBlock, 'x', {font: 'bold 10pt Verdana, sans-serif', stroke: 'red'}),
          $(go.TextBlock,
            new go.Binding('text', 'attributeID').makeTwoWay(), {opacity: 0}, {click: deleteAttributo})
        )
      );

    myDiagram.nodeTemplateMap.add('Classe',
      $(go.Node, 'Auto',
        new go.Binding('location', 'loc').makeTwoWay(),
        $(go.Shape, 'Rectangle',  {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new go.Size(150, NaN),
            portId: '', fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer',
            opacity: 1.0
          },
          new go.Binding('fill', 'color').makeTwoWay()
        ), //fine shape

        $(go.Panel, 'Table',
          //linea che separa nome dai metodi
          {minSize: new go.Size(150, NaN)},
          $(go.RowColumnDefinition, {row: 2, separatorStrokeWidth: 1.5, separatorStroke: 'black'}),
          $(go.RowColumnDefinition, {row: 4, separatorStrokeWidth: 1.5, separatorStroke: 'black'}),
          //PreHeader
          $(go.TextBlock,
            {
              name: 'TIPO',
              row: 0, alignment: go.Spot.Center,
              margin: 3,
              font: '10pt sans-serif',
              isMultiline: false,
              editable: false,
              opacity: 0.3
            },
            {
              contextMenu: //menu per la scelta della priorità
                $(go.Adornment, 'Vertical',
                  { alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom },
                  $('Button', { click: function(e, obj) { changeStereotypeClass(obj.part, 'default');
                  }},  $(go.TextBlock, 'default', {textAlign: 'center' , width: 80, height: 15 })),
                  $('Button', { click: function(e, obj) { changeStereotypeClass(obj.part, 'abstract');
                  }},  $(go.TextBlock, 'abstract', {textAlign: 'center' , width: 80, height: 15, font: 'italic 10pt sans-serif' })),
                  $('Button', { click: function(e, obj) { changeStereotypeClass(obj.part, '<<interface>>');
                  }},  $(go.TextBlock, '<<interface>>', {textAlign: 'center' , width: 80, height: 15 }))
                )
            },
            new go.Binding('text', 'tipo').makeTwoWay(),
            new go.Binding('opacity', 'tipoOpacity').makeTwoWay()
          ),

          //Nome della Classe
          $(go.TextBlock,
            {
              row: 1, alignment: go.Spot.Center,
              font: 'bold 12pt sans-serif',
              isMultiline: false,
              editable: true
            },
            new go.Binding('font', 'fontNomeClasse').makeTwoWay(),
            new go.Binding('text', 'name').makeTwoWay()),
          // attributi
          $(go.TextBlock, 'Attributi',
            {row: 2, font: 'italic 10pt sans-serif', margin: 3},
            new go.Binding('visible', 'visible', function (v) {
              return !v;
            }).ofObject('ATTRIBUTI')),
          $(go.TextBlock, '+',
            {
              stroke: 'green',
              margin: 2,
              row: 2,
              column: 2,
              font: 'bold 14pt sans-serif',
              alignment: go.Spot.BottomRight,
              click: addAttributo
            },
            new go.Binding('visible', 'visible', function (v) {
              return v;
            }).ofObject('ATTRIBUTI')
          ),
          $(go.Panel, 'Vertical', {name: 'ATTRIBUTI'},
            new go.Binding('itemArray', 'attributi').makeTwoWay(),
            {
              row: 2, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left,
              itemTemplate: attributiTemplate
            },
            new go.Binding('visible', 'attributeVisible').makeTwoWay()
          ),
          $('PanelExpanderButton', 'ATTRIBUTI',
            {row: 2, visible: true, column: 3, alignment: go.Spot.TopRight},
            new go.Binding('visible', 'notInterface').makeTwoWay()
          ),


          //Scritta che viene mostrata quando il pannello è ridotto
          $(go.TextBlock, 'Metodi',
            {row: 4, font: 'italic 10pt sans-serif', margin: 3},
            new go.Binding('visible', 'visible', function (v) {
              return !v;
            }).ofObject('METHODS')),
          $(go.TextBlock, '+',
            {
              stroke: 'green',
              margin: 2,
              row: 4,
              column: 2,
              font: 'bold 14pt sans-serif',
              alignment: go.Spot.BottomRight,
              click: addMethod
            },
            new go.Binding('visible', 'visible', function (v) {
              return v;
            }).ofObject('METHODS')),
          // methods
          $(go.Panel, 'Vertical', {name: 'METHODS'},
            new go.Binding('itemArray', 'methods').makeTwoWay(),
            {
              row: 4, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left,
              itemTemplate: methodTemplate
            },
            new go.Binding('visible', 'methodVisible').makeTwoWay()
          ),
          $('PanelExpanderButton', 'METHODS',
            {row: 4, visible: false, column: 3, alignment: go.Spot.TopRight},
            new go.Binding('visible', 'methods', function (arr) {
              return arr.length > 0;
            }),
          ),
          printPriorityAdornment(1, '0.2 0', '0.5 1'),
        ),
        {
          contextMenu:                            // define a context menu for each node
            $(go.Adornment, 'Spot',
              $(go.Panel, 'Auto',
                $(go.Placeholder)
              ),
              $(go.Panel, 'Horizontal',
                {alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom},
                $('Button',
                  {'ButtonBorder.fill': '#fff59d', click: changeColorClass},  // defined below, to support changing the color of the node
                  $(go.Shape,
                    {fill: '#fff59d', stroke: null, desiredSize: new go.Size(14, 14)})
                ),
                $('Button',
                  {'ButtonBorder.fill': '#a4cfff', click: changeColorClass},  // defined below, to support changing the color of the node
                  $(go.Shape,
                    {fill: '#a4cfff', stroke: null, desiredSize: new go.Size(14, 14)})
                ),
                $('Button',
                  {'ButtonBorder.fill': '#e1bee7', click: changeColorClass},  // defined below, to support changing the color of the node
                  $(go.Shape,
                    {fill: '#e1bee7', stroke: null, desiredSize: new go.Size(14, 14)})
                ),
                $('Button',
                  {'ButtonBorder.fill': '#acf191', click: changeColorClass},  // defined below, to support changing the color of the node
                  $(go.Shape,
                    {fill: '#acf191', stroke: null, desiredSize: new go.Size(14, 14)})
                ),
                $('Button',
                  {'ButtonBorder.fill': '#64ffda', click: changeColorClass},  // defined below, to support changing the color of the node
                  $(go.Shape,
                    {fill: '#64ffda', stroke: null, desiredSize: new go.Size(14, 14)})
                )
              )
            )  // end Adornment
        }
      )
    );


    const changeStereotypeClass = (node, type) => {
      myDiagram.startTransaction('change type classe');
      myDiagram.model.setDataProperty(node.data, 'tipo', type);
      myDiagram.commitTransaction('Changed type classe');

      adaptStereotypeClass(node);
      //this.project.setDiagram(myDiagram.model.toJson());
    };

    const changeVisibilityAttribute = (node, newvisibility) => {
      myDiagram.startTransaction('change visibility attribute');
      myDiagram.model.setDataProperty(node.data, 'visibility', newvisibility);
      myDiagram.commitTransaction('Changed visibility attribute');

      this.project.setDiagram(myDiagram.model.toJson());
    };

    const changeVisibilityMethod = (node, newvisibility) => {
      myDiagram.startTransaction('change visibility method');
      myDiagram.model.setDataProperty(node.data, 'visibility', newvisibility);
      myDiagram.commitTransaction('Changed visibility method');

      this.project.setDiagram(myDiagram.model.toJson());
    };

    function adaptStereotypeClass(node) {
      if (node.data.tipo === 'default') {
        myDiagram.startTransaction('change opacitytype classe');
        myDiagram.model.setDataProperty(node.data, 'tipoOpacity', 0.3);
        myDiagram.model.setDataProperty(node.data, 'fontNomeClasse', 'bold 12pt sans-serif ');
        myDiagram.commitTransaction('Changed opacity type classe');
      }
      else if (node.data.tipo === 'abstract') {
        myDiagram.startTransaction('change opacitytype classe');
        myDiagram.model.setDataProperty(node.data, 'tipoOpacity', 0.3);
        myDiagram.model.setDataProperty(node.data, 'fontNomeClasse', 'bold italic 12pt sans-serif ');
        myDiagram.commitTransaction('Changed opacity type classe');
      }
      else {
        myDiagram.startTransaction('change opacitytype classe');
        myDiagram.model.setDataProperty(node.data, 'tipoOpacity', 1.0);
        myDiagram.model.setDataProperty(node.data, 'fontNomeClasse', 'bold 12pt sans-serif ');
        myDiagram.commitTransaction('Changed opacity type classe');
      }
      if (node.data.tipo === '<<interface>>') {
        myDiagram.startTransaction('change notInterface');
        myDiagram.model.setDataProperty(node.data, 'notInterface', false);
        myDiagram.commitTransaction('Changed notInterface');

        myDiagram.startTransaction('change attributeVisible');
        myDiagram.model.setDataProperty(node.data, 'attributeVisible', false);
        myDiagram.commitTransaction('Changed attributeVisible');
      }
      else {
        myDiagram.startTransaction('change notInterface');
        myDiagram.model.setDataProperty(node.data, 'notInterface', true);
        myDiagram.commitTransaction('Changed notInterface');

        myDiagram.startTransaction('change attributeVisible');
        myDiagram.model.setDataProperty(node.data, 'attributeVisible', true);
        myDiagram.commitTransaction('Changed attributeVisible');
      }
    }



    function ChangePriority(node, newpriority) { //cambia la priorità della classe
      myDiagram.startTransaction('change Priority');
      myDiagram.model.setDataProperty(node.data, 'priority', newpriority);
      refreshClassOpacity();
      myDiagram.commitTransaction('Changed Priority');

    };


    /*
    function changeColorClass(e, button) {  //cambia il colore della classe con il colore del bottone premuto
      const node = button.part.adornedPart;
      const shape = node.findObject('SHAPE');
      if (shape === null) return;

      node.diagram.startTransaction('Change color');
      shape.fill = button['_buttonFillNormal'];
      node.diagram.commitTransaction('Change color');


      this.project.setDiagram(myDiagram.model.toJson());

    };*/

    function mouseE(e, obj) {
      const shape = obj.findObject('TAPE');
      const testo = obj.findObject('TESTO');
      testo.opacity = 1;
      shape.opacity = 1;
    };

    function mouseL(e, obj) {
      const shape = obj.findObject('TAPE');
      const testo = obj.findObject('TESTO');
      testo.opacity = 0.1;
      shape.opacity = 0.1;
    };

    function printPriorityAdornment(number, align, focus) { //forma della priorità
      //allineamento interno alla forma della classe
      if (typeof align === 'string') align = go.Spot.parse(align);
      if (!align || !align.isSpot()) align = go.Spot.Right;
      if (typeof focus === 'string') focus = go.Spot.parse(focus);
      if (!focus || !focus.isSpot()) focus = align.opposite();
      return $(go.Panel, 'Spot',
        {
          column: 3,
          mouseOver: mouseE,
          mouseLeave: mouseL
        },
        {
          contextMenu: //menu per la scelta della priorità
            $(go.Adornment, 'Vertical',
              { alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom },
              $('Button', { click: function(e, obj) { ChangePriority(obj.part, '1');
              }},  $(go.TextBlock, '1')),
              $('Button', { click: function(e, obj) { ChangePriority(obj.part, '2');
              }},  $(go.TextBlock, '2')),
              $('Button', { click: function(e, obj) { ChangePriority(obj.part, '3');
              }},  $(go.TextBlock, '3')),
              $('Button', { click: function(e, obj) { ChangePriority(obj.part, '4');
              }},  $(go.TextBlock, '4')),
              $('Button', { click: function(e, obj) { ChangePriority(obj.part, '5');
              }},  $(go.TextBlock, '5'))
            )
        },
        { name: number.toString(), alignment: go.Spot.TopRight },
        $(go.Shape, 'TransmittalTape', //forma

          {
            opacity: 0.1,
            name: 'TAPE',
            desiredSize: new go.Size(30, 25),
            fill: 'white', stroke: 'black', strokeWidth: 1, width: 20
          },
          new go.Binding('fill')),
        $(go.TextBlock, number.toString(), //numero contenuto
          // {visible:false},
          {name: 'TESTO', opacity: 0.1, font: '10pt Verdana, sans-serif'},
          new go.Binding('text', 'priority'))
      );
    };



    function addMethod(e, obj) { //aggiunge un metodo al pannello della classe
      const node = obj.part;
      const data = node.data;
      if (data) {
        updateMethodCount(node, data.methods.length);
        node.diagram.startTransaction('nuovo metodo');
        myDiagram.model.addArrayItem(data.methods, {
          name: 'metodo' + ((data.methodCount) + 1).toString(),
          parameters: '', type: 'void', visibility: '+', methodID: data.methodCount++
        });
        node.diagram.commitTransaction('nuovo metodo');
      }
    };

    function deleteMetodo(e, obj) { //rimuove un metodo dal pannello della classe
      const node = obj.part;
      const data = node.data;
      let ind = Number(obj.text);

      if (data) {
        node.diagram.startTransaction('rimosso metodo');
        myDiagram.model.removeArrayItem(data.methods, ind);
        for (; ind < data.methods.length; ind++) {
          myDiagram.model.setDataProperty(data.methods[ind], 'methodID', ind);
        }
        node.diagram.commitTransaction('rimosso metodo');
        updateMethodCount(node, data.methods.length);
      }
    };

    function updateMethodCount(node, lng) {
      myDiagram.model.setDataProperty(node.data, 'methodCount', lng);
    }


    function addAttributo(e, obj) { // aggiunge un attributo al pannello attributi della classe
      const node = obj.part;
      const data = node.data;
      if (data) {
        updateAttributeCount(node, data.attributi.length);
        node.diagram.startTransaction('nuovo attributo');
        myDiagram.model.addArrayItem(data.attributi, {
          name: 'attributo' + ((data.attributeCount) + 1).toString(), type: 'String', visibility: '+',
          attributeID: data.attributeCount++
        });
        node.diagram.commitTransaction('nuovo attributo');
      }
    };

    function deleteAttributo(e, obj) { //rimuove un attributo dal pannello attributi della classe
      const node = obj.part;
      const data = node.data;
      let ind = Number(obj.text);

      if (data) {
        node.diagram.startTransaction('rimosso attributo');
        myDiagram.model.removeArrayItem(data.attributi, ind);
        for (; ind < data.attributi.length; ind++) {
          myDiagram.model.setDataProperty(data.attributi[ind], 'attributeID', ind);
        }
        node.diagram.commitTransaction('rimosso attributo');
        updateAttributeCount(node, data.attributi.length);
      }
    };

    function updateAttributeCount(node, lng) {
      myDiagram.model.setDataProperty(node.data, 'attributeCount', lng);
    }



    myDiagram.addDiagramListener('TextEdited', (e) => { //all'edit di un campo textbox viene aggiornato il jSON
      this.project.setDiagram(myDiagram.model.toJson());
      console.log(this.project.getClassDiagram());

    });

    myDiagram.addDiagramListener('LayoutCompleted', (e) => {
      this.project.setDiagram(myDiagram.model.toJson());
      console.log(this.project.getClassDiagram());
    });


    myDiagram.addDiagramListener('Modified', (e) => {
      refreshClassOpacity();
      this.project.setDiagram(myDiagram.model.toJson());
      console.log(this.project.getClassDiagram());
    });

    myDiagram.addDiagramListener('BackgroundSingleClicked', (e) => {
      this.project.setDiagram(myDiagram.model.toJson());
      console.log(this.project.getClassDiagram());
    });

    document.getElementById('library-items').addEventListener('click', (e) => {
      setTimeout(() => {
        myDiagram.animationManager.isEnabled = false;
        myDiagram.model = go.Model.fromJson(this.project.getClassDiagram(),
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


    const prioritycontrols2 = document.getElementById('check2');

    prioritycontrols2.addEventListener('click', (e) => {  //al cambio della prorità dopo aver toccato lo sfondo aggiorna la visibilità
      priority2 = !this.project.getCheckbox(1);
      refreshClassOpacity();
      this.project.setDiagram(myDiagram.model.toJson());
    });

    const prioritycontrols3 = document.getElementById('check3');

    prioritycontrols3.addEventListener('click', (e) => {  //al cambio della prorità dopo aver toccato lo sfondo aggiorna la visibilità
      priority3 = !this.project.getCheckbox(2);
      refreshClassOpacity();
      this.project.setDiagram(myDiagram.model.toJson());
    });
    const prioritycontrols4 = document.getElementById('check4');

    prioritycontrols4.addEventListener('click', (e) => {  //al cambio della prorità dopo aver toccato lo sfondo aggiorna la visibilità
      priority4 = !this.project.getCheckbox(3);
      refreshClassOpacity();
      this.project.setDiagram(myDiagram.model.toJson());
    });

    const prioritycontrols5 = document.getElementById('check5');

    prioritycontrols5.addEventListener('click', (e) => {  //al cambio della prorità dopo aver toccato lo sfondo aggiorna la visibilità
      priority5 = !this.project.getCheckbox(4);
      refreshClassOpacity();
      this.project.setDiagram(myDiagram.model.toJson());
    });

    function refreshClassOpacity() { // scorre tutte le classsi e ne cambia la visibilità
      const it = myDiagram.nodes;
      while (it.next()) {
        const node = it.value;
        if (node.data.category == 'Classe') {
          const i = node.data.priority;
          switch (i){
            case '1': globalChangeOpacity(node, priority1); break;
            case '2': globalChangeOpacity(node, priority2); break;
            case '3': globalChangeOpacity(node, priority3); break;
            case '4': globalChangeOpacity(node, priority4); break;
            case '5': globalChangeOpacity(node, priority5); break;
            default: break;
          }
        }
      }
    };

    function globalChangeOpacity(node, condition) { //cambia l'opacità
      node.diagram.startTransaction('Change Opacity');
      if (condition === true)
        node.opacity = 1.0;
      else node.opacity = 0.2;
      node.diagram.commitTransaction('Change Opacity');
    };

    myDiagram.model = go.Model.fromJson(this.project.getClassDiagram(),
      $(go.GraphLinksModel,
        {
          copiesArrays: true,
          copiesArrayObjects: true
        }
      )
    );
  }

  ngAfterViewChecked() {
    const sxcol = document.getElementsByClassName('libr');

    for ( let i = 0; i < sxcol.length; ++i) {
      if (sxcol[i].getAttribute('listened') === 'false') {
        sxcol[i].setAttribute('listened', 'true');
        sxcol[i].addEventListener('click', (e) => {
          // si fa dare il template dal service con Id
          this.templateService.getTemplate(sxcol[i].id).subscribe(data =>
            this.project.addPatternToClassDiagram(data));
        });
      }
    }
  }
}
