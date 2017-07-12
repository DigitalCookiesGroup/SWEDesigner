webpackJsonp([1,5],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__method__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auto_format__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auto_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_auto_format__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Project; });
/*
 * File: project.service.ts
 * Version: 1.0
 * Type: typescript
 * Date: 15-06-2017
 * Author: Saverio Follador, Carlo Sindico
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Carlo Sindico, Saverio Follador || 20-06-2017 || ultime modifiche e correzioni metodi
 * Carlo Sindico || 15-06-2017 || creazione metodo clearSelectedMethodDiagram() per selezionare il metodo della classe da creare nel diagramma delle attività e ricaricare la struttura
 * Saverio Follador || 15-06-2017 || creazione metodi get e set per fare interagire le palette con i rispettivi editor delle classi e delle attività
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Project = (function () {
    function Project() {
        this.name = 'SWEDesigner_Project';
        this.diagram = '{}'; // da modificare per avere una variabile con le classi e un array con gli attività
        this.checkbox = [true, true, true, true, true];
        this.selectedMethod = [];
        this.methods = [];
    }
    Project.prototype.reset = function () {
        this.name = 'SWEDesigner_Project';
        this.diagram = '{}';
        this.checkbox = [true, true, true, true, true];
        this.selectedMethod = [];
        this.methods = [];
        this.selectedFileName = '';
    };
    Project.prototype.getName = function () {
        return this.name;
    };
    Project.prototype.setName = function (x) {
        this.name = x;
    };
    Project.prototype.addPatternToClassDiagram = function (x) {
        console.log(x.Corpo.nodeDataArray);
        var y = JSON.parse(this.diagram);
        // aggiunge pattern x al diagramma delle classi
        // console.log(x);
        if (x.Corpo.nodeDataArray != null) {
            y.nodeDataArray = y.nodeDataArray.concat(x.Corpo.nodeDataArray);
        }
        if (x.Corpo.linkDataArray != null) {
            y.linkDataArray = y.linkDataArray.concat(x.Corpo.linkDataArray);
        }
        this.diagram = JSON.stringify(y);
        console.log(this.diagram);
        console.log(y);
    };
    Project.prototype.addPatternToActivityDiagram = function (x) {
        var y = JSON.parse(this.getSelectedMethodDiagram());
        if (x.Corpo.nodeDataArray != null) {
            y.nodeDataArray = y.nodeDataArray.concat(x.Corpo.nodeDataArray);
        }
        if (x.Corpo.linkDataArray != null) {
            y.linkDataArray = y.linkDataArray.concat(x.Corpo.linkDataArray);
        }
        this.setSelectedMethodDiagram(JSON.stringify(y));
    };
    Project.prototype.setDiagram = function (x) {
        this.diagram = x;
        console.log(this.diagram);
    };
    Project.prototype.getFullDiagram = function () {
        // metodo che unisce il classi con gli attività
        var res = JSON.parse(this.diagram);
        for (var meth = 0; meth < this.methods.length; ++meth) {
            for (var i = 0; i < res.nodeDataArray.length; ++i) {
                if (res.nodeDataArray[i].category === 'Classe' && res.nodeDataArray[i].name === this.methods[meth].getClass()) {
                    for (var m = 0; m < res.nodeDataArray[i].methods.length; ++m) {
                        if (res.nodeDataArray[i].methods[m].name === this.methods[meth].getName()) {
                            res.nodeDataArray[i].methods[m].diagram = JSON.parse(this.methods[meth].getDiagram());
                        }
                    }
                }
            }
        }
        return JSON.stringify(res);
        // ritorna il diagramma completo
    };
    Project.prototype.getClassDiagram = function () {
        return this.diagram; // da rimuovere
        // prende diagram
        // rimuove il contenuto dei diagrammi delle attività
        // ritorna il json creato
    };
    /*getActivityDiagram(x: string[]) {
     // prende diagram
     // seleziona la porzione contenente il diagramma delle attività richiesto (x contiene classer e metodo)
     // lo ritorna
     for (let i = 0; i < this.methods.length; ++i) {
     if (this.methods[i].getClass() === x[0] && this.methods[i].getName() === x[1]){
     return this.methods[i];
     }
     }
     return this.methods.push(new Method(x[0], x[1], JSON.stringify({ 'class': 'go.GraphLinksModel', 'nodeDataArray': [], 'linkDataArray': []})));
  
     }*/
    Project.prototype.getClassesNames = function () {
        // ritorna un array di stringhe con i nomi delle classi prendendoli dal json
        var json = JSON.parse(this.diagram);
        var res = [];
        for (var i = 0; i < json.nodeDataArray.length; ++i) {
            if (json.nodeDataArray[i].category === 'Classe') {
                res.push(json.nodeDataArray[i].name);
            }
        }
        return res;
    };
    Project.prototype.getClassMethodsCarlo = function (classe, metodo) {
        // ritorna un array di stringhe con i nomi dei metodi della classe
        var json = JSON.parse(this.diagram);
        var res = [];
        var y = -5;
        for (var i = 0; i < json.nodeDataArray.length; ++i) {
            if (json.nodeDataArray[i].name === classe && json.nodeDataArray[i].category === 'Classe') {
                y = i;
            }
        }
        if (y >= 0) {
            var s = void 0;
            for (var i = 0; i < json.nodeDataArray[y].methods.length; ++i) {
                if (json.nodeDataArray[y].methods[i].name === metodo) {
                    s = ('(' + (json.nodeDataArray[y].methods[i].parameters) + ')' + ':' + ' ' + (json.nodeDataArray[y].methods[i].type));
                    res.push(s);
                }
            }
            return res;
        }
        else {
            return;
        }
    };
    Project.prototype.getClassMethods = function (classe) {
        // ritorna un array di stringhe con i nomi dei metodi della classe
        var json = JSON.parse(this.diagram);
        var res = [];
        var y = -5;
        for (var i = 0; i < json.nodeDataArray.length; ++i) {
            if (json.nodeDataArray[i].name === classe && json.nodeDataArray[i].category === 'Classe') {
                y = i;
            }
        }
        if (y >= 0) {
            for (var i = 0; i < json.nodeDataArray[y].methods.length; ++i) {
                res.push((json.nodeDataArray[y].methods[i].name));
            }
            return res;
        }
        else {
            return;
        }
    };
    Project.prototype.getCheckbox = function (index) {
        return this.checkbox[index];
    };
    Project.prototype.setCheckbox = function (index, checkValue) {
        this.checkbox[index] = checkValue;
    };
    Project.prototype.setSelectedMethod = function (c, m) {
        this.selectedMethod[0] = c;
        this.selectedMethod[1] = m;
        //console.log(c, m);
    };
    Project.prototype.getSelectedMethod = function () {
        return this.selectedMethod;
    };
    Project.prototype.getSelectedMethodParams = function () {
        return this.selectedMethod[0];
    };
    Project.prototype.getSelectedMethodParamsCarlo = function () {
        var p = this.getClassMethodsCarlo(this.selectedMethod[0], this.selectedMethod[1]);
        return p;
    };
    Project.prototype.getSelectedMethodDiagram = function () {
        for (var i = 0; i < this.methods.length; ++i) {
            if (this.methods[i].getClass() === this.selectedMethod[0] && this.methods[i].getName() === this.selectedMethod[1]) {
                return this.methods[i].getDiagram();
            }
        }
        this.methods.push(new __WEBPACK_IMPORTED_MODULE_1__method__["a" /* Method */](this.selectedMethod[0], this.selectedMethod[1], '{ "class": "go.GraphLinksModel", "copiesArrays": true, "copiesArrayObjects": true, "nodeDataArray": [ {"key":"START", "color":"#b2ff59", "category":"start", "loc":"180 -220"}, {"key":"END", "color":"#f44336", "category":"end", "loc":"180 220"} ], "linkDataArray": []}'));
        return this.getSelectedMethodDiagram();
    };
    Project.prototype.setSelectedMethodDiagram = function (x) {
        for (var i = 0; i < this.methods.length; ++i) {
            if (this.methods[i].getClass() === this.selectedMethod[0] && this.methods[i].getName() === this.selectedMethod[1]) {
                this.methods[i].setDiagram(x);
            }
        }
    };
    Project.prototype.setCode = function (x) {
        this.code = x;
    };
    Project.prototype.getCode = function () {
        return this.code;
    };
    Project.prototype.setSelectedCode = function (x) {
        this.selectedCode = '';
        if (x != null) {
            var indentToken = '    ';
            var javaFormatter = __WEBPACK_IMPORTED_MODULE_2_auto_format__["createJavaFormatter"](indentToken);
            for (var i = 0; i < this.code.length; ++i) {
                if (this.code[i].name === x) {
                    var y = javaFormatter.format(this.code[i].body);
                    for (var m = 0; m < y.length; ++m) {
                        this.selectedCode += '\n' + y[m];
                    }
                }
            }
        }
    };
    Project.prototype.getSelectedCode = function (x) {
        return this.selectedCode;
    };
    Project.prototype.setSelectedFileName = function (x) {
        this.selectedFileName = x;
    };
    Project.prototype.getSelectedFileName = function () {
        return this.selectedFileName;
    };
    Project.prototype.clearSelectedMethodDiagram = function () {
        for (var i = 0; i < this.methods.length; ++i) {
            if (this.methods[i].getName() === this.selectedMethod[1] && this.methods[i].getClass() === this.selectedMethod[0]) {
                this.methods[i].setDiagram({
                    'class': 'go.GraphLinksModel', 'copiesArrays': true, 'copiesArrayObjects': true, 'nodeDataArray': [
                        { 'key': 'START', 'color': '#b2ff59', 'category': 'start', 'loc': '180 -220' },
                        { 'key': 'END', 'color': '#f44336', 'category': 'end', 'loc': '180 220' }
                    ], 'linkDataArray': []
                });
            }
        }
    };
    Project.prototype.setMethods = function (x) {
        this.methods = [];
        for (var i = 0; i < x.length; ++i) {
            this.methods[i] = new __WEBPACK_IMPORTED_MODULE_1__method__["a" /* Method */](x[i].class, x[i].name, x[i].diagram);
        }
    };
    Project.prototype.save = function () {
        var y = {};
        y.name = this.name;
        y.diagram = this.diagram;
        y.methods = this.methods;
        return y;
    };
    Project.prototype.upload = function (x) {
        var y = JSON.parse(x);
        this.setName(y.name);
        this.setDiagram(y.diagram);
        this.setMethods(y.methods);
    };
    return Project;
}());
Project = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], Project);

//# sourceMappingURL=project.js.map

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateService; });
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TemplateService = (function () {
    function TemplateService(http) {
        this.http = http;
        this.host = ''; // cambiare prima di compilare
        this.classesUrl = 'template/categoria/tc';
        this.patternsUrl = 'template/categoria/dp';
        this.templateUrl = 'template/';
        this.activityUrl = 'template/categoria/ta';
    }
    TemplateService.prototype.getClassesList = function () {
        return this.http.get(this.host + this.classesUrl)
            .map(this.elaborate);
    };
    TemplateService.prototype.getPatternsList = function () {
        return this.http.get(this.host + this.patternsUrl)
            .map(this.elaborate);
    };
    TemplateService.prototype.getActivityList = function () {
        return this.http.get(this.host + this.activityUrl)
            .map(this.elaborate);
    };
    TemplateService.prototype.getTemplate = function (x) {
        return this.http.get(this.host + this.templateUrl + x)
            .map(this.elaborate);
    };
    TemplateService.prototype.elaborate = function (res) {
        console.log(res.json());
        return res.json();
    };
    return TemplateService;
}());
TemplateService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], TemplateService);

var _a;
//# sourceMappingURL=template.service.js.map

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialognewprojectComponent; });
/*
 * File: dialognewproject.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 24-05-2017
 * Author: Saverio Follador, Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Davide Albertini || 24-05-2017 || integrazione con firstpage
 * Saverio Follador || 24-05-2017 || creazione componente dialognewproject
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DialognewprojectComponent = (function () {
    function DialognewprojectComponent(dialogRef, project) {
        this.dialogRef = dialogRef;
        this.project = project;
    }
    DialognewprojectComponent.prototype.ngOnInit = function () {
    };
    return DialognewprojectComponent;
}());
DialognewprojectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-dialognewproject',
        template: __webpack_require__(237),
        styles: [__webpack_require__(214)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialogRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */]) === "function" && _b || Object])
], DialognewprojectComponent);

var _a, _b;
//# sourceMappingURL=dialognewproject.component.js.map

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialoguploadprojectComponent; });
/*
 * File: dialoguploadproject.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 25-05-2017
 * Author: Saverio Follador, Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Davide Albertini || 25-05-2017 || creazione metodo read(input) per leggere il file caricato e salvare i contenuto in un JSON
 * Saverio Follador || 25-05-2017 || creazione metodo upload($event) per validare il file caricato
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DialoguploadprojectComponent = (function () {
    function DialoguploadprojectComponent(dialogRef, project) {
        this.dialogRef = dialogRef;
        this.project = project;
        this.validProject = true;
        this.firstTime = true;
    }
    DialoguploadprojectComponent.prototype.upload = function ($event) {
        this.firstTime = false;
        // validare il file
        // se non valido imposta validProject==true;
        // se valido imposta validProject==false e chiama la roba qua sotto
        this.read($event.target);
    };
    DialoguploadprojectComponent.prototype.read = function (input) {
        var _this = this;
        var file = input.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            // salva il contenuto del json caricato nella classe progetto
            _this.project.upload(reader.result);
        };
        reader.readAsText(file);
    };
    DialoguploadprojectComponent.prototype.ngOnInit = function () {
    };
    return DialoguploadprojectComponent;
}());
DialoguploadprojectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-dialoguploadproject',
        template: __webpack_require__(238),
        styles: [__webpack_require__(215)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialogRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */]) === "function" && _b || Object])
], DialoguploadprojectComponent);

var _a, _b;
//# sourceMappingURL=dialoguploadproject.component.js.map

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeService; });
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CodeService = (function () {
    function CodeService(http) {
        this.http = http;
        this.host = '';
    }
    CodeService.prototype.getGeneratedCode = function (dia) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        console.log(dia);
        return this.http.post(this.host, dia, options)
            .map(this.elaborate);
    };
    CodeService.prototype.elaborate = function (res) {
        // console.log(res.text());
        return res.text();
    };
    return CodeService;
}());
CodeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], CodeService);

var _a;
//# sourceMappingURL=code.service.js.map

/***/ }),
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 110;


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(140);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(project) {
        this.project = project;
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(222),
        styles: [__webpack_require__(199)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_ace_editor__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_ace_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_ace_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__firstpage_firstpage_component__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__firstpage_dialognewproject_dialognewproject_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__firstpage_dialoguploadproject_dialoguploadproject_component__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_router__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__editorpage_editorpage_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__editorpage_classpage_classpage_component__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__editorpage_classpage_classdiagrameditor_classdiagrameditor_component__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__editorpage_classpage_classdiagrampalette_classdiagrampalette_component__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__editorpage_activitypage_activitypage_component__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__editorpage_activitypage_activitydiagrameditor_activitydiagrameditor_component__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__editorpage_activitypage_activitydiagrampalette_activitydiagrampalette_component__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__editorpage_classpage_libreriafiltripalette_libreriafiltripalette_component__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__editorpage_activitypage_classimetodipalette_classimetodipalette_component__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__editorpage_codepage_codepage_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__editorpage_codepage_codeditor_codeditor_component__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__editorpage_codepage_codelistafilepalette_codelistafilepalette_component__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__editorpage_codepage_codegeneratepalette_codegeneratepalette_component__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__project__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__editorpage_activitypage_libreriapalette_libreriapalette_component__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_template_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_code_service__ = __webpack_require__(75);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__firstpage_firstpage_component__["a" /* FirstpageComponent */],
            __WEBPACK_IMPORTED_MODULE_10__firstpage_dialognewproject_dialognewproject_component__["a" /* DialognewprojectComponent */],
            __WEBPACK_IMPORTED_MODULE_11__firstpage_dialoguploadproject_dialoguploadproject_component__["a" /* DialoguploadprojectComponent */],
            __WEBPACK_IMPORTED_MODULE_13__editorpage_editorpage_component__["a" /* EditorpageComponent */],
            __WEBPACK_IMPORTED_MODULE_14__editorpage_classpage_classpage_component__["a" /* ClasspageComponent */],
            __WEBPACK_IMPORTED_MODULE_15__editorpage_classpage_classdiagrameditor_classdiagrameditor_component__["a" /* ClassdiagrameditorComponent */],
            __WEBPACK_IMPORTED_MODULE_16__editorpage_classpage_classdiagrampalette_classdiagrampalette_component__["a" /* ClassdiagrampaletteComponent */],
            __WEBPACK_IMPORTED_MODULE_17__editorpage_activitypage_activitypage_component__["a" /* ActivitypageComponent */],
            __WEBPACK_IMPORTED_MODULE_18__editorpage_activitypage_activitydiagrameditor_activitydiagrameditor_component__["a" /* ActivitydiagrameditorComponent */],
            __WEBPACK_IMPORTED_MODULE_19__editorpage_activitypage_activitydiagrampalette_activitydiagrampalette_component__["a" /* ActivitydiagrampaletteComponent */],
            __WEBPACK_IMPORTED_MODULE_20__editorpage_classpage_libreriafiltripalette_libreriafiltripalette_component__["a" /* LibreriafiltripaletteComponent */],
            __WEBPACK_IMPORTED_MODULE_21__editorpage_activitypage_classimetodipalette_classimetodipalette_component__["a" /* ClassimetodipaletteComponent */],
            __WEBPACK_IMPORTED_MODULE_22__editorpage_codepage_codepage_component__["a" /* CodepageComponent */],
            __WEBPACK_IMPORTED_MODULE_23__editorpage_codepage_codeditor_codeditor_component__["a" /* CodeditorComponent */],
            __WEBPACK_IMPORTED_MODULE_24__editorpage_codepage_codelistafilepalette_codelistafilepalette_component__["a" /* CodelistafilepaletteComponent */],
            __WEBPACK_IMPORTED_MODULE_25__editorpage_codepage_codegeneratepalette_codegeneratepalette_component__["a" /* CodegeneratepaletteComponent */],
            __WEBPACK_IMPORTED_MODULE_7_ng2_ace_editor__["AceEditorDirective"],
            __WEBPACK_IMPORTED_MODULE_27__editorpage_activitypage_libreriapalette_libreriapalette_component__["a" /* LibreriapaletteComponent */],
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_10__firstpage_dialognewproject_dialognewproject_component__["a" /* DialognewprojectComponent */], __WEBPACK_IMPORTED_MODULE_11__firstpage_dialoguploadproject_dialoguploadproject_component__["a" /* DialoguploadprojectComponent */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_router__["a" /* RouterModule */].forRoot([
                {
                    path: '',
                    component: __WEBPACK_IMPORTED_MODULE_9__firstpage_firstpage_component__["a" /* FirstpageComponent */]
                },
                { path: 'editorpage', component: __WEBPACK_IMPORTED_MODULE_13__editorpage_editorpage_component__["a" /* EditorpageComponent */],
                    children: [
                        { path: 'classpage', component: __WEBPACK_IMPORTED_MODULE_14__editorpage_classpage_classpage_component__["a" /* ClasspageComponent */] },
                        { path: 'activitypage', component: __WEBPACK_IMPORTED_MODULE_17__editorpage_activitypage_activitypage_component__["a" /* ActivitypageComponent */],
                            children: [{ path: 'libreriapage', component: __WEBPACK_IMPORTED_MODULE_27__editorpage_activitypage_libreriapalette_libreriapalette_component__["a" /* LibreriapaletteComponent */] },
                                { path: 'activitypalette', component: __WEBPACK_IMPORTED_MODULE_19__editorpage_activitypage_activitydiagrampalette_activitydiagrampalette_component__["a" /* ActivitydiagrampaletteComponent */] },] },
                        { path: 'codepage', component: __WEBPACK_IMPORTED_MODULE_22__editorpage_codepage_codepage_component__["a" /* CodepageComponent */] },
                    ]
                }
            ])
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_26__project__["a" /* Project */], __WEBPACK_IMPORTED_MODULE_28__services_template_service__["a" /* TemplateService */], __WEBPACK_IMPORTED_MODULE_29__services_code_service__["a" /* CodeService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gojs__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gojs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gojs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_template_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitydiagrameditorComponent; });
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ActivitydiagrameditorComponent = (function () {
    function ActivitydiagrameditorComponent(project, templateService) {
        this.project = project;
        this.templateService = templateService;
    }
    /* funzione che viene chiamata quando il componente ActivityDiagramEditor viene creato
     */
    ActivitydiagrameditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var $ = __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].make;
        var index = 0;
        //creazione template per il nodo start
        var starttemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 90, height: 90 }, { deletable: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Circle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key').makeTwoWay())));
        //creazione template per il textblock tipovalore all'interno del blocco variabile
        var tipovaloreTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'type').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name', function (t) {
            return (t ? ': ' : '');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'default', function (s) {
            return s ? ' = ' + s : '';
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'tipovaloreID').makeTwoWay()));
        var getListaparametri = function (e, node) {
            var par = _this.project.getSelectedMethodParamsCarlo();
            var array = par[0].split('(');
            var arr = array[1].split(')');
            var res = [];
            for (var i = 0; i < arr[0].length; i++) {
                res = arr[0].split(',');
                myDiagram.startTransaction('agggiunta lista parametro');
                myDiagram.model.setDataProperty(node.part.data, 'menudata', res);
                myDiagram.commitTransaction('agggiunta lista parametro');
            }
        };
        var changeVariabile = function (e, obj) {
            var testo = (obj.data).split(":");
            var nomev = testo[0];
            var tipov = testo[1];
            myDiagram.startTransaction('Change nome variabile esistente');
            myDiagram.model.setDataProperty(obj.part.adornedPart.data, 'nomevariabile', nomev);
            myDiagram.commitTransaction('Changed nome variabile esistente');
            myDiagram.startTransaction('Change tipo variabile esistente');
            myDiagram.model.setDataProperty(obj.part.adornedPart.data.tipivalori[0], 'type', tipov);
            myDiagram.commitTransaction('Changed tipo variabile esistente');
            myDiagram.startTransaction('Change default value variabile esistente');
            myDiagram.model.setDataProperty(obj.part.adornedPart.data.tipivalori[0], 'name', "");
            myDiagram.commitTransaction('Changed default value variabile esistente');
        };
        //creazione template per il nodo variabile
        var variabiletemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', {
            contextMenu: $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Vertical', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('itemArray', 'menudata'), {
                itemTemplate: $('Button', { width: 150 }, { click: function (e, obj) { changeVariabile(e, obj); } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', '')))
            }),
            mouseOver: getListaparametri
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Procedure', {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](176, 50),
            portId: '', fromLinkable: true,
            toLinkable: true,
            toMaxLinks: 1,
            fromMaxLinks: 1,
            cursor: 'pointer'
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', 
        //linea che separa nomevariabile dal suo tipo e valore
        { minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](160, 50) }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 2, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 4, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            row: 1, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            font: 'bold 12pt sans-serif',
            isMultiline: false,
            editable: true
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nomevariabile').makeTwoWay()), 
        //Scritta che viene mostrata quando il pannello è ridotto
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'Tipo-valore', { row: 4, font: 'italic 10pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'visible', function (v) {
            return !v;
        }).ofObject('TIPOVALORE')), 
        // parametri
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Vertical', { name: 'TIPOVALORE' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('itemArray', 'tipivalori'), {
            row: 4, margin: 3, stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Fill,
            defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            itemTemplate: tipovaloreTemplate
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'variabileVisible').makeTwoWay()), $('PanelExpanderButton', 'TIPOVALORE', { row: 4, visible: false, column: 1, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].TopRight }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'tipivalori', function (arr) {
            return arr.length > 0;
        }))));
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
            var node = obj.part;
            var data = node.data;
            if (data) {
                updateParametersCount(node, data.parameters.length);
                node.diagram.startTransaction('nuovo parametro');
                myDiagram.model.addArrayItem(data.parameters, {
                    type: 'Tipo', variabile: 'Variabile' + ((data.parametersCount) + 1).toString(), name: 'Valore',
                    parametersID: data.parametersCount++
                });
                node.diagram.commitTransaction('nuovo parametro');
            }
        }
        ;
        /* funzione che  rimuove un parametro dal blocco chiamatametodo
         @param {obj} - obj è un parametro che definisce gojs in questo caso rappresenta l'oggetto nodo
         */
        function removeParam(e, obj) {
            var node = obj.part;
            var data = node.data;
            var ind = Number(obj.text);
            if (data) {
                node.diagram.startTransaction('rimosso parametro');
                myDiagram.model.removeArrayItem(data.parameters, ind);
                for (; ind < data.parameters.length; ind++) {
                    myDiagram.model.setDataProperty(data.parameters[ind], 'paramatersID', ind);
                }
                node.diagram.commitTransaction('rimosso parametro');
                updateParametersCount(node, data.parameters.length);
            }
        }
        ;
        //creazione template per il textblock parametro all'interno del blocco chiamatametodo
        var methodTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'type').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ''), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'variabile').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'parameters', function (p) {
            return (p ? '(' : '()');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'parameters').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'parameters', function (p) {
            return (p ? ')' : '');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name', function (t) {
            return (t ? ': ' : '');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ' ', { editable: false }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'x', { font: 'bold 10pt Verdana, sans-serif', stroke: 'red' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'methodID').makeTwoWay(), { opacity: 0 }, { click: removeParam })));
        //creazione template nodo chiamatametodo
        var chiamatametodotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'DividedEvent', {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](150, 50),
            portId: '', fromLinkable: true,
            toLinkable: true,
            toMaxLinks: 1,
            fromMaxLinks: 1,
            cursor: 'pointer'
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', 
        //linea che separa nomemetodo dai suoi parametri
        { minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](200, 50) }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 2, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 4, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            row: 1, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            font: 'bold 12pt sans-serif',
            isMultiline: false,
            editable: true
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nomemetodo').makeTwoWay()), 
        //Scritta che viene mostrata quando il pannello è ridotto
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'Parametri', { row: 2, font: 'italic 10pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'visible', function (v) {
            return !v;
        }).ofObject('PARAMETRI')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '+', {
            name: 'aggiuntaparametro',
            stroke: 'green',
            margin: 2,
            row: 2,
            column: 2,
            font: 'bold 14pt sans-serif',
            alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].BottomRight,
            click: addParam
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'visible', function (v) {
            return v;
        }).ofObject('PARAMETRI')), 
        // parametri
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Vertical', { name: 'PARAMETRI' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('itemArray', 'parameters').makeTwoWay(), {
            row: 2, margin: 3, stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Fill,
            defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            itemTemplate: methodTemplate
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'chiamatametodoVisible').makeTwoWay()), $('PanelExpanderButton', 'PARAMETRI', { row: 2, visible: false, column: 3, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].TopRight }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'parameters', function (arr) {
            return arr.length > 0;
        }))));
        //creazione template nodo ciclo
        var ciclotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 100, height: 90 }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'RoundedRectangle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo ciclocondizone all'interno di ciclo
        var ciclocondizionetemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 120, height: 50 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'RoundedRectangle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo ciclocorpo all'interno di ciclo
        var ciclocorpotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 80, height: 100 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'RoundedRectangle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo ifelse
        var ifelsetemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 100, height: 90 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'RoundedRectangle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo ifcondizione all'interno di ifelse
        var ifcondizionetemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 120, height: 50 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'RoundedRectangle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo ifcorpo all'interno di ifelse
        var ifcorpotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 80, height: 100 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'RoundedRectangle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo elsecorpo all'interno di ifelse
        var elsecorpotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 80, height: 100 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'RoundedRectangle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo operatore
        var operatoretemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 100, height: 30 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo sxoperatore all'interno di operatore
        var sxoperatoretemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 60, height: 60 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'RoundedRectangle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo dxoperatore all'interno di operatore
        var dxoperatoretemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 60, height: 60 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'RoundedRectangle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true }, { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template nodo operazione all'interno di operatore
        var operazioneoperatoretemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', {
            contextMenu: //menu per la scelta della priorità
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Vertical', { alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Top, alignmentFocus: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '*');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '*', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '+');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '+', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '-');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '-', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '.');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '.', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '->');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '->', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '=');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '=', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '===');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '===', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '!=');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '!=', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '<');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '<', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '>');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '>', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '--');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '--', { textAlign: 'center', width: 30, height: 10 })), $('Button', { click: function (e, obj) {
                    changeOperatore(obj.part, '++');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '++', { textAlign: 'center', width: 30, height: 10 })))
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Diamond', { width: 165, height: 60 }, { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: false, isMultiline: false }, { row: 0, column: 0, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())));
        //creazione template per il textblock descrizionejolly all'interno del blocco jolly
        var descrizionejollyTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: true, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'testo').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'testoID').makeTwoWay()));
        //creazione template nodo jolly
        var jollytemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'ExternalOrganization', {
            name: 'SHAPE',
            fill: 'white', strokeWidth: 1,
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](176, 50),
            portId: '', fromLinkable: true,
            toLinkable: true,
            toMaxLinks: 1,
            fromMaxLinks: 1,
            cursor: 'pointer'
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', 
        //Scritta che viene mostrata quando il pannello è ridotto
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'Jolly', { row: 0, margin: 3, font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'visible', function (v) {
            return !v;
        }).ofObject('TESTO')), 
        // parametri
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Vertical', { name: 'TESTO' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('itemArray', 'descrizione'), {
            row: 0, margin: 3, stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Fill,
            defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            itemTemplate: descrizionejollyTemplate
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'jollyVisible').makeTwoWay()), $('PanelExpanderButton', 'TESTO', { row: 0, visible: false, column: 1, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].TopRight }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'descrizione', function (arr) {
            return arr.length > 0;
        }))));
        //creazione template nodo end
        var endtemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 90, height: 90 }, { deletable: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Circle', { fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
            toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            editable: false
        }, { font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key'))));
        //associazione per ogni nodo il suo template creato precedentemente
        var templmap = new __WEBPACK_IMPORTED_MODULE_1_gojs__["Map"]('string', __WEBPACK_IMPORTED_MODULE_1_gojs__["Node"]);
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
        var myDiagram = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Diagram"], this.element.nativeElement, {
            allowDrop: true,
            allowCopy: false,
            nodeTemplateMap: templmap,
            'undoManager.isEnabled': true,
            'initialContentAlignment': __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            //sfondo
            grid: $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Grid', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'LineH', { stroke: 'gray', strokeWidth: 0.5, interval: 10 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'LineV', { stroke: 'gray', strokeWidth: 0.5, interval: 10 })),
            'draggingTool.dragsLink': true,
            'draggingTool.isGridSnapEnabled': true,
            'linkingTool.isUnconnectedLinkValid': true,
            'relinkingTool.isUnconnectedLinkValid': true,
            //layout per i link selezionati nel diagramma
            'relinkingTool.fromHandleArchetype': $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Diamond', {
                segmentIndex: 0,
                cursor: 'pointer',
                desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](8, 8),
                fill: 'tomato',
                stroke: 'darkred'
            }),
            'relinkingTool.toHandleArchetype': $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Diamond', {
                segmentIndex: -1,
                cursor: 'pointer',
                desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](8, 8),
                fill: 'darkred',
                stroke: 'tomato'
            }),
            'linkReshapingTool.handleArchetype': $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Diamond', {
                desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](7, 7),
                fill: 'lightblue',
                stroke: 'deepskyblue'
            })
        });
        //adornment per i link
        var linkSelectionAdornmentTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Link', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { isPanelMain: true, fill: null, stroke: null, strokeWidth: 0 }));
        //creazione template link Avanzamento
        myDiagram.linkTemplateMap.add('', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate }, { relinkableFrom: true, relinkableTo: true, reshapable: true }, {
            routing: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].AvoidsNodes,
            curve: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].JumpOver,
            corner: 5,
            toShortLength: 2
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('points').makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: 'black', isPanelMain: true, strokeWidth: 2 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], // the arrowhead
        { fill: 'black', toArrow: 'OpenTriangle', scale: 1, stroke: 'black', strokeWidth: 1.7 })));
        //serve per il resize dei blocchi
        myDiagram.commandHandler.selectAll();
        var div = myDiagram.div;
        div.style.height = '100%';
        div.style.width = '100%';
        myDiagram.requestUpdate();
        //creazione template per i gruppi di nodi
        myDiagram.groupTemplate =
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Group"], 'Auto', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('isSubGraphExpanded', 'groupVisible').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), {
                background: '#ededed',
                mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
                mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
                computesBoundsAfterDrag: true,
                //////proprietà aggiunte per la location dei nodi:
                mouseDrop: finishDrop,
                handlesDragDropForMembers: true,
                layout: $(__WEBPACK_IMPORTED_MODULE_1_gojs__["GridLayout"], { alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["GridLayout"].Location,
                    cellSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](1, 1), spacing: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](4, 4) })
            }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('background', 'isHighlighted', function (h) { return h ? 'rgba(255,0,0,0.2)' : 'white'; }).ofObject(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Rectangle', { fill: null, stroke: '#FFDD33', strokeWidth: 12, portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                toMaxLinks: 1, fromMaxLinks: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('stroke', 'groupColor')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Vertical', { minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](155, 10) }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', { stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Horizontal, background: '#FFDD33' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('background', 'groupColor'), $('SubGraphExpanderButton', { alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Right, margin: 5 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
                alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
                editable: true,
                font: 'bold 18px sans-serif',
                stroke: '#212121'
            }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nome').makeTwoWay())), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Placeholder"], { padding: 5, margin: 5, visible: true })));
        /* funzione che  illummina area di inserimento di un blocco dentro un gruppo
         @param {e, grp} - e, grp sono parametri di gojs e rappresentano gli eventi legati al drag and drop dei blocchi
         @param {bool} - show è una variabile booleana che viene settata a true o false a seconda degli eventi mousedragenter e mousedragleave
         */
        function highlightGroup(e, grp, show) {
            if (!grp)
                return;
            e.handled = true;
            if (show) {
                var tool = grp.diagram.toolManager.draggingTool;
                var map = tool.draggedParts || tool.copiedParts;
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
            var ok = (grp !== null
                ? grp.addMembers(grp.diagram.selection, true)
                : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
            if (!ok)
                e.diagram.currentTool.doCancel();
        }
        var methods = document.getElementsByClassName('method');
        for (var i = 0; i < methods.length; ++i) {
            methods[i].addEventListener('click', function (e) {
                console.log(_this.project.getSelectedMethodDiagram());
                myDiagram.model = __WEBPACK_IMPORTED_MODULE_1_gojs__["Model"].fromJson(_this.project.getSelectedMethodDiagram()),
                    $(__WEBPACK_IMPORTED_MODULE_1_gojs__["GraphLinksModel"], {
                        copiesArrays: true,
                        copiesArrayObjects: true
                    });
                console.log(_this.project.getSelectedMethodDiagram());
            });
        }
        myDiagram.addDiagramListener('LayoutCompleted', function (e) {
            if (index >= 3) {
                console.log(myDiagram.model.toJson());
                _this.project.setSelectedMethodDiagram(myDiagram.model.toJson());
            }
            else {
                ++index;
            }
        });
        myDiagram.addDiagramListener('Modified', function (e) {
            if (index >= 3) {
                console.log(myDiagram.model.toJson());
                _this.project.setSelectedMethodDiagram(myDiagram.model.toJson());
            }
            else {
                ++index;
            }
        });
        myDiagram.addDiagramListener('ChangingSelection', function (e) {
            if (index >= 3) {
                console.log(myDiagram.model.toJson());
                _this.project.setSelectedMethodDiagram(myDiagram.model.toJson());
            }
            else {
                ++index;
            }
        });
        document.getElementById("containerActivityDX").addEventListener('click', function (e) {
            setTimeout(function () {
                myDiagram.animationManager.isEnabled = false;
                myDiagram.model = __WEBPACK_IMPORTED_MODULE_1_gojs__["Model"].fromJson(_this.project.getSelectedMethodDiagram(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["GraphLinksModel"], {
                    copiesArrays: true,
                    copiesArrayObjects: true
                }));
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
        }
        ;
    };
    ActivitydiagrameditorComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        var sxcol = document.getElementsByClassName('insertMethod');
        var _loop_1 = function (i) {
            if (sxcol[i].getAttribute('listened') === 'false') {
                sxcol[i].setAttribute('listened', 'true');
                sxcol[i].addEventListener('click', function (e) {
                    // si fa dare il template dal service con Id
                    _this.templateService.getTemplate(sxcol[i].id).subscribe(function (data) {
                        return _this.project.addPatternToActivityDiagram(data);
                    });
                });
            }
        };
        for (var i = 0; i < sxcol.length; ++i) {
            _loop_1(i);
        }
    };
    return ActivitydiagrameditorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('activityDiagramDiv'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object)
], ActivitydiagrameditorComponent.prototype, "element", void 0);
ActivitydiagrameditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-activitydiagrameditor',
        template: __webpack_require__(223),
        styles: [__webpack_require__(200)],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_template_service__["a" /* TemplateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_template_service__["a" /* TemplateService */]) === "function" && _c || Object])
], ActivitydiagrameditorComponent);

var _a, _b, _c;
//# sourceMappingURL=activitydiagrameditor.component.js.map

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gojs__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gojs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gojs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitydiagrampaletteComponent; });
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActivitydiagrampaletteComponent = (function () {
    function ActivitydiagrampaletteComponent() {
    }
    /* funzione che viene chiamata quando il componente ActivityDiagramEditor viene creato
     */
    ActivitydiagrampaletteComponent.prototype.ngAfterViewInit = function () {
        var $ = __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].make;
        //creazione variabile myPalette per le operazioni sul diagramma
        var myPalette = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Palette"], "activityPaletteDiv", {
            layout: $(__WEBPACK_IMPORTED_MODULE_1_gojs__["GridLayout"], {
                cellSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](200, 20),
                wrappingColumn: 1,
                alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["GridLayout"].Position
            })
        });
        var div = myPalette.div;
        div.style.height = '100%';
        div.style.width = '100%';
        myPalette.requestUpdate();
        //creazione template per il nodo start
        var starttemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 90, height: 90 }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Circle', { fill: 'white', strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key').makeTwoWay())));
        //creazione template per il textblock tipovalore all'interno del blocco variabile
        var tipovaloreTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'type').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name', function (t) {
            return (t ? ': ' : '');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'default', function (s) {
            return s ? ' = ' + s : '';
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'tipovaloreID').makeTwoWay()));
        //creazione template per il nodo variabile
        var variabiletemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Procedure', {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](176, 50)
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', 
        //linea che separa nomevariabile dal suo tipo e dal suo tipo e suo valore
        { minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](160, 50) }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 2, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 4, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), 
        //Nome della variabile
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            row: 1, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            font: 'bold 12pt sans-serif',
            isMultiline: false,
            editable: true
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nomevariabile').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Vertical', { name: 'TIPO-VALORE' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('itemArray', 'tipivalori'), {
            row: 4, margin: 3, stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Fill,
            defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            itemTemplate: tipovaloreTemplate
        })));
        //creazione template per il textblock parametro all'interno del blocco chiamatametodo
        var methodTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'type').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ''), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'variabile').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('isUnderline', 'scope', function (s) {
            return s[1] === 'c';
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'type', function (t) {
            return (t ? ': ' : '');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'paramatersID').makeTwoWay()));
        //creazione template nodo chiamatametodo
        var chiamatametodotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'DividedEvent', {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](198, 50)
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', 
        //linea che separa nomemetodo dai suoi parametri
        { minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](198, 50) }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 2, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 4, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            row: 1, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            font: 'bold 12pt sans-serif',
            isMultiline: false,
            editable: true
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'nomemetodo').makeTwoWay()), 
        // parametri
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Vertical', { name: 'PARAMETRI' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('itemArray', 'parameters'), {
            row: 4, margin: 3, stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Fill,
            defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            itemTemplate: methodTemplate
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('itemArray', 'parameters').makeTwoWay())), {
            contextMenu: $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Spot', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Auto', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Placeholder"])))
        });
        //creazione template nodo ciclo
        var ciclotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "RoundedRectangle", { width: 170, height: 90 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo ciclocondizone all'interno di ciclo
        var ciclocondizionetemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "RoundedRectangle", { width: 150, height: 50 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].TopCenter }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo ciclocorpo all'interno di ciclo
        var ciclocorpotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "RoundedRectangle", { width: 170, height: 50 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].BottomCenter }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo ifelse
        var ifelsetemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "RoundedRectangle", { width: 170, height: 90 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo ifcondizione all'interno di ifelse
        var ifcondizionetemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "RoundedRectangle", { width: 170, height: 50 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].TopCenter }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo ifcorpo all'interno di ifelse
        var ifcorpotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "RoundedRectangle", { width: 170, height: 50 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].BottomCenter }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo elsecorpo all'interno di ifelse
        var elsecorpotemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "RoundedRectangle", { width: 170, height: 50 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].BottomCenter }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo operatore
        var operatoretemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo sxoperatore all'interno di operatore
        var sxoperatoretemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "RoundedRectangle", { width: 60, height: 60 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo dxoperatore all'interno di operatore
        var dxoperatoretemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "RoundedRectangle", { width: 60, height: 60 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Right }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template nodo operazione all'interno di operatore
        var operazioneoperatoretemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "Diamond", { width: 165, height: 60 }, { fill: "white", strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("fill", "color")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { font: "bold 12pt sans-serif" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome"))));
        //creazione template per il textblock descrizionejolly all'interno del blocco jolly
        var descrizionejollyTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: true, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'testo').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { visible: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'testoID').makeTwoWay()));
        //creazione template nodo jolly
        var jollytemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc', __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].parse).makeTwoWay(__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"].stringify), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'ExternalOrganization', {
            name: 'SHAPE',
            fill: "white", strokeWidth: 1,
            width: 198, height: 80,
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'Jolly', { row: 0, column: 0, columnSpan: 2, font: 'bold 12pt sans-serif' })));
        //creazione template nodo end
        var endtemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', { width: 90, height: 90 }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Circle', { fill: 'white', strokeWidth: 1 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            editable: false
        }, { font: 'bold 12pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'key'))));
        //associazione per ogni nodo il suo template creato precedentemente
        var templmap = new __WEBPACK_IMPORTED_MODULE_1_gojs__["Map"]("string", __WEBPACK_IMPORTED_MODULE_1_gojs__["Node"]);
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
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Group"], "Auto", {
                background: "transparent",
                computesBoundsAfterDrag: true,
                handlesDragDropForMembers: false,
                layout: $(__WEBPACK_IMPORTED_MODULE_1_gojs__["GridLayout"], { wrappingColumn: 1, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["GridLayout"].Position,
                    cellSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](1, 1), spacing: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](4, 4) })
            }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "Rectangle", { fill: null, stroke: "#FFDD33", strokeWidth: 12 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("stroke", "groupColor")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Vertical", { minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](155, 10) }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Horizontal", { stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Horizontal, background: "#FFDD33" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("background", "groupColor"), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
                alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
                editable: true,
                margin: 5,
                font: "bold 18px sans-serif",
                stroke: "#212121"
            }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "nome").makeTwoWay())), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Placeholder"], { padding: 5, margin: 5 })));
        //definizione dell'array contente i blocchi identificaty da una key univoca
        myPalette.model.nodeDataArray = [
            { key: "Variabile", color: "#fff59d", category: "variabile", variabileVisible: true,
                nomevariabile: "Variabile",
                tipivalori: [
                    { type: "Tipo", name: "Valore", tipovaloreID: 0 }
                ],
                tipovaloreCount: 1,
            },
            { key: "Ciclo", nome: "Ciclo", color: "#a4cfff", category: "ciclo", groupVisible: true, isGroup: true, groupColor: "#a4cfff" },
            { key: "Ciclocondizione", nome: "Condizione", color: "lightskyblue", category: "ciclocondizione", groupVisible: true, group: "Ciclo", isGroup: true, groupColor: "#b9d7f8" },
            { key: "Ciclocorpo", nome: "Corpo", color: "lightskyblue", category: "ciclocorpo", groupVisible: true, group: "Ciclo", isGroup: true, groupColor: "#b9d7f8" },
            { key: "Chiamatametodo", color: "#e1bee7", category: "chiamatametodo", chiamatametodoVisible: true,
                nomemetodo: "Metodo",
                parameters: [
                    { type: "Tipo", variabile: "Variabile", name: "Valore", parametersID: 0 }
                ],
                parametersCount: 1,
            },
            { key: "Ifelse", nome: "Ifelse", color: "salmon", category: "ifelse", groupVisible: true, isGroup: true, groupColor: "#acf191" },
            { key: "Ifcondizione", nome: "Ifcondizione", color: "lightcoral", category: "ifcondizione", groupVisible: true, group: "Ifelse", isGroup: true, groupColor: "#bdf2a8" },
            { key: "Ifcorpo", nome: "Ifcorpo", color: "lightcoral", category: "ifcorpo", groupVisible: true, group: "Ifelse", isGroup: true, groupColor: "#bdf2a8" },
            { key: "Elsecorpo", nome: "Elsecorpo", color: "lightcoral", category: "elsecorpo", groupVisible: true, group: "Ifelse", isGroup: true, groupColor: "#bdf2a8" },
            { key: "Operatore", nome: "Operatore", color: "aquamarine", category: "operatore", groupVisible: true, isGroup: true, groupColor: "#64ffda" },
            { key: "Sxoperatore", nome: "Sxoperatore", color: "aquamarine", category: "sxoperatore", groupVisible: true, group: "Operatore", isGroup: true, groupColor: "#9afde5" },
            { key: "Operazione", nome: "Operazione", color: "#42f7cc", category: "operazione", group: "Operatore" },
            { key: "Dxoperatore", nome: "Dxoperatore", color: "aquamarine", category: "dxoperatore", groupVisible: true, group: "Operatore", isGroup: true, groupColor: "#9afde5" },
            { key: "Jolly", color: "#ff9e80", category: "jolly", jollyVisible: true,
                descrizione: [
                    { testo: "testodiprova", testoID: 0 }
                ],
            },
        ];
    };
    return ActivitydiagrampaletteComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('activityPaletteDiv'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object)
], ActivitydiagrampaletteComponent.prototype, "element", void 0);
ActivitydiagrampaletteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-activitydiagrampalette',
        template: __webpack_require__(224),
        styles: [__webpack_require__(201)]
    })
], ActivitydiagrampaletteComponent);

var _a;
//# sourceMappingURL=activitydiagrampalette.component.js.map

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitypageComponent; });
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActivitypageComponent = (function () {
    function ActivitypageComponent(project) {
        this.project = project;
        this.openpalette = false;
    }
    ActivitypageComponent.prototype.open = function () {
        this.openpalette = !this.openpalette;
    };
    ActivitypageComponent.prototype.ngOnInit = function () {
    };
    return ActivitypageComponent;
}());
ActivitypageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-activitypage',
        template: __webpack_require__(225),
        styles: [__webpack_require__(202)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */]) === "function" && _a || Object])
], ActivitypageComponent);

var _a;
//# sourceMappingURL=activitypage.component.js.map

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_template_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassimetodipaletteComponent; });
/*
 * File: classimetodipalette.component
 * Version: 1.0
 * Type: typescript
 * Date: 04-06-2017
 * Author: Saverio Follador, Alberto Giudice
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alberto Giudice || 06-06-2017 ||  integrazione con il componente acitivitydiagrameditor.component.ts
 * Saverio Follador || 04-06-2017 || creazione possibili collegamenti a servizi per interfacciarsi al Back-end
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClassimetodipaletteComponent = (function () {
    function ClassimetodipaletteComponent(templateService, project) {
        this.templateService = templateService;
        this.project = project;
        this.toggleList = [false];
    }
    ClassimetodipaletteComponent.prototype.open = function (index) {
        // console.log(this.classes.Id);
        this.toggleList[index] = !this.toggleList[index];
        // this.toggleList2 = false;
    };
    ClassimetodipaletteComponent.prototype.ngOnInit = function () {
    };
    return ClassimetodipaletteComponent;
}());
ClassimetodipaletteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-classimetodipalette',
        template: __webpack_require__(226),
        styles: [__webpack_require__(203)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_template_service__["a" /* TemplateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_template_service__["a" /* TemplateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */]) === "function" && _b || Object])
], ClassimetodipaletteComponent);

var _a, _b;
//# sourceMappingURL=classimetodipalette.component.js.map

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_template_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibreriapaletteComponent; });
/*
 * File: activitydiagrampalette.component
 * Version: 0.9
 * Type: typescript
 * Date: 04-06-2017
 * Author: Saverio Follador, Alberto Giudice
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Alberto Giudice || 06-06-2017 ||  integrazione con il componente acitivitydiagrameditor.component.ts
 * Saverio Follador || 04-06-2017 || creazione possibili collegamenti a servizi per interfacciarsi al Back-end
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LibreriapaletteComponent = (function () {
    function LibreriapaletteComponent(project, templateService) {
        this.project = project;
        this.templateService = templateService;
        this.toggleList = [false];
    }
    LibreriapaletteComponent.prototype.open = function (index) {
        // console.log(this.classes.Id);
        this.toggleList[index] = !this.toggleList[index];
        // this.toggleList2 = false;
    };
    LibreriapaletteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.templateService.getActivityList().subscribe(function (activityList) { return _this.activityList = activityList; });
    };
    return LibreriapaletteComponent;
}());
LibreriapaletteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-libreriapalette',
        template: __webpack_require__(227),
        styles: [__webpack_require__(204)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_template_service__["a" /* TemplateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_template_service__["a" /* TemplateService */]) === "function" && _b || Object])
], LibreriapaletteComponent);

var _a, _b;
//# sourceMappingURL=libreriapalette.component.js.map

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gojs__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gojs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gojs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_template_service__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassdiagrameditorComponent; });
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClassdiagrameditorComponent = (function () {
    function ClassdiagrameditorComponent(project, templateService) {
        this.project = project;
        this.templateService = templateService;
    }
    ClassdiagrameditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.project.setSelectedMethod(null, null);
        var $ = __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].make;
        var priority1 = this.project.getCheckbox(0);
        var priority2 = this.project.getCheckbox(1);
        var priority3 = this.project.getCheckbox(2);
        var priority4 = this.project.getCheckbox(3);
        var priority5 = this.project.getCheckbox(4);
        var myDiagram = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Diagram"], this.element.nativeElement, {
            initialContentAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            allowDrop: true,
            allowClipboard: false,
            //sfondo
            grid: $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Grid', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'LineH', { stroke: 'gray', strokeWidth: 0.5, interval: 10 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'LineV', { stroke: 'gray', strokeWidth: 0.5, interval: 10 })),
            'undoManager.isEnabled': true,
            'draggingTool.dragsLink': true,
            'relinkingTool.isUnconnectedLinkValid': true,
            //layout per le frecce elezionate nel diagramma
            'relinkingTool.fromHandleArchetype': $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Diamond', {
                segmentIndex: 0,
                desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](8, 8),
                fill: 'tomato',
                stroke: 'darkred'
            }),
            'relinkingTool.toHandleArchetype': $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Diamond', {
                segmentIndex: -1,
                desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](8, 8),
                fill: 'darkred',
                stroke: 'tomato'
            }),
            'linkReshapingTool.handleArchetype': $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Diamond', {
                desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](7, 7),
                fill: 'lightblue',
                stroke: 'deepskyblue'
            })
        });
        myDiagram.commandHandler.selectAll(); //serve per fare la resize del commento
        var div = myDiagram.div;
        div.style.height = '100%';
        div.style.width = '100%';
        myDiagram.requestUpdate();
        myDiagram.allowLink = false; //impedisce il disegno delle frecce
        var linkSelectionAdornmentTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Link', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { isPanelMain: true, fill: null, stroke: 'deepskyblue', strokeWidth: 0 }) // use selection object's strokeWidth
        );
        myDiagram.linkTemplateMap.add('', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate }, { relinkableFrom: true, relinkableTo: true, reshapable: true }, {
            routing: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].AvoidsNodes,
            curve: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].JumpOver,
            corner: 5,
            toShortLength: 4
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('points').makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: 'black', isPanelMain: true, strokeWidth: 2 })));
        myDiagram.linkTemplateMap.add('Generalizzazione', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate }, { relinkableFrom: true, relinkableTo: true, reshapable: true }, {
            routing: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].AvoidsNodes,
            curve: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].JumpOver,
            corner: 5,
            toShortLength: 4
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('points').makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: 'black', isPanelMain: true, strokeWidth: 2 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], // la punta della freccia
        { fill: 'yellow', toArrow: 'Standard', stroke: 'black', strokeWidth: 1 })));
        myDiagram.linkTemplateMap.add('Aggregazione', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate }, { relinkableFrom: true, relinkableTo: true, reshapable: true }, {
            routing: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].AvoidsNodes,
            curve: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].JumpOver,
            corner: 5,
            toShortLength: 4
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('points').makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: 'black', isPanelMain: true, strokeWidth: 2 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: 'yellow', toArrow: 'StretchedDiamond', scale: 1, stroke: 'black', strokeWidth: 1 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ' ', {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            stroke: '#1967B3',
            isMultiline: false,
            editable: true,
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](10, NaN),
            segmentIndex: 0,
            background: 'white',
            segmentOffset: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](NaN, NaN),
            segmentOrientation: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].OrientUpright
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'fromtext').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ' ', {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            isMultiline: false,
            stroke: '#1967B3',
            editable: true,
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](10, NaN),
            segmentIndex: -1,
            background: 'white',
            segmentOffset: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](NaN, NaN),
            segmentOrientation: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].OrientUpright
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'totext').makeTwoWay())));
        myDiagram.linkTemplateMap.add('Composizione', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate }, { relinkableFrom: true, relinkableTo: true, reshapable: true }, {
            routing: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].AvoidsNodes,
            curve: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].JumpOver,
            corner: 5,
            toShortLength: 4
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('points').makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: 'black', isPanelMain: true, strokeWidth: 2 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], //la punta della freccia
        { fill: 'black', toArrow: 'StretchedDiamond', scale: 1, stroke: 'black', strokeWidth: 1 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ' ', {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            stroke: '#1967B3',
            editable: true,
            isMultiline: false,
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](10, NaN),
            segmentIndex: 0,
            background: 'white',
            segmentOffset: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](NaN, NaN),
            segmentOrientation: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].OrientUpright
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'fromtext').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ' ', {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            stroke: '#1967B3',
            editable: true,
            isMultiline: false,
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](10, NaN),
            segmentIndex: -1,
            background: 'white',
            segmentOffset: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](NaN, NaN),
            segmentOrientation: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].OrientUpright
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'totext').makeTwoWay())));
        myDiagram.linkTemplateMap.add('Associazione', //mettere cardinalità
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate }, { relinkableFrom: true, relinkableTo: true, reshapable: true }, {
            routing: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].AvoidsNodes,
            curve: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].JumpOver,
            corner: 5,
            toShortLength: 2
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('points').makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: 'black', isPanelMain: true, strokeWidth: 2 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], // the arrowhead
        { fill: 'black', toArrow: 'OpenTriangle', scale: 1, stroke: 'black', strokeWidth: 1.7 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ' ', // label alla partenza della freccia
        {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            stroke: '#1967B3',
            editable: true,
            isMultiline: false,
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](10, NaN),
            segmentIndex: 0,
            background: 'white',
            segmentOffset: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](NaN, NaN),
            segmentOrientation: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].OrientUpright
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'fromtext').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ' ', //label arrrivo della fdreccia
        {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            stroke: '#1967B3',
            editable: true,
            isMultiline: false,
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](10, NaN),
            segmentIndex: -1,
            background: 'white',
            segmentOffset: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](NaN, NaN),
            segmentOrientation: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].OrientUpright
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'totext').makeTwoWay())));
        myDiagram.linkTemplateMap.add('Dipendenza', //mettere cardinalità
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], // the whole link panel
        { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate }, { relinkableFrom: true, relinkableTo: true, reshapable: true }, {
            routing: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].AvoidsNodes,
            curve: __WEBPACK_IMPORTED_MODULE_1_gojs__["Link"].JumpOver,
            corner: 5,
            toShortLength: 0
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('points').makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: 'black', isPanelMain: true, strokeWidth: 2 })));
        // template per i metodi
        var methodTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, {
            contextMenu: //menu per la scelta della priorità
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Vertical', { alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Top, alignmentFocus: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Right }, $('Button', { width: 100, click: function (e, obj) {
                    changeVisibilityMethod(obj.part, '+');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '(+) public')), $('Button', { width: 100, click: function (e, obj) {
                    changeVisibilityMethod(obj.part, '-');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '(-) private')), $('Button', { width: 100, click: function (e, obj) {
                    changeVisibilityMethod(obj.part, '~');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '(~) package')), $('Button', { width: 100, click: function (e, obj) {
                    changeVisibilityMethod(obj.part, '#');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '(#) protected')))
        }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: false, width: 12 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'visibility').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
        })), 
        // parametri del metodo
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'parameters', function (p) {
            return (p ? '(' : '()');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'parameters').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'parameters', function (p) {
            return (p ? ')' : '');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'type', function (t) {
            return (t ? ': ' : '');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'type').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ' ', { editable: false }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'x', { font: 'bold 10pt Verdana, sans-serif', stroke: 'red' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'methodID').makeTwoWay(), { opacity: 0 }, { click: deleteMetodo })));
        myDiagram.nodeTemplateMap.add('Commento', //definizione del blocco commento
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc').makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'File', { fill: '#ff9e80', minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](170, 60), portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'Commento', { row: 2, font: 'bold 12pt sans-serif', margin: 3 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'visible', function (v) {
            return !v;
        }).ofObject('TESTO')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Vertical', { name: 'TESTO' }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { editable: true, isMultiline: true, margin: 10 }, { row: 0, column: 0, columnSpan: 2, font: '10pt sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'description').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'descvisibile', function (v) {
            return !v;
        }).ofObject('TESTO')), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'commentVisible').makeTwoWay()), $('PanelExpanderButton', 'TESTO', { row: 0, visible: true, column: 2, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].TopRight }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'descvisibile', function (arr) {
            return arr.length > 0;
        })))));
        var changeColorClass = function (e, button) {
            var node = button.part.adornedPart;
            var shape = node.findObject('SHAPE');
            if (shape === null)
                return;
            node.diagram.startTransaction('Change color');
            shape.fill = button['_buttonFillNormal'];
            node.diagram.commitTransaction('Change color');
            _this.project.setDiagram(myDiagram.model.toJson());
        };
        var attributiTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', {
            contextMenu: //menu per la scelta della priorità
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Vertical', { alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Top, alignmentFocus: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Right }, $('Button', { width: 100, click: function (e, obj) {
                    changeVisibilityAttribute(obj.part, '+');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '(+) public')), $('Button', { width: 100, click: function (e, obj) {
                    changeVisibilityAttribute(obj.part, '-');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '(-) private')), $('Button', { width: 100, click: function (e, obj) {
                    changeVisibilityAttribute(obj.part, '~');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '(~) package')), $('Button', { width: 100, click: function (e, obj) {
                    changeVisibilityAttribute(obj.part, '#');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '(#) protected')))
        }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: false, width: 12 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'visibility').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('isUnderline', 'scope', function (s) {
            return s[0] === 'c';
        })), 
        // tipo della proprietà
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'type', function (t) {
            return (t ? ': ' : '');
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'type').makeTwoWay()), 
        // property default value, if any
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'default', function (s) {
            return s ? ' = ' + s : '';
        })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], ' ', { editable: false }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'x', { font: 'bold 10pt Verdana, sans-serif', stroke: 'red' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'attributeID').makeTwoWay(), { opacity: 0 }, { click: deleteAttributo })));
        myDiagram.nodeTemplateMap.add('Classe', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], 'Auto', new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('location', 'loc').makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'Rectangle', {
            name: 'SHAPE',
            fill: '#fff59d',
            minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](150, NaN),
            portId: '', fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer',
            opacity: 1.0
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color').makeTwoWay()), //fine shape
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Table', 
        //linea che separa nome dai metodi
        { minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](150, NaN) }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 2, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 4, separatorStrokeWidth: 1.5, separatorStroke: 'black' }), 
        //PreHeader
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            name: 'TIPO',
            row: 0, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            margin: 3,
            font: '10pt sans-serif',
            isMultiline: false,
            editable: false,
            opacity: 0.3
        }, {
            contextMenu: //menu per la scelta della priorità
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Vertical', { alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Top, alignmentFocus: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $('Button', { click: function (e, obj) {
                    changeStereotypeClass(obj.part, 'default');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'default', { textAlign: 'center', width: 80, height: 15 })), $('Button', { click: function (e, obj) {
                    changeStereotypeClass(obj.part, 'abstract');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'abstract', { textAlign: 'center', width: 80, height: 15, font: 'italic 10pt sans-serif' })), $('Button', { click: function (e, obj) {
                    changeStereotypeClass(obj.part, '<<interface>>');
                } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '<<interface>>', { textAlign: 'center', width: 80, height: 15 })))
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'tipo').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('opacity', 'tipoOpacity').makeTwoWay()), 
        //Nome della Classe
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            row: 1, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            font: 'bold 12pt sans-serif',
            isMultiline: false,
            editable: true
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('font', 'fontNomeClasse').makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'name').makeTwoWay()), 
        // attributi
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'Attributi', { row: 2, font: 'italic 10pt sans-serif', margin: 3 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'visible', function (v) {
            return !v;
        }).ofObject('ATTRIBUTI')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '+', {
            stroke: 'green',
            margin: 2,
            row: 2,
            column: 2,
            font: 'bold 14pt sans-serif',
            alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].BottomRight,
            click: addAttributo
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'visible', function (v) {
            return v;
        }).ofObject('ATTRIBUTI')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Vertical', { name: 'ATTRIBUTI' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('itemArray', 'attributi').makeTwoWay(), {
            row: 2, margin: 3, stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Fill,
            defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            itemTemplate: attributiTemplate
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'attributeVisible').makeTwoWay()), $('PanelExpanderButton', 'ATTRIBUTI', { row: 2, visible: true, column: 3, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].TopRight }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'notInterface').makeTwoWay()), 
        //Scritta che viene mostrata quando il pannello è ridotto
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'Metodi', { row: 4, font: 'italic 10pt sans-serif', margin: 3 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'visible', function (v) {
            return !v;
        }).ofObject('METHODS')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '+', {
            stroke: 'green',
            margin: 2,
            row: 4,
            column: 2,
            font: 'bold 14pt sans-serif',
            alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].BottomRight,
            click: addMethod
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'visible', function (v) {
            return v;
        }).ofObject('METHODS')), 
        // methods
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Vertical', { name: 'METHODS' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('itemArray', 'methods').makeTwoWay(), {
            row: 4, margin: 3, stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Fill,
            defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            itemTemplate: methodTemplate
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'methodVisible').makeTwoWay()), $('PanelExpanderButton', 'METHODS', { row: 4, visible: false, column: 3, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].TopRight }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('visible', 'methods', function (arr) {
            return arr.length > 0;
        })), printPriorityAdornment(1, '0.2 0', '0.5 1')), {
            contextMenu: // define a context menu for each node
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Spot', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Auto', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Placeholder"])), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Horizontal', { alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Top, alignmentFocus: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $('Button', { 'ButtonBorder.fill': '#fff59d', click: changeColorClass }, // defined below, to support changing the color of the node
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: '#fff59d', stroke: null, desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](14, 14) })), $('Button', { 'ButtonBorder.fill': '#a4cfff', click: changeColorClass }, // defined below, to support changing the color of the node
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: '#a4cfff', stroke: null, desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](14, 14) })), $('Button', { 'ButtonBorder.fill': '#e1bee7', click: changeColorClass }, // defined below, to support changing the color of the node
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: '#e1bee7', stroke: null, desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](14, 14) })), $('Button', { 'ButtonBorder.fill': '#acf191', click: changeColorClass }, // defined below, to support changing the color of the node
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: '#acf191', stroke: null, desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](14, 14) })), $('Button', { 'ButtonBorder.fill': '#64ffda', click: changeColorClass }, // defined below, to support changing the color of the node
            $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: '#64ffda', stroke: null, desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](14, 14) })))) // end Adornment
        }));
        var changeStereotypeClass = function (node, type) {
            myDiagram.startTransaction('change type classe');
            myDiagram.model.setDataProperty(node.data, 'tipo', type);
            myDiagram.commitTransaction('Changed type classe');
            adaptStereotypeClass(node);
            //this.project.setDiagram(myDiagram.model.toJson());
        };
        var changeVisibilityAttribute = function (node, newvisibility) {
            myDiagram.startTransaction('change visibility attribute');
            myDiagram.model.setDataProperty(node.data, 'visibility', newvisibility);
            myDiagram.commitTransaction('Changed visibility attribute');
            _this.project.setDiagram(myDiagram.model.toJson());
        };
        var changeVisibilityMethod = function (node, newvisibility) {
            myDiagram.startTransaction('change visibility method');
            myDiagram.model.setDataProperty(node.data, 'visibility', newvisibility);
            myDiagram.commitTransaction('Changed visibility method');
            _this.project.setDiagram(myDiagram.model.toJson());
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
        function ChangePriority(node, newpriority) {
            myDiagram.startTransaction('change Priority');
            myDiagram.model.setDataProperty(node.data, 'priority', newpriority);
            refreshClassOpacity();
            myDiagram.commitTransaction('Changed Priority');
        }
        ;
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
            var shape = obj.findObject('TAPE');
            var testo = obj.findObject('TESTO');
            testo.opacity = 1;
            shape.opacity = 1;
        }
        ;
        function mouseL(e, obj) {
            var shape = obj.findObject('TAPE');
            var testo = obj.findObject('TESTO');
            testo.opacity = 0.1;
            shape.opacity = 0.1;
        }
        ;
        function printPriorityAdornment(number, align, focus) {
            //allineamento interno alla forma della classe
            if (typeof align === 'string')
                align = __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].parse(align);
            if (!align || !align.isSpot())
                align = __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Right;
            if (typeof focus === 'string')
                focus = __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].parse(focus);
            if (!focus || !focus.isSpot())
                focus = align.opposite();
            return $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], 'Spot', {
                column: 3,
                mouseOver: mouseE,
                mouseLeave: mouseL
            }, {
                contextMenu: //menu per la scelta della priorità
                $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Vertical', { alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Top, alignmentFocus: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Bottom }, $('Button', { click: function (e, obj) {
                        ChangePriority(obj.part, '1');
                    } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '1')), $('Button', { click: function (e, obj) {
                        ChangePriority(obj.part, '2');
                    } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '2')), $('Button', { click: function (e, obj) {
                        ChangePriority(obj.part, '3');
                    } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '3')), $('Button', { click: function (e, obj) {
                        ChangePriority(obj.part, '4');
                    } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '4')), $('Button', { click: function (e, obj) {
                        ChangePriority(obj.part, '5');
                    } }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], '5')))
            }, { name: number.toString(), alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].TopRight }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], 'TransmittalTape', //forma
            {
                opacity: 0.1,
                name: 'TAPE',
                desiredSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](30, 25),
                fill: 'white', stroke: 'black', strokeWidth: 1, width: 20
            }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill')), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], number.toString(), //numero contenuto
            // {visible:false},
            { name: 'TESTO', opacity: 0.1, font: '10pt Verdana, sans-serif' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'priority')));
        }
        ;
        function addMethod(e, obj) {
            var node = obj.part;
            var data = node.data;
            if (data) {
                updateMethodCount(node, data.methods.length);
                node.diagram.startTransaction('nuovo metodo');
                myDiagram.model.addArrayItem(data.methods, {
                    name: 'metodo' + ((data.methodCount) + 1).toString(),
                    parameters: '', type: 'void', visibility: '+', methodID: data.methodCount++
                });
                node.diagram.commitTransaction('nuovo metodo');
            }
        }
        ;
        function deleteMetodo(e, obj) {
            var node = obj.part;
            var data = node.data;
            var ind = Number(obj.text);
            if (data) {
                node.diagram.startTransaction('rimosso metodo');
                myDiagram.model.removeArrayItem(data.methods, ind);
                for (; ind < data.methods.length; ind++) {
                    myDiagram.model.setDataProperty(data.methods[ind], 'methodID', ind);
                }
                node.diagram.commitTransaction('rimosso metodo');
                updateMethodCount(node, data.methods.length);
            }
        }
        ;
        function updateMethodCount(node, lng) {
            myDiagram.model.setDataProperty(node.data, 'methodCount', lng);
        }
        function addAttributo(e, obj) {
            var node = obj.part;
            var data = node.data;
            if (data) {
                updateAttributeCount(node, data.attributi.length);
                node.diagram.startTransaction('nuovo attributo');
                myDiagram.model.addArrayItem(data.attributi, {
                    name: 'attributo' + ((data.attributeCount) + 1).toString(), type: 'String', visibility: '+',
                    attributeID: data.attributeCount++
                });
                node.diagram.commitTransaction('nuovo attributo');
            }
        }
        ;
        function deleteAttributo(e, obj) {
            var node = obj.part;
            var data = node.data;
            var ind = Number(obj.text);
            if (data) {
                node.diagram.startTransaction('rimosso attributo');
                myDiagram.model.removeArrayItem(data.attributi, ind);
                for (; ind < data.attributi.length; ind++) {
                    myDiagram.model.setDataProperty(data.attributi[ind], 'attributeID', ind);
                }
                node.diagram.commitTransaction('rimosso attributo');
                updateAttributeCount(node, data.attributi.length);
            }
        }
        ;
        function updateAttributeCount(node, lng) {
            myDiagram.model.setDataProperty(node.data, 'attributeCount', lng);
        }
        myDiagram.addDiagramListener('TextEdited', function (e) {
            _this.project.setDiagram(myDiagram.model.toJson());
            console.log(_this.project.getClassDiagram());
        });
        myDiagram.addDiagramListener('LayoutCompleted', function (e) {
            _this.project.setDiagram(myDiagram.model.toJson());
            console.log(_this.project.getClassDiagram());
        });
        myDiagram.addDiagramListener('Modified', function (e) {
            refreshClassOpacity();
            _this.project.setDiagram(myDiagram.model.toJson());
            console.log(_this.project.getClassDiagram());
        });
        myDiagram.addDiagramListener('BackgroundSingleClicked', function (e) {
            _this.project.setDiagram(myDiagram.model.toJson());
            console.log(_this.project.getClassDiagram());
        });
        document.getElementById('library-items').addEventListener('click', function (e) {
            setTimeout(function () {
                myDiagram.animationManager.isEnabled = false;
                myDiagram.model = __WEBPACK_IMPORTED_MODULE_1_gojs__["Model"].fromJson(_this.project.getClassDiagram(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["GraphLinksModel"], {
                    copiesArrays: true,
                    copiesArrayObjects: true
                }));
                myDiagram.animationManager.isEnabled = true;
            }, 500);
        });
        var prioritycontrols2 = document.getElementById('check2');
        prioritycontrols2.addEventListener('click', function (e) {
            priority2 = !_this.project.getCheckbox(1);
            refreshClassOpacity();
            _this.project.setDiagram(myDiagram.model.toJson());
        });
        var prioritycontrols3 = document.getElementById('check3');
        prioritycontrols3.addEventListener('click', function (e) {
            priority3 = !_this.project.getCheckbox(2);
            refreshClassOpacity();
            _this.project.setDiagram(myDiagram.model.toJson());
        });
        var prioritycontrols4 = document.getElementById('check4');
        prioritycontrols4.addEventListener('click', function (e) {
            priority4 = !_this.project.getCheckbox(3);
            refreshClassOpacity();
            _this.project.setDiagram(myDiagram.model.toJson());
        });
        var prioritycontrols5 = document.getElementById('check5');
        prioritycontrols5.addEventListener('click', function (e) {
            priority5 = !_this.project.getCheckbox(4);
            refreshClassOpacity();
            _this.project.setDiagram(myDiagram.model.toJson());
        });
        function refreshClassOpacity() {
            var it = myDiagram.nodes;
            while (it.next()) {
                var node = it.value;
                if (node.data.category == 'Classe') {
                    var i = node.data.priority;
                    switch (i) {
                        case '1':
                            globalChangeOpacity(node, priority1);
                            break;
                        case '2':
                            globalChangeOpacity(node, priority2);
                            break;
                        case '3':
                            globalChangeOpacity(node, priority3);
                            break;
                        case '4':
                            globalChangeOpacity(node, priority4);
                            break;
                        case '5':
                            globalChangeOpacity(node, priority5);
                            break;
                        default: break;
                    }
                }
            }
        }
        ;
        function globalChangeOpacity(node, condition) {
            node.diagram.startTransaction('Change Opacity');
            if (condition === true)
                node.opacity = 1.0;
            else
                node.opacity = 0.2;
            node.diagram.commitTransaction('Change Opacity');
        }
        ;
        myDiagram.model = __WEBPACK_IMPORTED_MODULE_1_gojs__["Model"].fromJson(this.project.getClassDiagram(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["GraphLinksModel"], {
            copiesArrays: true,
            copiesArrayObjects: true
        }));
    };
    ClassdiagrameditorComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        var sxcol = document.getElementsByClassName('libr');
        var _loop_1 = function (i) {
            if (sxcol[i].getAttribute('listened') === 'false') {
                sxcol[i].setAttribute('listened', 'true');
                sxcol[i].addEventListener('click', function (e) {
                    // si fa dare il template dal service con Id
                    _this.templateService.getTemplate(sxcol[i].id).subscribe(function (data) {
                        return _this.project.addPatternToClassDiagram(data);
                    });
                });
            }
        };
        for (var i = 0; i < sxcol.length; ++i) {
            _loop_1(i);
        }
    };
    return ClassdiagrameditorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('myDiagramDiv'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object)
], ClassdiagrameditorComponent.prototype, "element", void 0);
ClassdiagrameditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-classdiagrameditor',
        template: __webpack_require__(228),
        styles: [__webpack_require__(205)],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_template_service__["a" /* TemplateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_template_service__["a" /* TemplateService */]) === "function" && _c || Object])
], ClassdiagrameditorComponent);

var _a, _b, _c;
//# sourceMappingURL=classdiagrameditor.component.js.map

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gojs__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gojs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gojs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassdiagrampaletteComponent; });
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClassdiagrampaletteComponent = (function () {
    function ClassdiagrampaletteComponent() {
    }
    ClassdiagrampaletteComponent.prototype.ngAfterViewInit = function () {
        var $ = __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].make;
        var myPalette = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Palette"], "myPaletteDiv", { layout: $(__WEBPACK_IMPORTED_MODULE_1_gojs__["GridLayout"], { wrappingColumn: 1, cellSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](186, 5), alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["GridLayout"].Position }) });
        var linkSelectionAdornmentTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Adornment"], 'Link', $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { isPanelMain: true, fill: null, stroke: null, strokeWidth: 0 }));
        myPalette.nodeTemplateMap.add("Commento", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("location", "loc").makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "File", { width: 186, height: 80 }, { fill: "#ff9e80" }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center }, $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], 'Commento', {
            editable: false, isMultiline: true
        }, { row: 0, column: 0, columnSpan: 2, font: "bold 12pt sans-serif" }))));
        var attributiTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Horizontal", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true, width: 12 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "visibility")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "name").makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("isUnderline", "scope", function (s) { return s[0] === 'c'; })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], "", new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "type", function (t) { return (t ? ": " : ""); })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "type").makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: false }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "default", function (s) { return s ? " = " + s : ""; })));
        var methodTemplate = $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Horizontal", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true, width: 12 }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "visibility")), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "name").makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("isUnderline", "scope", function (s) { return s[0] === 'c'; })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], "", new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'parameters', function (p) { return (p ? ('(' + p + ')') : '()'); })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('text', 'parameters').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], "", new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "type", function (t) { return (t ? ": " : ""); })), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], { isMultiline: false, editable: true }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "type").makeTwoWay()));
        myPalette.nodeTemplateMap.add("Classe", $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Node"], "Auto", new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("location", "loc").makeTwoWay(), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], "Rectangle", { width: 186, height: 80 }, { fill: '#fff59d' }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]('fill', 'color').makeTwoWay()), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Table", { minSize: new __WEBPACK_IMPORTED_MODULE_1_gojs__["Size"](186, NaN) }, 
        //linea che separa nome dai metodi
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 2, separatorStrokeWidth: 1.5, separatorStroke: "black" }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["RowColumnDefinition"], { row: 4, separatorStrokeWidth: 1.5, separatorStroke: "black" }), 
        //PreHeader
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            row: 0, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            font: "10pt sans-serif",
            isMultiline: false,
            editable: true,
            visible: false
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "tipo").makeTwoWay()), 
        //Nome della Classe
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], {
            row: 1, alignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            font: "bold 12pt sans-serif",
            isMultiline: false,
            editable: true,
            margin: 4
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("text", "name").makeTwoWay()), 
        //Scritta che viene mostrata quando il pannello è ridotto
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], "Attributi", { row: 2, font: "italic 10pt sans-serif", margin: 3 }), 
        //new go.Binding("visible", "visible", function(v) { return !v; }).ofObject("ATTRIBUTI")),
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Vertical", { name: "ATTRIBUTI" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("itemArray", "attributi"), {
            row: 2, margin: 3, stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Fill,
            defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            itemTemplate: attributiTemplate,
            visible: false
        }), 
        //$("PanelExpanderButton", "ATTRIBUTI",
        //  { row: 2, visible: false, column: 1, alignment: go.Spot.TopRight },
        //  new go.Binding("visible", "attributi", function(arr) { return arr.length > 0; })
        //),
        //Scritta che viene mostrata quando il pannello è ridotto
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["TextBlock"], "Metodi", { row: 4, font: "italic 10pt sans-serif", margin: 3 }), 
        //new go.Binding("visible", "visible", function(v) { return !v; }).ofObject("METHODS")),
        // methods
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Panel"], "Vertical", { name: "METHODS" }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("itemArray", "methods"), {
            row: 4, margin: 3, stretch: __WEBPACK_IMPORTED_MODULE_1_gojs__["GraphObject"].Fill,
            defaultAlignment: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Left,
            itemTemplate: methodTemplate,
            visible: false
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("itemArray", "methods").makeTwoWay(), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("itemArray", "methodsList").makeTwoWay()))));
        myPalette.model.nodeDataArray = [
            {
                category: "Classe",
                tipo: "default",
                notInterface: true,
                name: "Classe",
                attributi: [
                    { name: "attributo1", type: "String", visibility: "+", attributeID: 0 }
                ],
                methods: [
                    { name: "metodo1", parameters: "param1:tipo1", type: "void", visibility: "+", methodID: 0 }
                ],
                priority: 1,
                opacity: 1.0,
                color: '#fff59d',
                attributeCount: 1,
                methodCount: 1,
                attributeVisible: true,
                methodVisible: true
            },
            { category: 'Commento', description: 'Testo del commento', commentVisible: true }
        ];
        function findKey(e, obj) {
            var node = obj.part;
            var data = node.data;
            if (data) {
                return data.key;
            }
            ;
        }
        myPalette.linkTemplateMap.add("Generalizzazione", //mettere cardinalità
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], {
            locationSpot: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            selectionAdornmentTemplate: linkSelectionAdornmentTemplate
        }, {
            corner: 5,
            toShortLength: 4
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("location", "loc"), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("points"), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: "#ededed", strokeWidth: 3 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: "yellow", toArrow: "Standard", scale: 1.5, stroke: "#ededed", strokeWidth: 1 })));
        myPalette.linkTemplateMap.add("Aggregazione", //mettere cardinalità
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], {
            locationSpot: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            selectionAdornmentTemplate: linkSelectionAdornmentTemplate
        }, {
            corner: 5,
            toShortLength: 4
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("points"), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: "#ededed", strokeWidth: 3 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: "yellow", toArrow: "StretchedDiamond", scale: 1.5, stroke: "#ededed", strokeWidth: 1 })));
        myPalette.linkTemplateMap.add("Composizione", //mettere cardinalità
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], {
            locationSpot: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            selectionAdornmentTemplate: linkSelectionAdornmentTemplate
        }, {
            corner: 5,
            toShortLength: 4
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("points"), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: "#ededed", strokeWidth: 3 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: "#ededed", toArrow: "StretchedDiamond", scale: 1.5, stroke: "#ededed", strokeWidth: 1 })));
        myPalette.linkTemplateMap.add("Associazione", //mettere cardinalità
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], {
            locationSpot: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            selectionAdornmentTemplate: linkSelectionAdornmentTemplate
        }, {
            corner: 5,
            toShortLength: 2
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("points"), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { stroke: "#ededed", strokeWidth: 3 }), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], { fill: "#ededed", toArrow: "OpenTriangle", scale: 1.3, stroke: "#ededed", strokeWidth: 1.8 })));
        myPalette.linkTemplateMap.add("Dipendenza", //mettere cardinalità
        $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Link"], {
            locationSpot: __WEBPACK_IMPORTED_MODULE_1_gojs__["Spot"].Center,
            selectionAdornmentTemplate: linkSelectionAdornmentTemplate
        }, {
            corner: 5,
            toShortLength: 0
        }, new __WEBPACK_IMPORTED_MODULE_1_gojs__["Binding"]("points"), $(__WEBPACK_IMPORTED_MODULE_1_gojs__["Shape"], // the link path shape
        { stroke: "#ededed", strokeWidth: 3 })));
        myPalette.model.linkDataArray = [
            { points: new __WEBPACK_IMPORTED_MODULE_1_gojs__["List"](__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"]).addAll([new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](30, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 40), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](156, 40)]), category: "Dipendenza" },
            { points: new __WEBPACK_IMPORTED_MODULE_1_gojs__["List"](__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"]).addAll([new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](30, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 40), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](156, 40)]), category: "Aggregazione" },
            { points: new __WEBPACK_IMPORTED_MODULE_1_gojs__["List"](__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"]).addAll([new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](30, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 40), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](156, 40)]), category: "Composizione" },
            { points: new __WEBPACK_IMPORTED_MODULE_1_gojs__["List"](__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"]).addAll([new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](30, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 40), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](156, 40)]), category: "Associazione" },
            { points: new __WEBPACK_IMPORTED_MODULE_1_gojs__["List"](__WEBPACK_IMPORTED_MODULE_1_gojs__["Point"]).addAll([new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](30, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 0), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](93, 40), new __WEBPACK_IMPORTED_MODULE_1_gojs__["Point"](156, 40)]), category: "Generalizzazione" }
        ];
        var div = myPalette.div;
        div.style.height = '100%';
        div.style.width = '100%';
        myPalette.requestUpdate();
    };
    return ClassdiagrampaletteComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('myPaletteDiv'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object)
], ClassdiagrampaletteComponent.prototype, "element", void 0);
ClassdiagrampaletteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-classdiagrampalette',
        template: __webpack_require__(229),
        styles: [__webpack_require__(206)]
    })
], ClassdiagrampaletteComponent);

var _a;
//# sourceMappingURL=classdiagrampalette.component.js.map

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClasspageComponent; });
/*
 * File: classpage.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 01-06-2017
 * Author: Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Davide Albertini || 01-01-2017 || creazione collegamenti a tutti i componenti del diagramma delle classi
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClasspageComponent = (function () {
    function ClasspageComponent(project) {
        this.project = project;
    }
    ClasspageComponent.prototype.ngOnInit = function () {
    };
    return ClasspageComponent;
}());
ClasspageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-classpage',
        template: __webpack_require__(230),
        styles: [__webpack_require__(207)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */]) === "function" && _a || Object])
], ClasspageComponent);

var _a;
//# sourceMappingURL=classpage.component.js.map

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_template_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibreriafiltripaletteComponent; });
/*
 * File: libreriafiltripalette.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 29-05-2017
 * Author: Christian Cabrera, Davide ALbertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Davide Albertini || 31-05-2017 || collegamento della palette a classdiagrameditor.component
 * Christian Cabrera || 29-05-2017 || creazione metodi per recuperare i pattern e le classi dal Back_end
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LibreriafiltripaletteComponent = (function () {
    function LibreriafiltripaletteComponent(templateService, project) {
        this.templateService = templateService;
        this.project = project;
        this.toggleList1 = false;
        this.toggleList2 = false;
        this.isChecked1 = this.project.getCheckbox(1);
        this.isChecked2 = this.project.getCheckbox(2);
        this.isChecked3 = this.project.getCheckbox(3);
        this.isChecked4 = this.project.getCheckbox(4);
    }
    LibreriafiltripaletteComponent.prototype.retrieveClassesList = function () {
        var _this = this;
        // da invocare nel costruttore
        // pesca lista classi libreria da mongo e
        // la salva nell'array classes
        this.templateService.getClassesList().subscribe(function (classes) { return _this.classes = classes; });
    };
    LibreriafiltripaletteComponent.prototype.retrievePatternList = function () {
        var _this = this;
        // da invocare nel costruttore
        // pesca lista pattern da mongo e
        // la salva nell'array patterns
        this.templateService.getPatternsList().subscribe(function (data) { return _this.patterns = data; });
    };
    LibreriafiltripaletteComponent.prototype.toggle = function (index) {
        if (index === 1) {
            this.isChecked1 = !this.isChecked1;
            this.project.setCheckbox(index, this.isChecked1);
        }
        else if (index === 2) {
            this.isChecked2 = !this.isChecked2;
            this.project.setCheckbox(index, this.isChecked2);
        }
        else if (index === 3) {
            this.isChecked3 = !this.isChecked3;
            this.project.setCheckbox(index, this.isChecked3);
        }
        else if (index === 4) {
            this.isChecked4 = !this.isChecked4;
            this.project.setCheckbox(index, this.isChecked4);
        }
    };
    LibreriafiltripaletteComponent.prototype.open1 = function () {
        //console.log(this.classes.Id);
        this.toggleList1 = !this.toggleList1;
        this.toggleList2 = false;
    };
    LibreriafiltripaletteComponent.prototype.open2 = function () {
        this.toggleList1 = false;
        this.toggleList2 = !this.toggleList2;
    };
    LibreriafiltripaletteComponent.prototype.ngOnInit = function () {
        this.retrieveClassesList();
        this.retrievePatternList();
    };
    return LibreriafiltripaletteComponent;
}());
LibreriafiltripaletteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-libreriafiltripalette',
        template: __webpack_require__(231),
        styles: [__webpack_require__(208)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_template_service__["a" /* TemplateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_template_service__["a" /* TemplateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */]) === "function" && _b || Object])
], LibreriafiltripaletteComponent);

var _a, _b;
//# sourceMappingURL=libreriafiltripalette.component.js.map

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_brace_theme_sqlserver__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_brace_theme_sqlserver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_brace_theme_sqlserver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_brace_mode_java__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_brace_mode_java___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_brace_mode_java__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeditorComponent; });
/*
 * File: codeditor.component.ts
 * Version: 0.9
 * Type: typescript
 * Date: 19-06-2017
 * Author: Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Saverio Follador || 19-06-2017 || integrazione con il componente editorpage
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CodeditorComponent = (function () {
    function CodeditorComponent(project) {
        this.project = project;
    }
    CodeditorComponent.prototype.ngAfterViewInit = function () {
    };
    return CodeditorComponent;
}());
CodeditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-codeditor',
        template: __webpack_require__(232),
        styles: [__webpack_require__(209)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */]) === "function" && _a || Object])
], CodeditorComponent);

var _a;
//# sourceMappingURL=codeditor.component.js.map

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_code_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_file_saver__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodegeneratepaletteComponent; });
/*
 * File: codegeneratepalette.component.ts
 * Version: 0.9
 * Type: typescript
 * Date: 18-06-2017
 * Author: Carlo Sindico, Saverio Follador
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Saverio Follador || 18-06-2017 || creazione metodo generateCode() per esportare il codice generato
 * Carlo Sindico || 18-06-2017 || creazione metodo generateCode() per generare il codice e visualizzarlo nell editor
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CodegeneratepaletteComponent = (function () {
    function CodegeneratepaletteComponent(project, codeService) {
        this.project = project;
        this.codeService = codeService;
    }
    CodegeneratepaletteComponent.prototype.generateCode = function () {
        var _this = this;
        this.codeService.getGeneratedCode(this.project.getFullDiagram()).subscribe(function (vez) { return _this.project.setCode(JSON.parse(vez)); });
    };
    CodegeneratepaletteComponent.prototype.exportCode = function () {
        for (var i = 0; i < this.project.getCode().length; ++i) {
            var blob = new Blob([this.project.getCode()[i].body], { type: 'text/plain' });
            __WEBPACK_IMPORTED_MODULE_3_file_saver__["saveAs"](blob, this.project.getCode()[i].name + '.java');
        }
    };
    CodegeneratepaletteComponent.prototype.ngOnInit = function () {
    };
    return CodegeneratepaletteComponent;
}());
CodegeneratepaletteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-codegeneratepalette',
        template: __webpack_require__(233),
        styles: [__webpack_require__(210)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_code_service__["a" /* CodeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_code_service__["a" /* CodeService */]) === "function" && _b || Object])
], CodegeneratepaletteComponent);

var _a, _b;
//# sourceMappingURL=codegeneratepalette.component.js.map

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodelistafilepaletteComponent; });
/*
 * File: codelistafilepalette.component.ts
 * Version: 0.9
 * Type: typescript
 * Date: 17-06-2017
 * Author: Alberto Rossetti
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Alberto Rossetti || 17-06-2017 || creazione metodo generateCode() utilizzato alla pressione del bottone generacodice
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CodelistafilepaletteComponent = (function () {
    function CodelistafilepaletteComponent(project) {
        this.project = project;
    }
    CodelistafilepaletteComponent.prototype.prova = function (x) {
        console.log(x);
    };
    CodelistafilepaletteComponent.prototype.setSelectedFile = function (x) {
        this.project.setSelectedCode(x);
        this.project.setSelectedFileName(x);
    };
    CodelistafilepaletteComponent.prototype.ngOnInit = function () {
    };
    return CodelistafilepaletteComponent;
}());
CodelistafilepaletteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-codelistafilepalette',
        template: __webpack_require__(234),
        styles: [__webpack_require__(211)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */]) === "function" && _a || Object])
], CodelistafilepaletteComponent);

var _a;
//# sourceMappingURL=codelistafilepalette.component.js.map

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodepageComponent; });
/*
 * File: codepage.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 16-06-2017
 * Author: Alberto Rossetti
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Alberto Rossetti || 16-06-2017 || integrazione del componente con editorpage
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CodepageComponent = (function () {
    function CodepageComponent(project) {
        this.project = project;
    }
    CodepageComponent.prototype.ngOnInit = function () {
        this.project.setSelectedMethod(null, null);
        this.project.setSelectedCode(null);
        this.project.setSelectedFileName(null);
    };
    return CodepageComponent;
}());
CodepageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-codepage',
        template: __webpack_require__(235),
        styles: [__webpack_require__(212)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__project__["a" /* Project */]) === "function" && _a || Object])
], CodepageComponent);

var _a;
//# sourceMappingURL=codepage.component.js.map

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_file_saver__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorpageComponent; });
/*
 * File: editorpage.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 15-06-2017
 * Author: Carlo Sindico
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 * Registro modifiche:
 * Carlo Sindico || 15-06-2017 ||creazione metodo saveproject() per salvare il progetto in un JSON
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditorpageComponent = (function () {
    function EditorpageComponent(project) {
        this.project = project;
    }
    EditorpageComponent.prototype.saveProject = function () {
        var blob = new Blob([JSON.stringify(this.project.save())], { type: 'text/plain' });
        __WEBPACK_IMPORTED_MODULE_1_file_saver__["saveAs"](blob, '' + this.project.getName() + '.json');
    };
    EditorpageComponent.prototype.ngOnInit = function () {
    };
    return EditorpageComponent;
}());
EditorpageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-editorpage',
        template: __webpack_require__(236),
        styles: [__webpack_require__(213)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */]) === "function" && _a || Object])
], EditorpageComponent);

var _a;
//# sourceMappingURL=editorpage.component.js.map

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialognewproject_dialognewproject_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialoguploadproject_dialoguploadproject_component__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstpageComponent; });
/*
 * File: firstpage.component.ts
 * Version: 1.0
 * Type: typescript
 * Date: 25-05-2017
 * Author: Saverio Follador, Davide Albertini
 * E-mail: digitalcookies.group@gmail.com
 *
 * License: GNU General Public License v3.0
 *
 *
 * Registro modifiche:
 * Davide Albertini || 25-05-2017 || creazione metodo opendialoguploadproject() per aprire la finestra carica progetto
 * Saverio Follador || 25-05-2017 || creazione metodo opendialognewproject() per aprire la finestra nuovo progetto
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FirstpageComponent = (function () {
    function FirstpageComponent(project, dialog) {
        this.project = project;
        this.dialog = dialog;
        this.titoloprogetto = "SWEDesigner";
        this.titoloslogan = "Progetta diagrammi UML. Genera codice. Circa.";
        this.project.reset();
    }
    FirstpageComponent.prototype.opendialognewproject = function () {
        var _this = this;
        this.dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_1__dialognewproject_dialognewproject_component__["a" /* DialognewprojectComponent */]);
        this.dialogRef.afterClosed().subscribe(function (result) {
            _this.dialogRef = null;
        });
    };
    FirstpageComponent.prototype.opendialoguploadproject = function () {
        var _this = this;
        this.dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__dialoguploadproject_dialoguploadproject_component__["a" /* DialoguploadprojectComponent */]);
        this.dialogRef.afterClosed().subscribe(function (result) {
            _this.dialogRef = null;
        });
    };
    return FirstpageComponent;
}());
FirstpageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-firstpage',
        template: __webpack_require__(239),
        styles: [__webpack_require__(216)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__project__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__project__["a" /* Project */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MdDialog */]) === "function" && _b || Object])
], FirstpageComponent);

var _a, _b;
//# sourceMappingURL=firstpage.component.js.map

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Method; });
/*
 * File: method.service.ts
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
 * Saverio Follador || 16-06-2017 || creazione metodi necessari per selezionare il metodo di cui creare
 * il corpo nel diagramma delle attività
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Method = (function () {
    function Method(c, n, d) {
        this.class = c;
        this.name = n;
        this.diagram = d;
    }
    Method.prototype.getClass = function () {
        return this.class;
    };
    Method.prototype.getName = function () {
        return this.name;
    };
    Method.prototype.getDiagram = function () {
        return this.diagram;
    };
    Method.prototype.setDiagram = function (x) {
        this.diagram = x;
    };
    return Method;
}());
Method = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [Object, Object, Object])
], Method);

//# sourceMappingURL=method.js.map

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: activitydiagrameditor.component\n * Version: 1.0\n * Type: css\n * Date: 23-05-2017\n * Author: Alberto Giudice, Carlo Sindico\n * Email: digitalcookies.group@gmail.com\n *\n *\n * License: GNU General Public License v3.0\n *\n *\n * Registro modifiche:\n * Carlo Sindico || 25-05-2017 || correzioni delle proprietà di .diagramBlock\n * Alberto Giudice || 23-05-2017 || inizializzazione css per l'editor del diagramma delle attività\n *\n */\n\n\n.diagramBlock {\n\tfloat: left;\n\tdisplay:inline-block;\n\twidth:60%;\n\theight: 100%;\n\tbackground-color: #ededed;\n\tcolor: #424242;\n  \tfont-size: 1.3em;\n  \tfont-family: 'Roboto Light', sans-serif;\n  \ttext-align: center;\n  }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: activitydiagrampalette.component\n * Version: 1.0\n * Type: css\n * Date: 30-05-2017\n * Author: Alberto Giudice, Carlo Sindico\n * Email: digitalcookies.group@gmail.com\n *\n *\n * License: GNU General Public License v3.0\n *\n *\n * Registro modifiche:\n * Carlo Sindico || 31-05-2017 || correzioni delle proprietà di .paletteDX\n * Alberto Giudice || 30-05-2017 || inizializzazione css per la palette di destra del diagramma delle attività\n */\n\n\n\n.paletteDX {\n\tfloat:right;\n\tdisplay:inline-block;\n\twidth:20%;\n\theight: 100%;\n\tbackground-color: #2e323e;\n\tcolor: #ededed;\n  \tfont-size: 1.3em;\n  \tpadding: 0.5em;\n  \tfont-family: 'Roboto Light', sans-serif;\n  \ttext-align: center;\n  padding-bottom: 2.5em;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n* File: acitivitypage.component\n* Version: 1.0\n* Type: html\n* Date: 06-06-2017\n* Author: Alberto giudice, Carlo Sindico\n* E-mail: digital.cookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n*\n* Registro modifiche:\n* Carlo Sindico || 06-06-2017 || correzione regole css di position\n* Alberto Giudice || 06-06-2017 || creazione css per il componente activitypage\n*\n*/\n\n\n.projectnameBar {\n\theight: 1.8em;\n\tline-height: 1.8em;\n\tfont-size: 1.4em;\n\tbackground-color: #1976d3;\n\tcolor: #ededed;\n\ttext-align: center;\n\twidth: 100%;\n\tclear: left;\n  \tfont-family: 'Roboto Light', sans-serif;\n}\n\n.container {\n\tposition: absolute;\n\theight: auto;\n\tfont-size: 1.3em;\n\ttop: 4.6em;\n\tbottom: 2em;\n\twidth: 100%;\n\tpadding: 0;\n\tmargin-right: 0;\n\tmargin-left: 0;\n\toverflow: hidden;\n}\n\n#switch-button {\n  background-color: #f6511d;\n  font-size: 1.4em;\n  color: #ededed;\n  text-align: center;\n  width: 100%;\n  font-family: 'Roboto Light', sans-serif;\n  height: 1.8em;\n  padding-top: 0.5em;\n  padding-bottom: 0.5em;\n}\n#switch-button:hover {\n  background-color: #e64a19;\n}\n\n#switch-button span {\n  position: relative;\n  bottom: 0.25em;\n  left: 0.1em;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: classimetodipalette.component\n * Version: 1.0\n * Type: css\n * Date: 01-06-2017\n * Author: Alberto Giudice, Carlo Sindico\n * Email: digitalcookies.group@gmail.com\n *\n *\n * License: GNU General Public License v3.0\n *\n *\n * Registro modifiche:\n * Carlo Sindico || 02-06-2017 || correzioni delle proprietà di .paletteSX\n * Alberto Giudice || 01-06-2017 || inizializzazione css per la palette di sinistra del diagramma delle attività\n */\n\n\n\n\n.paletteSX {\n  float:left;\n  display:inline-block;\n  width:20%;\n  height: 100%;\n  background-color: #2e323e;\n  padding: 0.5em;\n  overflow-y: scroll;\n}\n\n.paletteSX h2 {\n  font-size: 1.7em;\n  font-family: 'Roboto Regular', sans-serif;\n  color: #ededed;\n  padding-left: 0.5em;\n}\n\n.myActivityItem h3 {\n  font-size: 1.3em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #ededed;\n  padding-left: 0.5em;\n  padding-top: 0.5em;\n  margin-bottom: 0.2em;\n  overflow: hidden;\n  clear: both;\n}\n\n.delete-method {\n  width: 0.65em;\n  padding-bottom: 0.3em;\n  float: right;\n  opacity: 0.7;\n}\n\n.delete-method:hover {\n  opacity:1.0;\n}\n\n.myActivityItem {\n  padding-left: 0.85em;\n}\n\n\n.myActivityItem ul {\n  margin-left: 1.1em;\n  padding-left: 1em;\n  padding-right: 0.3em;\n  list-style-type: square;\n  font-size: 1em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #bdbdbd;\n  line-height: 1.3em;\n}\n\n.myActivityItem li {\n  width: 100%;\n  float: left;\n}\n\n.methodList:hover {\n  color: #fdd835;\n}\n\n.methodListActive {\n  color: #fdd835;\n  font-weight: bold;\n}\n\nspan .methodList{\n  width:auto;\n}\n\n/*\n.myActivityItem li:hover {\n  color: #ededed;\n}*/\n\n\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n* File: activitydiagrampalette.component\n* Version: 0.9\n* Type: html\n* Date: 01-06-2017\n* Author: Carlo Sindico\n* E-mail: digitalcookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n*\n* Registro modifiche:\n* Carlo Sindico || 01-06-2017 || inizializzazione css per la palette contente la libreria dei metodi prelevati dal Back-end\n*\n*/\n\n.paletteDX {\n  float:right;\n  display:inline-block;\n  width:20%;\n  height: 100%;\n  background-color: #2e323e;\n  padding: 0.5em;\n  overflow-y: scroll;\n  padding-bottom: 3em;\n}\n\n.myActivityLibraryItem h2 {\n  text-align: right;\n  font-size: 1.3em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #ededed;\n  padding-right: 0.5em;\n  overflow: hidden;\n}\n\n.methodDescription p {\n  text-align: right;\n  padding-right: 1em;\n  font-size: 1em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #bdbdbd;\n  line-height: 1em;\n}\n\n.listImage {\n  width: 0.85em;\n  margin-left: 0.1em;\n  margin-right: 0.1em;\n  padding-bottom: 0.2em;\n}\n\n.insertMethod {\n  float: left;\n}\n\n.insertMethod img {\n  width: 1.1em;\n  opacity: 0.7;\n}\n\n.insertMethod img:hover {\n  opacity: 1.0;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: classdiagrameditor.component.css\n * Version: 1.0\n * Type: css\n * Date: 30-05-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Giudice || 30-05-2017 || creazione css per l'editor del diagramma delle classi\n *\n */\n\n.diagramBlock {\n\tfloat: left;\n\tdisplay:inline-block;\n\twidth:60%;\n\theight: 100%;\n\tbackground-color: #ededed;\n\tcolor: #424242;\n  \tfont-size: 1.3em;\n  \tfont-family: 'Roboto Light', sans-serif;\n  \ttext-align: center;\n  }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: classdiagrampalette.component.css\n * Version: 1.0\n * Type: css\n * Date: 31-05-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Giudice || 31-05-2017 || creazione css per la palette contente i blocchi del diagramma delle classi\n *\n */\n\n\n.paletteDX {\n\tfloat:right;\n\tdisplay:inline-block;\n\twidth:20%;\n\theight: 100%;\n\tbackground-color: #2e323e;\n\tcolor: #ededed;\n  \tfont-size: 1.3em;\n  \tpadding: 0.5em;\n  \tfont-family: 'Roboto Light', sans-serif;\n  \ttext-align: center;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: classpage.component.css\n * Version: 1.0\n * Type: css\n * Date: 01-06-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Giudice || 01-06-2017 || creazione css per la pagina principale contenete tutti i componenti del diagramma delle classi\n *\n */\n\n\n.projectnameBar {\n\theight: 1.8em;\n\tline-height: 1.8em;\n\tfont-size: 1.4em;\n\tbackground-color: #1976d3;\n\tcolor: #ededed;\n\ttext-align: center;\n\twidth: 100%;\n\tclear: left;\n  \tfont-family: 'Roboto Light', sans-serif;\n}\n\n.container {\n\tposition: absolute;\n\theight: auto;\n\tfont-size: 1.3em;\n\ttop: 4.6em;\n\tbottom: 2em;\n\twidth: 100%;\n\tpadding: 0;\n\tmargin-right: 0;\n\tmargin-left: 0;\n\toverflow: hidden;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: libreriafiltripalette.component.css\n * Version: 1.0\n * Type: css\n * Date: 31-05-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Giudice || 31-05-2017 || creazione css per la palette per recuperare i pattern e le classi dal Back-end\n *\n */\n\n.paletteSX {\n\tfloat:left;\n\tdisplay:inline-block;\n\twidth:20%;\n\theight: 100%;\n\tbackground-color: #2e323e;\n  padding: 0.5em;\n  overflow-y: scroll;\n}\n\n.paletteSX h2 {\n  font-size: 1.7em;\n  font-family: 'Roboto Regular', sans-serif;\n  color: #ededed;\n  padding-left: 0.5em;\n}\n\n#library-items h3{\n  font-size: 1.3em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #ededed;\n}\n\n.listImage {\n  width: 0.85em;\n  margin-left: 1em;\n  margin-right: 0.1em;\n  padding-bottom: 0.2em;\n}\n\n#library-items ul {\n  margin-left: 0.85em;\n  list-style-type: square;\n  font-size: 1em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #bdbdbd;\n  line-height: 1em;\n}\n\n#library-items li span {\n  display: none;\n\n  transition-property: visibility;\n  transition-duration: 3s;\n  transition-timing-function: step-end;\n}\n\n#library-items li:hover  {\n  color: #ededed;\n}\n\n#library-items li:hover span{\n  display: block;\n  position: fixed;\n  left: 23em;\n  top: 12.3em;\n  z-index: 99;\n\n  -webkit-animation: cssAnimation 0s ease-in 3s forwards;\n\n          animation: cssAnimation 0s ease-in 3s forwards;\n}\n@-webkit-keyframes cssAnimation {\n  to{\n    visibility: hidden;\n  }\n}\n@keyframes cssAnimation {\n  to{\n    visibility: hidden;\n  }\n}\n\n\n.mat-checkbox {\n  padding-left: 1em;\n  font-size: 1.2em;\n  font-family: 'Roboto Thin', sans-serif;\n  color: #ededed;\n  line-height: 1.5em;\n}\n\n\n\n/*\n\n\n.mat-list-item {\n  font-size: 1.2em;\n  font-family: 'Roboto Thin', sans-serif;\n  color: #ededed;\n  height: 1em;\n}\n\n.mat-list-item-content {\n  color: black;\n  height: 1em;\n}\n\n.md-list-item li{\n  font-size: 0.1em;\n}\n\n.mat-checkbox-checkmark-path{stroke:#ededed!important}\n\n.mat-checkbox-frame{border-color:white}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: codeditor.component.css\n * Version: 0.9\n * Type: css\n * Date: 19-06-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Giudice || 19-06-2017 ||creazione css per il componente codeditor\n *\n */\n\n\n.diagramBlock {\n\tfloat: left;\n\tdisplay:inline-block;\n\twidth:60%;\n\theight: 100%;\n\tbackground-color: #ededed;\n\tcolor: #424242;\n  \tfont-size: 1.3em;\n  \tfont-family: 'Roboto Light', sans-serif;\n  \ttext-align: center;\n  \toverflow: auto;\n  }\n\n  #codeEditor {\n  \theight: 100%;\n  \twidth:100%;\n  \toverflow: auto;\n    font-size: 0.7em;\n  }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: codegeneratepalette.component.css\n * Version: 0.9\n * Type: css\n * Date: 18-06-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Giudice || 18-06-2017 ||creazione css per il componente codegeneratepalette\n *\n */\n\n\n\n.paletteDX {\n  float:right;\n  display:inline-block;\n  width:20%;\n  height: 100%;\n  background-color: #2e323e;\n  padding: 0.5em;\n  overflow-y: scroll;\n}\n\n#code h2 {\n  text-align: right;\n  font-size: 1.7em;\n  font-family: 'Roboto Regular', sans-serif;\n  color: #ededed;\n  padding-right: 0.5em;\n  overflow: hidden;\n}\n\n.mat-radio-button {\n  padding-right: 1em;\n  width: 100%;\n  text-align: right;\n  font-size: 1.3em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #ededed;\n  margin-top: 0.5em;\n  margin-bottom: 0.5em;\n}\n\n.paletteDX button {\n  width: 80%;\n  margin: 0 10%;\n  font-family: 'Roboto Light', sans-serif;\n  font-size: 1.4em;\n  padding: 0.2em;\n  color: #ededed;\n  margin-top: 0.7em;\n}\n\n#code {\n  height: 83%;\n}\n\n#buttonGenerate {background-color:#f4511e;}\n#buttonGenerate:hover {background-color:#e64a19;}\n\n#buttonExport {background-color:#1976d2;}\n#buttonExport:hover {background-color:#1565c0;}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: codelistafilepalette.component.css\n * Version: 0.9\n * Type: css\n * Date: 18-06-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Giudice || 18-06-2017 ||creazione css per il componente codelistafilepalette\n *\n */\n\n\n\n.paletteSX {\n  float:left;\n  display:inline-block;\n  width:20%;\n  height: 100%;\n  background-color: #2e323e;\n  padding: 0.5em;\n  overflow-y: scroll;\n}\n\n.paletteSX h2 {\n  font-size: 1.7em;\n  font-family: 'Roboto Regular', sans-serif;\n  color: #ededed;\n  padding-left: 0.5em;\n}\n\n#fileList ul {\n  margin-left: 0.2em;\n  padding-right: 0.3em;\n  list-style-type: square;\n  font-size: 1.1em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #bdbdbd;\n  line-height: 1.5em;\n}\n\n#fileList li {\n  width: 100%;\n  float: left;\n}\n\n#fileList li:hover {\n  color: #fdd835;\n}\n\n.fileListActive {\n  color: #fdd835;\n  font-weight: bold;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: codepage.component.css\n * Version: 1.0\n * Type: css\n * Date: 16-06-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Giudice || 16-06-2017 ||creazione css per il componente codepage\n *\n */\n\n\n\n.projectnameBar {\n\theight: 1.8em;\n\tline-height: 1.8em;\n\tfont-size: 1.4em;\n\tbackground-color: #1976d3;\n\tcolor: #ededed;\n\ttext-align: center;\n\twidth: 100%;\n\tclear: left;\n  \tfont-family: 'Roboto Light', sans-serif;\n}\n\n.container {\n\tposition: absolute;\n\theight: auto;\n\tfont-size: 1.3em;\n\ttop: 4.6em;\n\tbottom: 2em;\n\twidth: 100%;\n\tpadding: 0;\n\tmargin-right: 0;\n\tmargin-left: 0;\n\toverflow:hidden;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: editorpage.component.css\n * Version: 1.0\n * Type: css\n * Date: 16-06-2017\n * Author: Carlo Sindico\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Carlo Sindico || 16-06-2017 ||creazione css per il componente editorpage\n *\n */\n\n\n\n#logoContainer{\n  \twidth: 20%;\n\tfloat:left;\n\tpadding-left: 4em;\n\tpadding-top: 0.3em;\n}\n\n#headerLogo {\n\twidth: 11em;\n}\n\n#tabs{\n\theight: 3.5em;\n\twidth: 60%;\n\ttext-align:center;\n\tfloat: left;\n}\n\n#savehomeContainer {\n\twidth: 20%;\n\tfloat:right;\n\ttext-align: center;\n\tpadding-right: 4em;\n\tpadding-top: 0.6em;\n}\n\n#savehomeContainer img {\n\tpadding-left: 2em;\n\tpadding-right: 2em;\n\twidth: 6.3em;\n}\n\n.tabLink {\n\tfont-size: 1.5em;\n\tcolor: #424242;\n\tfont-family: 'Roboto Regular', sans-serif;\n\ttext-transform: uppercase;\n\topacity:0.6;\n}\n\n.tabLink:hover {\n\ttext-decoration: none;\n\tfont-weight: bold;\n\topacity:1;\n}\n\n.headerIcon {\n\twidth: 50%;\n\tfloat:left;\n}\n\n.headerIcon img {\n\topacity: 0.6;\n}\n\n.headerIcon img:hover {\n\topacity: 1;\n}\n\na:-webkit-any-link {\n\ttext-decoration: none;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: dialognewproject.component.css\n * Version: 1.0\n * Type: css\n * Date: 23-05-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n *\n * Registro modifiche:\n * Alberto Giudice || 23-05-2017 || creazione css per il componente dialognewproject\n *\n */\n\n\n\n\n.popup {\n\twidth:30em;\n}\n\n.popup h2{\n\tfont-size: 2em;\n\tfont-family: 'Roboto Light 100', sans-serif;\n\tmargin-top: 0.5em;\n\tmargin-bottom: 1em;\n\tcolor: #424242;\n}\n\n.form-control {\n\twidth: 100%;\n\tfont-size: 1.3em;\n\tfont-family: 'Roboto Light', sans-serif;\n\tcolor: #424242;\n}\n\n.btn-success {\n\tfloat:right;\n\tfont-size: 1.3em;\n\tfont-family: 'Roboto Light', sans-serif;\n    padding: 0.3em;\n    width: 35%;\n    margin-top: 1em;\n    color: #ededed;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: dialoguploadproject.component.css\n * Version: 1.0\n * Type: css\n * Date: 24-05-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n *\n * Registro modifiche:\n * Alberto Giudice || 24-05-2017 || creazione css per il componente dialoguploadproject\n *\n */\n\n\n.popup {\n\twidth:30em;\n}\n\n.popup h2{\n\tfont-size: 2em;\n\tfont-family: 'Roboto Light 100', sans-serif;\n\tmargin-top: 0.5em;\n\tmargin-bottom: 1em;\n\tcolor: #424242;\n}\n\n.popup p{\n  font-size: 1.3em;\n  font-style: italic;\n  font-family: 'Roboto Light', sans-serif;\n  color: #424242;\n}\n\n#fileInput {\n  width: 100%;\n  font-size: 1.3em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #424242;\n}\n\ninput[type=\"file\"] {\n  font-size: 1.9em;\n  font-family: 'Roboto Light', sans-serif;\n  color: #424242;\n  padding-right: 1em;\n}\n\n.btn-success {\n\tfloat:right;\n\tfont-size: 1.3em;\n\tfont-family: 'Roboto Light', sans-serif;\n    padding: 0.3em;\n    width: 35%;\n    margin-top: 1em;\n    color: #ededed;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * File: firstpage.component.css\n * Version: 1.0\n * Type: css\n * Date: 24-05-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n *\n * Registro modifiche:\n * Alberto Giudice || 24-05-2017 || creazione css per il componente firstpage\n *\n */\n\n\n\n\n.firstpage {\n\theight:100%;\n\tdisplay:table;\n\tmargin-left:auto;\n\tmargin-right:auto;\n\n}\n\n.slogan {\n\tdisplay:table-cell;\n\tvertical-align:middle;\n\ttext-align: center;\n}\n\n.slogan h1 {\n\tfont-size: 2.5em;\n\tfont-family: 'Roboto Thin', sans-serif;\n\tcolor: #424242;\n\tmargin-top: 1em;\n\tmargin-bottom: 1em;\n}\n\n.buttons button {\n\twidth: 40%;\n\tfont-family: 'Roboto Light', sans-serif;\n    font-size: 1.7em;\n    margin-right: 0.5em;\n    margin-left: 0.5em;\n    padding: 0.3em;\n    color: #ededed;\n}\n\n#button1 {background-color:#f4511e;}\n#button1:hover {background-color:#e64a19;}\n\n#button2 {background-color:#1976d2;}\n#button2:hover {background-color:#1565c0;}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: app.component.html\n* Version: 1.0\n* Type: html\n* Date: 29-05-2017\n* Author: Carlo Sindico\n* E-mail: digitalcookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n* Registro modifiche:\n* Carlo Sindico || 23-05-2017 || creazione routing per navigare all'interno della single page app\n*\n-->\n\n\n<router-outlet></router-outlet>\n\n\n\n\n\n\n"

/***/ }),
/* 223 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: activitydiagrameditor.component\n* Version: 1.0\n* Type: html\n* Date: 29-05-2017\n* Author: Carlo Sindico\n* E-mail: digitalcookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n*\n* Registro modifiche:\n* Carlo Sindico || 29-05-2017 || creazione div html per contenere l'editor del digramma delle attività\n*\n-->\n\n\n<span class=\"diagramBlock\">\n      <div #activityDiagramDiv></div>\n</span>\n"

/***/ }),
/* 224 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: activitydiagrampalette.component\n* Version: 1.0\n* Type: html\n* Date: 29-05-2017\n* Author: Carlo Sindico\n* E-mail: digitalcookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n*\n* Registro modifiche:\n* Carlo Sindico || 29-05-2017 || creazione div html per contenere la palette di destra del diagramma delle attività\n*\n*/\n-->\n\n\n    <span class=\"paletteDX\">\n      <div id=\"activityPaletteDiv\"></div>\n    </span>\n\n"

/***/ }),
/* 225 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: acitivitypage.component\n* Version: 1.0\n* Type: html\n* Date: 06-06-2017\n* Author: Alessia Bragagnolo\n* E-mail: digital.cookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n*\n* Registro modifiche:\n* Alessia Bragagnolo || 06-06-2017 || creazione collegamenti ai componenti classimetodipalette, activitydiagrameditor, activitydiagrampalette e libreriapalette\n*\n*/\n-->\n\n<div class=\"projectnameBar\">{{this.project.getName()}}</div>\n<div class=\"container\">\n<app-classimetodipalette></app-classimetodipalette>\n<app-activitydiagrameditor></app-activitydiagrameditor>\n  <div id=\"switch-button\" (click)=\"open()\">\n    <span *ngIf=\"!openpalette\" >PASSA A <strong>LIBRERIA</strong></span>\n    <span *ngIf=\"openpalette\">PASSA A <strong>PALETTE</strong></span>\n  </div>\n  <span id=\"containerActivityDX\">\n  <app-activitydiagrampalette *ngIf=\"!openpalette\"></app-activitydiagrampalette>\n  <app-libreriapalette *ngIf=\"openpalette\"></app-libreriapalette>\n  </span>\n</div>\n"

/***/ }),
/* 226 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: classimetodipalette.component\n* Version: 1.0\n* Type: html\n* Date: 30-05-2017\n* Author: Carlo Sindico\n* E-mail: digitalcookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n*\n* Registro modifiche:\n* Carlo Sindico || 30-05-2017 || creazione div html per contenere la palette di sinistra del diagramma delle attività\n*\n*/\n-->\n\n<span class=\"paletteSX\">\n  <h2>Lista Metodi</h2>\n  <div class=\"myActivityItem\" *ngFor=\"let class of this.project.getClassesNames()\">\n         <h3>\n           {{class}}\n         </h3>\n           <ul>\n             <li class=\"method\" *ngFor=\"let method of this.project.getClassMethods(class)\" (click)=\"this.project.setSelectedMethod(class, method)\">\n               <span class=\"methodListActive\" *ngIf=\"this.project.getSelectedMethod()[0] === class && this.project.getSelectedMethod()[1] === method\">{{method}}</span>\n               <span class=\"methodList\" *ngIf=\"!(this.project.getSelectedMethod()[0] === class && this.project.getSelectedMethod()[1] === method)\">{{method}}</span>\n               <span *ngFor=\"let segnature of this.project.getClassMethodsCarlo(class, method)\"  >{{segnature}}</span>\n               <span *ngIf=\"(this.project.getSelectedMethod()[0] === class && this.project.getSelectedMethod()[1] === method)\" (click)=\"this.project.clearSelectedMethodDiagram()\" ><img  src=\"../../../../assets/x.svg\" class=\"delete-method\"></span>\n             </li>\n           </ul>\n  </div>\n</span>\n\n\n\n\n"

/***/ }),
/* 227 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: activitydiagrampalette.component\n* Version: 0.9\n* Type: html\n* Date: 02-06-2017\n* Author: Carlo Sindico\n* E-mail: digitalcookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n*\n* Registro modifiche:\n* Carlo Sindico || 02-06-2017 || creazione div html per contenere la palette di destra della libreria dei metodi prelevati dal Back-end\n*\n-->\n\n\n<span class=\"paletteDX\" xmlns=\"http://www.w3.org/1999/html\">\n    <div class=\"myActivityLibraryItem\" *ngFor=\"let activity of this.activityList; let i=index\" [attr.data-index]=\"i\">\n      <span class=\"insertMethod\" [attr.listened]=\"false\" id={{activity.Id}}><img src=\"../../../../assets/insert.svg\" class=\"listImage\"></span>\n      <h2 (click)=\"open(i)\">\n           {{activity.Titolo}}\n            <span class=\"plus\" *ngIf=\"!toggleList[i]\"><img src=\"../../../../assets/piu.svg\" class=\"listImage\"></span>\n        <span class=\"minus\" *ngIf=\"toggleList[i]\"><img src=\"../../../../assets/meno.svg\"  class=\"listImage\"></span>\n         </h2>\n               <span class = \"methodDescription\" *ngIf=\"toggleList[i]\">\n                  <p>SEGNATURA:\n                    {{activity.Segnatura}}</p>\n                  <p>PRECONDIZIONE:\n                    {{activity.Pre}}</p>\n                  <p>POSTCONDIZIONE:\n                 {{activity.Post}}\n                  </p>\n               </span>\n\n    </div>\n  </span>\n"

/***/ }),
/* 228 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: classdiagrameditor.component.html\n* Version: 1.0\n* Type: html\n* Date: 29-05-2017\n* Author: Alberto Giudice\n* E-mail: digitalcookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n* Registro modifiche:\n* Alberto Giudice || 29-05-2017 || creazione div html contenente l'editor del diagramma delle classi\n*\n*/\n-->\n<span class=\"diagramBlock\">\n      <div #myDiagramDiv></div>\n</span>\n\n"

/***/ }),
/* 229 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: classdiagrampalette.component.html\n* Version: 1.0\n* Type: html\n* Date: 30-05-2017\n* Author: Alberto Giudice\n* E-mail: digitalcookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n* Registro modifiche:\n* Alberto Giudice || 30-05-2017 || creazione div html contenente la palette dei blocchi del diagramma delle classi\n*\n*/\n-->\n    <span class=\"paletteDX\">\n      <div id=\"myPaletteDiv\"></div>\n    </span>\n"

/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: classpage.component\n* Version: 1.0\n* Type: html\n* Date: 01-06-2017\n* Author: Alberto Giudice\n* E-mail: digital.cookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n*\n* Registro modifiche:\n* Alberto Giudice || 01-06-2017 || creazione div html contenente tutti i componenti del diagramma delle classi\n*\n*/\n-->\n\n<div class=\"projectnameBar\">{{this.project.getName()}}</div>\n<div class=\"container\">\n<app-libreriafiltripalette></app-libreriafiltripalette>\n<app-classdiagrameditor></app-classdiagrameditor>\n<app-classdiagrampalette></app-classdiagrampalette>\n</div>\n"

/***/ }),
/* 231 */
/***/ (function(module, exports) {

module.exports = "<!--\n* File: libreriafiltripalette.component.html\n* Version: 1.0\n* Type: html\n* Date: 30-05-2017\n* Author: Alberto Giudice\n* E-mail: digitalcookies.group@gmail.com\n*\n* License: GNU General Public License v3.0\n*\n* Registro modifiche:\n* Alberto Giudice || 30-05-2017 || creazione div html contenente la palette per recuperare i pattern e le classi dal Back-end\n*\n*/\n-->\n\n<span class=\"paletteSX\">\n  <div id=\"library\">\n    <h2>Libreria</h2>\n    <div id=\"library-items\">\n      <h3 (click)=\"open1()\">\n        <span class=\"plus\" *ngIf=\"!toggleList1\"><img src=\"../../../../assets/piu.svg\" class=\"listImage\"></span>\n        <span class=\"minus\" *ngIf=\"toggleList1\"><img src=\"../../../../assets/meno.svg\" class=\"listImage\"></span>\n        Classi\n      </h3>\n      <div id=\"lista1\" *ngIf=\"toggleList1\">\n        <ul *ngFor=\"let class of classes\">\n          <li id={{class.Id}} [attr.listened]=\"false\" class=\"libr\">{{class.Titolo}}</li>\n        </ul>\n      </div>\n      <h3 (click)=\"open2()\">\n        <span class=\"plus\" *ngIf=\"!toggleList2\"><img src=\"../../../../assets/piu.svg\" class=\"listImage\"></span>\n        <span class=\"minus\" *ngIf=\"toggleList2\"><img src=\"../../../../assets/meno.svg\" class=\"listImage\"></span>\n        Pattern\n      </h3>\n      <div id=\"lista2\" *ngIf=\"toggleList2\">\n        <ul *ngFor=\"let pattern of patterns\">\n          <li id={{pattern.Id}} [attr.listened]=\"false\" class=\"libr\">{{pattern.Titolo}} <span><img src=\"../../../../assets/{{pattern.Titolo}}.png\"></span></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  <div id=\"filter\">\n    <h2>Filtri</h2>\n      <md-checkbox [checked]=\"true\" [disabled]=\"true\">Priorità 1</md-checkbox>\n      <md-checkbox id=\"check2\" [checked]=\"isChecked1\" (change)=\"toggle(1)\">Priorità 2</md-checkbox>\n      <md-checkbox id=\"check3\" [checked]=\"isChecked2\" (change)=\"toggle(2)\">Priorità 3</md-checkbox>\n      <md-checkbox id=\"check4\" [checked]=\"isChecked3\" (change)=\"toggle(3)\">Priorità 4</md-checkbox>\n      <md-checkbox id=\"check5\" [checked]=\"isChecked4\" (change)=\"toggle(4)\">Priorità 5</md-checkbox>\n  </div>\n</span>\n"

/***/ }),
/* 232 */
/***/ (function(module, exports) {

module.exports = "<!--\n * File: codeditor.component.html\n * Version: 0.9\n * Type: html\n * Date: 19-06-2017\n * Author: Carlo Sindico\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Carlo Sindico || 19-06-2017 ||creazione div html contente l'editor del codice\n *\n-->\n\n<span class=\"diagramBlock\">\n        <div ace-editor id=\"codeEditor\" #editor [theme]=\"'sqlserver'\" [text]=\"this.project.getSelectedCode()\" [mode]=\"'java'\"></div>\n</span>\n"

/***/ }),
/* 233 */
/***/ (function(module, exports) {

module.exports = "<!--\n * File: codegeneratepalette.component.html\n * Version: 0.9\n * Type: html\n * Date: 17-06-2017\n * Author: Saverio Follador\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Saverio Follador || 17-06-2017 ||creazione div html contente i bottoni di generazione ed esporta codice\n *\n-->\n\n\n\n\n<span class=\"paletteDX\">\n      <div id=\"code\">\n        <h2>Linguaggio</h2>\n        <md-radio-group>\n          <md-radio-button labelPosition=\"before\">Java</md-radio-button>\n        </md-radio-group>\n        <button type=\"submit\" md-raised-button id=\"buttonGenerate\" color=\"primary\" (click)=\"generateCode()\">Genera</button>\n      </div>\n      <div id=\"generate\">\n        <button type=\"submit\" md-raised-button id=\"buttonExport\" color=\"primary\" (click)=\"exportCode()\">Esporta</button>\n      </div>\n    </span>\n"

/***/ }),
/* 234 */
/***/ (function(module, exports) {

module.exports = "<!--\n * File: codelistafilepalette.component.html\n * Version: 0.9\n * Type: html\n * Date: 17-06-2017\n * Author: Alberto Rossetti\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Rossetti || 17-06-2017 ||creazione div html per la palette contente i file del codice generato\n *\n-->\n\n<span class=\"paletteSX\">\n    <div id=\"fileList\">\n      <h2>    Lista File     </h2>\n           <ul>\n             <li  *ngFor=\"let file of this.project.getCode()\" (click)=\"this.setSelectedFile(file.name)\">\n                <span class=\"fileListActive\" *ngIf=\"this.project.getSelectedFileName() === file.name\">{{file.name}}</span>\n                <span *ngIf=\"!(this.project.getSelectedFileName() === file.name)\">{{file.name}}</span>\n             </li>\n           </ul>\n  </div>\n</span>\n"

/***/ }),
/* 235 */
/***/ (function(module, exports) {

module.exports = "<!--\n * File: codepage.component.html\n * Version: 1.0\n * Type: html\n * Date: 16-06-2017\n * Author: Saverio Follador\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Saverio Follador || 16-06-2017 ||creazione div html per il componente che contiene la i componenti della generazione di codice\n *\n-->\n\n\n\n\n<div class=\"projectnameBar\">{{this.project.getName()}}</div>\n<div class=\"container\">\n<app-codelistafilepalette></app-codelistafilepalette>\n<app-codeditor></app-codeditor>\n<app-codegeneratepalette></app-codegeneratepalette>\n</div>\n"

/***/ }),
/* 236 */
/***/ (function(module, exports) {

module.exports = "<!--\n * File: editorpage.component.html\n * Version: 1.0\n * Type: html\n * Date: 15-06-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n * Registro modifiche:\n * Alberto Giudice || 15-06-2017 ||creazione div html per il componente che contiene la i componenti della generazione di codice\n *\n-->\n\n\n\n\n<router-outlet>\n<div id=\"logoContainer\">\n<a routerLink=\"\"><img src=\"./assets/logo.png\" id=\"headerLogo\" /></a>\n</div>\n\n<nav md-tab-nav-bar id=\"tabs\">\n\n  <a md-tab-link class=\"tabLink\"\n     [routerLink]=\"['classpage']\"\n     routerLinkActive #rl1=\"routerLinkActive\"\n     [active]=\"rl1.isActive\">\n   \t Classi\n  </a>\n    <a md-tab-link class=\"tabLink\"\n     [routerLink]=\"['activitypage']\"\n     routerLinkActive #rl2=\"routerLinkActive\"\n     [active]=\"rl2.isActive\">\n   \t Attività\n  </a>\n    <a md-tab-link class=\"tabLink\"\n     [routerLink]=\"['codepage']\"\n     routerLinkActive #rl3=\"routerLinkActive\"\n     [active]=\"rl3.isActive\">\n  \t Codice\n  </a>\n</nav>\n\n<div id=\"savehomeContainer\">\n\t<div class=\"headerIcon\">\n  <img src=\"./assets/save.svg\" (click)=\"saveProject()\" />\n  </div>\n  <div class=headerIcon>\n  <a routerLink=\"\"><img src=\"./assets/home.svg\" /></a>\n  </div>\n</div>\n\n</router-outlet>\n\n\n\n\n\n"

/***/ }),
/* 237 */
/***/ (function(module, exports) {

module.exports = "<!--\n * File: dialognewproject.component.html\n * Version: 1.0\n * Type: html\n * Date: 22-05-2017\n * Author: Alberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n *\n * Registro modifiche:\n * Alberto Giudice || 22-05-2017 || creazione di html per contenere il componente dialognewproject\n *\n-->\n\n\n\t<div class=\"popup\">\n        <h2>Nuovo progetto</h2>\n        <form>\n          <div class=\"form-group\">\n            <!--<label for=\"name\">Nome</label>-->\n            <input type=\"text\" class=\"form-control\" id=\"name\" [value]=\"this.project.getName()\" (input)=\"this.project.setName($event.target.value)\" placeholder=\"Inserisci un nome per il progetto\" required>\n          </div>\n          <!--<p *ngIf=\"this.project.getName()==''\"  >Inserisci un nome per il progetto</p>-->\n          <button type=\"submit\" class=\"btn btn-success\" *ngIf=\"this.project.getName()!=''\" routerLink=\"/editorpage/classpage\" (click)=\"this.dialogRef.close()\">CREA</button>\n          <button type=\"submit\" class=\"btn btn-success\" *ngIf=\"this.project.getName()==''\" disabled>CREA</button>\n        </form>\n    </div>\n\n\n\n\n"

/***/ }),
/* 238 */
/***/ (function(module, exports) {

module.exports = "<!--\n * File: dialoguploadproject.component.html\n * Version: 1.0\n * Type: html\n * Date: 23-05-2017\n * Author: ALberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n *\n * Registro modifiche:\n * Alberto Giudice || 23-05-2017 || creazione di html per contenere il componente dialoguploadproject\n *\n-->\n\n\n\n\t<div class=\"popup\">\n        <h2>Carica Progetto</h2>\n        <form>\n          <div class=\"form-group\">\n            <input id=\"fileInput\" name=\"file\" type=\"file\" class=\"ng-hide\" multiple (change)=\"upload($event)\">\n          </div>\n          <p *ngIf=\"!validProject && !firstTime\">Selezionare un progetto compatibile</p>\n          <button type=\"submit\" class=\"btn btn-success\" *ngIf=\"!validProject\" disabled>CARICA</button>\n          <button type=\"submit\" class=\"btn btn-success\" *ngIf=\"validProject\" (click)=\"dialogRef.close()\" routerLink=\"/editorpage/classpage\">CARICA</button>\n        </form>\n    </div>\n\n\n\n"

/***/ }),
/* 239 */
/***/ (function(module, exports) {

module.exports = "<!--\n * File: firstpage.component.html\n * Version: 1.0\n * Type: html\n * Date: 23-05-2017\n * Author: ALberto Giudice\n * E-mail: digitalcookies.group@gmail.com\n *\n * License: GNU General Public License v3.0\n *\n *\n * Registro modifiche:\n * Alberto Giudice || 23-05-2017 || creazione di html per contenere il componente firstpage\n *\n-->\n\n\n\n\n<div class=\"firstpage\">\n\t<div class=\"slogan\">\n\t<img src=\"assets/logo.png\" height=\"150em\"/>\n\t\t<h1>{{titoloslogan}}</h1>\n\n\t<div class=\"buttons\">\n\t\t<button id=\"button1\" md-raised-button color=\"primary\" (click)=\"opendialognewproject()\">Nuovo Progetto</button>\n\t\t<button id=\"button2\" md-raised-button color=\"primary\" (click)=\"opendialoguploadproject()\">Carica Progetto</button>\n\t</div>\n\n</div>\n</div>\n"

/***/ }),
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(111);


/***/ })
],[294]);
//# sourceMappingURL=main.bundle.js.map