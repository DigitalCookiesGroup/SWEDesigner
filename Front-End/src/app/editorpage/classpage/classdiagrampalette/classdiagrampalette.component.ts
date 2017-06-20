/*
 * File: classdiagrampalette.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 30-05-2017
 * Author:Christian Cabrera, Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Davide Albertini || 31-05-2017 || creazione template tipi di relazioni del diagramma delle classi e collegamento all'editor
 * Christian Cabrera || 30-05-2017 || creazione template per rappresentare i blocchi all'interno della palette del diagramma delle classi
 *
 */

import { Component, OnInit, ElementRef,Directive, AfterViewInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-classdiagrampalette',
  templateUrl: './classdiagrampalette.component.html',
  styleUrls: ['./classdiagrampalette.component.css']
})

export class ClassdiagrampaletteComponent implements AfterViewInit {

  @ViewChild('myPaletteDiv') element: ElementRef;

	ngAfterViewInit() {
		var $ = go.GraphObject.make;

   var myPalette =
      $(go.Palette, "myPaletteDiv",
        {layout: $(go.GridLayout, { wrappingColumn: 1, cellSize: new go.Size(186, 5) , alignment: go.GridLayout.Position })}
      );

    const linkSelectionAdornmentTemplate =
      $(go.Adornment, 'Link',
        $(go.Shape,
          {  isPanelMain: true, fill: null, stroke:null, strokeWidth: 0 })
      );


    myPalette.nodeTemplateMap.add("Commento",
      $(go.Node, "Auto",
        new go.Binding("location", "loc").makeTwoWay(),
        $(go.Shape, "File",{ width: 186 , height: 80 },
          { fill: "#ff9e80"}),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock,'Commento',{
              editable: false, isMultiline: true},
            { row: 0, column: 0, columnSpan: 2, font: "bold 12pt sans-serif"}
        )
        )
      )
    );


    var attributiTemplate =
      $(go.Panel, "Horizontal",
        $(go.TextBlock,
          { isMultiline: false, editable: true, width: 12 },
          new go.Binding("text", "visibility")),
        $(go.TextBlock,
          { isMultiline: false, editable: true },
          new go.Binding("text", "name").makeTwoWay(),
          new go.Binding("isUnderline", "scope", function(s) { return s[0] === 'c' })),
        $(go.TextBlock, "",
          new go.Binding("text", "type", function(t) { return (t ? ": " : ""); })),
        $(go.TextBlock,
          { isMultiline: false, editable: true },
          new go.Binding("text", "type").makeTwoWay()),
        $(go.TextBlock,
          { isMultiline: false, editable: false },
          new go.Binding("text", "default", function(s) { return s ? " = " + s : ""; }))
      );


    var methodTemplate =
      $(go.Panel, "Horizontal",
        $(go.TextBlock,
          { isMultiline: false, editable: true, width: 12 },
          new go.Binding("text", "visibility")),
        $(go.TextBlock,
          { isMultiline: false, editable: true },
          new go.Binding("text", "name").makeTwoWay(),
          new go.Binding("isUnderline", "scope", function(s) { return s[0] === 'c' })),
        $(go.TextBlock, "",
          new go.Binding('text', 'parameters', function(p) { return (p ? ('(' + p + ')') : '()');})),
        $(go.TextBlock,
          { isMultiline: false, editable: true },
          new go.Binding('text', 'parameters').makeTwoWay()),
        $(go.TextBlock, "",
          new go.Binding("text", "type", function(t) { return (t ? ": " : ""); })),
        $(go.TextBlock,
          { isMultiline: false, editable: true },
          new go.Binding("text", "type").makeTwoWay())
      );

    myPalette.nodeTemplateMap.add("Classe",
      $(go.Node, "Auto",

        new go.Binding("location", "loc").makeTwoWay(),
        $(go.Shape, "Rectangle", { width: 186, height: 80 },
          { fill: '#fff59d' }, new go.Binding('fill', 'color').makeTwoWay()


),
        $(go.Panel, "Table", {minSize: new go.Size(186, NaN)},

          //linea che separa nome dai metodi
          $(go.RowColumnDefinition,{ row: 2, separatorStrokeWidth: 1.5, separatorStroke: "black" }),
          $(go.RowColumnDefinition,{ row: 4, separatorStrokeWidth: 1.5, separatorStroke: "black" }),
          //PreHeader
          $(go.TextBlock,
            {
              row: 0, alignment: go.Spot.Center,
              font: "10pt sans-serif",
              isMultiline: false,
              editable: true,
              visible:false
            },
            new go.Binding("text", "tipo").makeTwoWay()),

          //Nome della Classe
          $(go.TextBlock,
            {
              row: 1, alignment: go.Spot.Center,
              font: "bold 12pt sans-serif",
              isMultiline: false,
              editable: true,
              margin: 4
            },
            new go.Binding("text", "name").makeTwoWay()),
          //Scritta che viene mostrata quando il pannello è ridotto
          $(go.TextBlock, "Attributi",
            { row: 2, font: "italic 10pt sans-serif", margin: 3 }),
            //new go.Binding("visible", "visible", function(v) { return !v; }).ofObject("ATTRIBUTI")),
          $(go.Panel, "Vertical", { name: "ATTRIBUTI" },
            new go.Binding("itemArray", "attributi"),
            {
              row: 2, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left,
              itemTemplate: attributiTemplate,
              visible: false
            }
          ),
          //$("PanelExpanderButton", "ATTRIBUTI",
          //  { row: 2, visible: false, column: 1, alignment: go.Spot.TopRight },
          //  new go.Binding("visible", "attributi", function(arr) { return arr.length > 0; })
          //),
          //Scritta che viene mostrata quando il pannello è ridotto
          $(go.TextBlock, "Metodi",
            { row: 4, font: "italic 10pt sans-serif", margin: 3 }),
            //new go.Binding("visible", "visible", function(v) { return !v; }).ofObject("METHODS")),
          // methods
          $(go.Panel, "Vertical", { name: "METHODS" },
            new go.Binding("itemArray", "methods"),
            {
              row: 4, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left,
              itemTemplate: methodTemplate,
              visible: false
            },
            new go.Binding("itemArray", "methods").makeTwoWay(),
            new go.Binding("itemArray", "methodsList").makeTwoWay()
          ),
          //$("PanelExpanderButton", "METHODS",
          //  { row: 4, visible: false, column: 1, alignment: go.Spot.TopRight },
          //  new go.Binding("visible", "methods", function(arr) { return arr.length > 0; })
          //)
        )
      )
    );

    myPalette.model.nodeDataArray = [

      {
        category:"Classe",
        tipo:"default",
        notInterface: true,
        name: "Classe",
        attributi: [
          { name: "attributo1", type: "String", visibility: "+", attributeID: 0 }],
        methods: [
          {name: "metodo1", parameters: "param1:tipo1", type: "void", visibility: "+", methodID: 0}
        ],
        priority: 1,
        opacity: 1.0,
        color: '#fff59d',
        attributeCount: 1,
        methodCount: 1,
        attributeVisible: true,
        methodVisible: true
      },
      { category: 'Commento', description: 'Testo del commento', commentVisible: true}
    ];

function findKey(e, obj) {
  const node = obj.part;
  const data = node.data;
  if (data) { return data.key;};
}


    myPalette.linkTemplateMap.add("Generalizzazione", //mettere cardinalità
      $(go.Link,
        {
          locationSpot: go.Spot.Center,
          selectionAdornmentTemplate:linkSelectionAdornmentTemplate
        },
        {
          corner: 5,
          toShortLength: 4
        },
        new go.Binding("location", "loc"),
        new go.Binding("points"),
        $(go.Shape,
          {stroke: "#ededed", strokeWidth: 3 }),
        $(go.Shape,
          {fill: "yellow", toArrow: "Standard", scale: 1.5 , stroke: "#ededed", strokeWidth: 1 })
      )
    );
    myPalette.linkTemplateMap.add("Aggregazione", //mettere cardinalità
      $(go.Link,
        {
          locationSpot: go.Spot.Center,
          selectionAdornmentTemplate:linkSelectionAdornmentTemplate
        },
        {
          corner: 5,
          toShortLength: 4
        },
        new go.Binding("points"),
        $(go.Shape,
          {stroke: "#ededed", strokeWidth: 3 }),
        $(go.Shape,
          {fill: "yellow", toArrow: "StretchedDiamond", scale: 1.5, stroke: "#ededed", strokeWidth: 1 })
      )
    );
    myPalette.linkTemplateMap.add("Composizione", //mettere cardinalità
      $(go.Link,
        {
          locationSpot: go.Spot.Center,
          selectionAdornmentTemplate:linkSelectionAdornmentTemplate
        },
        {
          corner: 5,
          toShortLength: 4
        },
        new go.Binding("points"),
        $(go.Shape,
          {stroke: "#ededed", strokeWidth: 3 }),
        $(go.Shape,
          {fill: "#ededed",toArrow: "StretchedDiamond", scale: 1.5, stroke: "#ededed", strokeWidth: 1 })
      )
    );

    myPalette.linkTemplateMap.add("Associazione", //mettere cardinalità
      $(go.Link,
        {
          locationSpot: go.Spot.Center,
          selectionAdornmentTemplate:linkSelectionAdornmentTemplate
        },
        {
          corner: 5,
          toShortLength: 2
        },
        new go.Binding("points"),
        $(go.Shape,
          {stroke: "#ededed", strokeWidth: 3 }),
        $(go.Shape,
          {fill: "#ededed",toArrow: "OpenTriangle", scale: 1.3, stroke: "#ededed", strokeWidth: 1.8 })
      )
    );
    myPalette.linkTemplateMap.add("Dipendenza", //mettere cardinalità
      $(go.Link,
        {
          locationSpot: go.Spot.Center,
          selectionAdornmentTemplate:linkSelectionAdornmentTemplate
        },
        {
          corner: 5,
          toShortLength: 0
        },
        new go.Binding("points"),
        $(go.Shape,  // the link path shape
          {stroke: "#ededed", strokeWidth: 3 })
      )
    );


myPalette.model.linkDataArray=[
  { points: new go.List(go.Point).addAll([new go.Point(30, 0), new go.Point(93, 0), new go.Point(93, 40), new go.Point(156, 40)]), category:"Dipendenza" },
  { points: new go.List(go.Point).addAll([new go.Point(30, 0), new go.Point(93, 0), new go.Point(93, 40), new go.Point(156, 40)]), category:"Aggregazione" },
  { points: new go.List(go.Point).addAll([new go.Point(30, 0), new go.Point(93, 0), new go.Point(93, 40), new go.Point(156, 40)]), category:"Composizione" },
  { points: new go.List(go.Point).addAll([new go.Point(30, 0), new go.Point(93, 0), new go.Point(93, 40), new go.Point(156, 40)]), category:"Associazione" },
  { points: new go.List(go.Point).addAll([new go.Point(30, 0), new go.Point(93, 0), new go.Point(93, 40), new go.Point(156, 40)]), category:"Generalizzazione" }
];

var div = myPalette.div;
  div.style.height = '100%';
  div.style.width = '100%';
  myPalette.requestUpdate();



	}
}
