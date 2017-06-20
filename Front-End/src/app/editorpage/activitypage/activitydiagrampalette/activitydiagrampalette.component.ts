/*
 * File: activitydiagrampalette.component
 * Version: 1.0
 * Type: typescript
 * Date: 29-05-2017
 * Author: Carlo Sindico, Alberto Giudice, Alessia Bragagnolo
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alessia Bragagnolo || 02-06-2017 || correzioni alle proprietà dei template dei blocchi
 * Alberto Giudice || 31-05-2017 || creazione dataarray contenente i template dei blocchi
 * Carlo Sindico || 29-05-2017 || creazione componenti della libreria GoJS
 *
 */


import { Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-activitydiagrampalette',
  templateUrl: './activitydiagrampalette.component.html',
  styleUrls: ['./activitydiagrampalette.component.css']
})

export class ActivitydiagrampaletteComponent implements AfterViewInit {

  //ottengo l'id html che conterrà l'editor
  @ViewChild('activityPaletteDiv') element: ElementRef;

  /* funzione che viene chiamata quando il componente ActivityDiagramEditor viene creato
   */
  ngAfterViewInit() {
		var $ = go.GraphObject.make;

    //creazione variabile myPalette per le operazioni sul diagramma
    var myPalette=
          $(go.Palette, "activityPaletteDiv",
            {
              layout: $(go.GridLayout,
                {
                  cellSize: new go.Size(200, 20),
                  wrappingColumn: 1,
                  alignment: go.GridLayout.Position
                })
            });

    var div = myPalette.div;
      div.style.height = '100%';
      div.style.width = '100%';
      myPalette.requestUpdate();

    //creazione template per il nodo start
    const starttemplate =
      $(go.Node, 'Auto', {width: 90, height: 90},
        $(go.Shape, 'Circle',
          { fill: 'white', strokeWidth: 1},
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


    //creazione template per il nodo variabile
    var variabiletemplate =
      $(go.Node, 'Auto',
        $(go.Shape, 'Procedure', {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new go.Size(176, 50)
          },
          new go.Binding('fill', 'color').makeTwoWay()
        ),
        $(go.Panel, 'Table',
          //linea che separa nomevariabile dal suo tipo e dal suo tipo e suo valore
          {minSize: new go.Size(160, 50)},
          $(go.RowColumnDefinition, {row: 2, separatorStrokeWidth: 1.5, separatorStroke: 'black'}),
          $(go.RowColumnDefinition, {row: 4, separatorStrokeWidth: 1.5, separatorStroke: 'black'}),

          //Nome della variabile
          $(go.TextBlock,
            {
              row: 1, alignment: go.Spot.Center,
              font: 'bold 12pt sans-serif',
              isMultiline: false,
              editable: true
            },
            new go.Binding('text', 'nomevariabile').makeTwoWay()),


          $(go.Panel, 'Vertical', {name: 'TIPO-VALORE'},
            new go.Binding('itemArray', 'tipivalori'),
            {
              row: 4, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left,
              itemTemplate: tipovaloreTemplate
            }
          ),
        ),


      );


    //creazione template per il textblock parametro all'interno del blocco chiamatametodo
    const methodTemplate =
      $(go.Panel, 'Horizontal',


        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'type').makeTwoWay(),
          new go.Binding('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
          })),
        $(go.TextBlock, ''),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'variabile').makeTwoWay(),
          new go.Binding('isUnderline', 'scope', function (s) {
            return s[1] === 'c';
          })),
        $(go.TextBlock, '',
          new go.Binding('text', 'type', function (t) {
            return (t ? ': ' : '');
          })),
        $(go.TextBlock,
          {isMultiline: false, editable: true},
          new go.Binding('text', 'name').makeTwoWay()),
        $(go.TextBlock, {visible: false},
          new go.Binding('text', 'paramatersID').makeTwoWay()),
      );


    //creazione template nodo chiamatametodo
    var chiamatametodotemplate =
      $(go.Node, 'Auto',
        $(go.Shape, 'DividedEvent', {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new go.Size(198, 50)
          },
          new go.Binding('fill', 'color').makeTwoWay()
        ),
        $(go.Panel, 'Table',
          //linea che separa nomemetodo dai suoi parametri
          {minSize: new go.Size(198, 50)},
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


          // parametri
          $(go.Panel, 'Vertical', {name: 'PARAMETRI'},
            new go.Binding('itemArray', 'parameters'),
            {
              row: 4, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left,
              itemTemplate: methodTemplate
            },
            new go.Binding('itemArray', 'parameters').makeTwoWay(),

          ),
        ),
        {
          contextMenu:
            $(go.Adornment, 'Spot',
              $(go.Panel, 'Auto',
                $(go.Placeholder)
              ),
            )
        }
      );

    //creazione template nodo ciclo
    var ciclotemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",{width: 170, height: 90},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock,{ font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );


    //creazione template nodo ciclocondizone all'interno di ciclo
    var ciclocondizionetemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",{width: 150, height: 50},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.TopCenter},
          $(go.TextBlock,{ font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );

    //creazione template nodo ciclocorpo all'interno di ciclo
    var ciclocorpotemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",{width: 170, height: 50},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.BottomCenter },
          $(go.TextBlock,{font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );

    //creazione template nodo ifelse
    var ifelsetemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",{width: 170, height: 90},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock,{font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );


    //creazione template nodo ifcondizione all'interno di ifelse
    var ifcondizionetemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",{width: 170, height: 50},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.TopCenter},
          $(go.TextBlock,{ font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );


    //creazione template nodo ifcorpo all'interno di ifelse
    var ifcorpotemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",{width: 170, height: 50},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.BottomCenter },
          $(go.TextBlock,{font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );


    //creazione template nodo elsecorpo all'interno di ifelse
    var elsecorpotemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",{width: 170, height: 50},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.BottomCenter },
          $(go.TextBlock,{font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );


    //creazione template nodo operatore
    var operatoretemplate =
      $(go.Node, "Auto",
        $(go.Shape, {fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock,{font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );


    //creazione template nodo sxoperatore all'interno di operatore
    var sxoperatoretemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",{width: 60, height: 60},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.Left },
          $(go.TextBlock,{font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );


    //creazione template nodo dxoperatore all'interno di operatore
    var dxoperatoretemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle",{width: 60, height: 60},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.Right },
          $(go.TextBlock,{ font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
        )
      );


    //creazione template nodo operazione all'interno di operatore
    var operazioneoperatoretemplate =
      $(go.Node, "Auto",
        $(go.Shape, "Diamond",{width: 165, height: 60},
          { fill: "white", strokeWidth: 1},
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock,{font: "bold 12pt sans-serif" },
            new go.Binding("text", "nome")),
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
    var jollytemplate =
      $(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'ExternalOrganization', {
            name: 'SHAPE',
            fill: "white", strokeWidth: 1,
            width: 198, height: 80,

          },
          new go.Binding('fill', 'color').makeTwoWay()
        ),
        $(go.Panel, 'Table',
          $(go.TextBlock, 'Jolly',{ row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' })
        ),
      );



    //creazione template nodo end
    const endtemplate =
      $(go.Node, 'Auto', {width: 90, height: 90},
        $(go.Shape, 'Circle',
          { fill: 'white', strokeWidth: 1},
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultAlignment: go.Spot.Center },
          $(go.TextBlock, {
              editable: false}, { font: 'bold 12pt sans-serif' },
            new go.Binding('text', 'key')),
        )
      );

    //associazione per ogni nodo il suo template creato precedentemente
	  var templmap = new go.Map("string", go.Node);

    templmap.add("start", starttemplate);
    templmap.add("end", endtemplate);
    templmap.add("variabile", variabiletemplate);
    templmap.add("chiamatametodo", chiamatametodotemplate);
    templmap.add("ciclo", ciclotemplate);
    templmap.add("ciclocondizione", ciclocondizionetemplate);
    templmap.add("ciclocorpo", ciclocorpotemplate);
    templmap.add("ifelse", ifelsetemplate);
    templmap.add("ifcondizione", ciclocondizionetemplate);
    templmap.add("ifcorpo", ciclocorpotemplate);
    templmap.add("elsecorpo", elsecorpotemplate);
    templmap.add("operatore", operatoretemplate);
    templmap.add("operazione", operazioneoperatoretemplate);
    templmap.add("sxoperatore", sxoperatoretemplate);
    templmap.add("dxoperatore", dxoperatoretemplate);
    templmap.add("jolly", jollytemplate);


    //associo alla palette il templatemap tmlmap
	  myPalette.nodeTemplateMap = templmap;



    //creazione template per i gruppi di nodi
    myPalette.groupTemplate =
      $(go.Group, "Auto",
        {
          background: "transparent",
          computesBoundsAfterDrag: true,
          handlesDragDropForMembers: false,
          layout:
            $(go.GridLayout,
              { wrappingColumn: 1, alignment: go.GridLayout.Position,
                cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4) })
        },
        $(go.Shape, "Rectangle",
          { fill: null,stroke: "#FFDD33", strokeWidth: 12},
        new go.Binding("stroke", "groupColor")),
        $(go.Panel, "Vertical",
          {minSize: new go.Size(155,10)},
          $(go.Panel, "Horizontal",
            { stretch: go.GraphObject.Horizontal, background: "#FFDD33" },
            new go.Binding("background", "groupColor"),
            $(go.TextBlock,
              {
                alignment: go.Spot.Left,
                editable: true,
                margin: 5,
                font: "bold 18px sans-serif",
                stroke: "#212121"
              },
              new go.Binding("text", "nome").makeTwoWay())
          ),
          $(go.Placeholder,
            { padding: 5, margin: 5 })
        )
      );


    //definizione dell'array contente i blocchi identificaty da una key univoca
	  myPalette.model.nodeDataArray = [
      { key: "Variabile", color: "#fff59d", category: "variabile", variabileVisible: true,
        nomevariabile: "Variabile",
        tipivalori: [
          { type: "Tipo", name: "Valore", tipovaloreID: 0 }],
        tipovaloreCount: 1,
      },
      { key: "Ciclo", nome: "Ciclo", color: "#a4cfff", category: "ciclo", groupVisible: true, isGroup: true, groupColor: "#a4cfff" },
      { key: "Ciclocondizione", nome: "Condizione", color: "lightskyblue", category: "ciclocondizione", groupVisible: true, group:"Ciclo", isGroup: true, groupColor: "#b9d7f8"},
      { key: "Ciclocorpo", nome: "Corpo",  color: "lightskyblue", category: "ciclocorpo", groupVisible: true, group:"Ciclo", isGroup: true, groupColor: "#b9d7f8"},
      { key: "Chiamatametodo", color: "#e1bee7", category: "chiamatametodo", chiamatametodoVisible: true,
        nomemetodo: "Metodo",
        parameters: [
          { type: "Tipo", variabile: "Variabile", name: "Valore", parametersID: 0 }],
        parametersCount: 1,
      },
      { key: "Ifelse", nome: "Ifelse", color: "salmon", category: "ifelse", groupVisible: true, isGroup: true, groupColor: "#acf191" },
      { key: "Ifcondizione", nome: "Ifcondizione", color: "lightcoral", category: "ifcondizione", groupVisible: true, group:"Ifelse", isGroup:true, groupColor: "#bdf2a8" },
      { key: "Ifcorpo", nome: "Ifcorpo", color: "lightcoral", category: "ifcorpo", groupVisible: true, group:"Ifelse", isGroup: true, groupColor: "#bdf2a8"},
      { key: "Elsecorpo", nome: "Elsecorpo", color: "lightcoral", category: "elsecorpo", groupVisible: true, group:"Ifelse", isGroup:true, groupColor: "#bdf2a8"},
      { key: "Operatore", nome: "Operatore", color: "aquamarine", category: "operatore", groupVisible: true, isGroup: true, groupColor: "#64ffda" },
      { key: "Sxoperatore", nome: "Sxoperatore", color: "aquamarine", category: "sxoperatore", groupVisible: true, group: "Operatore", isGroup: true, groupColor: "#9afde5"  },
      { key: "Operazione", nome: "Operazione", color: "#42f7cc", category: "operazione", group: "Operatore" },
      { key: "Dxoperatore", nome: "Dxoperatore", color: "aquamarine", category: "dxoperatore", groupVisible: true, group: "Operatore", isGroup: true, groupColor: "#9afde5"  },
      { key: "Jolly", color: "#ff9e80", category: "jolly", jollyVisible: true,
        descrizione: [
          { testo: "testodiprova", testoID: 0 }],

      },
	  ];

	}
}
