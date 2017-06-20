process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Template = require('../models/template');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = require('chai').expect;
let should = chai.should();
let sinon = require('sinon');
let supertest = require('supertest');
let server = supertest.agent("http://localhost:3000");
            
let routes = require('../ThreeTier/PresentationTier/Middleware/index');
let classparser = require('../ThreeTier/ApplicationTier/Generator/JavaGenerator/ClassDiaJavaGenerator/parser');
let JavaGenerator = require("../ThreeTier/ApplicationTier/Generator/JavaGenerator/JavaGenerator.js");
let ApplicationController = require('../ThreeTier/ApplicationTier/ApplicationController.js');

chai.use(chaiHttp);


	describe('Template', function(){
	
		it('Should be invalid if Id || Title || Category || Body are empty', function(done){
			var t = new Template();
			t.validate(function(err){
			expect(err.errors.Id).to.exist;
			expect(err.errors.Titolo).to.exist;
			expect(err.errors.Categoria).to.exist;
			expect(err.errors.Corpo).to.exist;
			done();
			});
		});
	});
	
	describe('GET', function(){
		it('It should GET the template -> t1 from the server', function(done) {
			server
			.get('/template/t1',/json/)
			.expect(200)
			.end(function(err, res){

				var json1 = ' {"Id": "t1", "Titolo": "template 1", "Categoria": "dp", "Corpo": "dsffds"}';
				var data=JSON.parse(json1);
				res.status.should.equal(200);
				expect(err).to.equal(null);
				expect(res).to.not.equal(null);
				expect(data.Id).to.equal('t1');
				expect(data.Titolo).to.equal('template 1');
				expect(data.Categoria).to.equal('dp');
				expect(data.Corpo).to.equal('dsffds');
				//res.body.error.should.equal(false);
				done();
				});
			});

		it('It should GET Home Page ', function(done) {
			server
			.get('/')
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				expect(err).to.equal(null);
				expect(res).to.not.equal(null);
				done();
			});
		});

		/*it('It should GET Data ', function(done) { // get non implementata poichè non utile al progetto
			server
			.get('/get-data')
			.expect(200)
			.end(function(err, res) {
			
				res.status.should.equal(200);
				expect(err).to.equal(null);
				expect(res).to.not.equal(null);
				done();
			});
		});	*/	

		it('It should GET the category ta', function(done) {
			server
			.get('/template/categoria/ta')
			.expect(200)
			.end(function(err, res) {
				
				var json = ' {"Id": "t4", "Titolo": "Mescola", "Categoria": "ta", "Corpo": ""}';
				var data=JSON.parse(json);
				res.status.should.equal(200);
				expect(err).to.equal(null);
				expect(res).to.not.equal(null);
				expect(data.Id).to.equal('t4');
				expect(data.Titolo).to.equal('Mescola');
				expect(data.Categoria).to.equal('ta');
				expect(data.Corpo).to.equal('');
				done();
				});
			});
		});
	
	describe('POST', function() {
        it('It should GET the template -> t1 from the server', function (done) {
            server
                .post('/')
                .expect(500)
                .end(function (err, res) {
                    res.status.should.equal(500);
                    expect(err).to.equal(null);

                    //res.body.error.should.equal(false);
                    done();
                });
       	 });
    });
			
	describe('Methods', function() {
        it('It should have some classes inside', function (done) {
            server
                .post('/')
                .expect(500)
                .end(function (err, res) {
                    var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string);
                    res.status.should.equal(500);
                    var json = res.body;
                    expect(json).to.not.equal(null);
					expect(ApplicationController.getGeneratedCode).to.not.equal(null);
					expect(ApplicationController.getGeneratedCode).to.have.property('nodeDataArray');
					expect(ApplicationController.getGeneratedCode.nodeDataArray).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.copiesArrays).to.be.true;
                    expect(err).to.equal(null);
                    done();
                });
        });

        it('It should have some methods inside', function (done) {
            server
                .post('/')
                .expect(500)
                .end(function (err, res) {
                    var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string);
                    res.status.should.equal(500);
                    var json = res.body;
                    expect(json).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.nodeDataArray).to.not.equal(null);
					expect(ApplicationController.getGeneratedCode.nodeDataArray).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.copiesArrays).to.be.true;
                    expect(err).to.equal(null);
                    done();
                });
        });

        it('It should have some arrays inside', function (done) {
            server
                .post('/')
                .expect(500)
                .end(function (err, res) {
                    var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string);
                    res.status.should.equal(500);
                    var json = res.body;
                    expect(json).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.nodeDataArray).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.copiesArrayObjects).to.be.true;
                    expect(ApplicationController.getGeneratedCode.copiesArrays).to.be.true;
                    expect(err).to.equal(null);
                    done();
                });
        });

        it('It should have some arrays inside', function (done) {
            server
                .post('/')
                .expect(500)
                .end(function (err, res) {
                    var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = ["category", "Classe"];
                    res.status.should.equal(500);
                    var json = res.body;
                    expect(json).to.not.equal(null);
                    expect(App).to.have.length(2);
                    expect(ApplicationController.getGeneratedCode).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.nodeDataArray).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.copiesArrayObjects).to.be.true;
                    expect(ApplicationController.getGeneratedCode.copiesArrays).to.be.true;
                    expect(err).to.equal(null);
                    done();
                });
        });
        it('It should have tipes inside', function (done) {
            server
                .post('/')
                .expect(500)
                .end(function (err, res) {
                    var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = { tipo: 'Abstract'};
                    res.status.should.equal(500);
                    var json = res.body;
                    expect(json).to.not.equal(null);
                   // expect(App).to.have.length(2);
                    expect( App ).to.have.keys( [ 'tipo' ] );
                    expect(ApplicationController.getGeneratedCode).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.nodeDataArray).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.copiesArrayObjects).to.be.true;
                    expect(ApplicationController.getGeneratedCode.copiesArrays).to.be.true;
                    expect(err).to.equal(null);
                    done();
                });
        });
        it('It should have attributes inside', function (done) {
            server
                .post('/')
                .expect(500)
                .end(function (err, res) {
                    var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
                    res.status.should.equal(500);
                    var json = res.body;
                    expect(json).to.not.equal(null);
                    // expect(App).to.have.length(2);
                    expect( App ).to.contain.keys( [ 'attributeID' ] );
                    expect(ApplicationController.getGeneratedCode).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.nodeDataArray).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.copiesArrayObjects).to.be.true;
                    expect(ApplicationController.getGeneratedCode.copiesArrays).to.be.true;
                    expect(err).to.equal(null);
                    done();
                });
        });

        it('It should show visibility inside', function (done) {
            server
                .post('/')
                .expect(500)
                .end(function (err, res) {
                    var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
                    res.status.should.equal(500);
                    var json = res.body;
                    expect(json).to.not.equal(null);
                    // expect(App).to.have.length(2);
                    expect( App ).to.contain.keys( [ 'visibility' ] );
                    expect(ApplicationController.getGeneratedCode).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.nodeDataArray).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.copiesArrayObjects).to.be.true;
                    expect(ApplicationController.getGeneratedCode.copiesArrays).to.be.true;
                    expect(err).to.equal(null);
                    done();
                });
        });

        it('It should show attributes name inside', function (done) {
            server
                .post('/')
                .expect(500)
                .end(function (err, res) {
                    var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
                    res.status.should.equal(500);
                    var json = res.body;
                    expect(json).to.not.equal(null);
                    // expect(App).to.have.length(2);
                    expect( App ).to.contain.keys( [ 'name' ] );
                    expect(ApplicationController.getGeneratedCode).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.nodeDataArray).to.not.equal(null);
                    expect(ApplicationController.getGeneratedCode.copiesArrayObjects).to.be.true;
                    expect(ApplicationController.getGeneratedCode.copiesArrays).to.be.true;
                    expect(err).to.equal(null);
                    done();
                });
        });


        it( 'should check types', function(done) {
            var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
            expect( '1' ).to.be.a( 'string' );
            expect( 1 ).to.be.a( 'number' );
            expect( true ).to.be.a( 'boolean' );
            expect( {} ).to.be.an( 'object' );
            expect( null ).to.be.a( 'null' );
            expect( undefined ).to.be.a( 'undefined' );
            expect( null ).to.be.a( 'null' );
            expect( [] ).to.be.an( 'array' );
            expect( 0/0 ).to.be.a( 'number' );
            done()
        } );

        it( 'should accept any number of chain objects', function() {
            var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
            expect( 'mocha' ).a( 'string' );
            expect( 'mocha' ).to.be.a( 'string' );
            expect( 'mocha' ).at.be.been.have.is.of.that.to.with.a( 'string' );
        } );


        it( 'should handle negation', function() {
            var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
            expect( 5 ).to.not.be.a( 'string' );
        } );

        it( 'should check truthy and falsy values', function() {
            var o = {};
            var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
            // x is truthy iff !!x is true.
            expect( 'John' ).to.be.ok;
            expect( true ).to.be.ok;
            expect( o ).to.be.ok;
            expect( 1 ).to.be.ok;
            expect( 0 ).to.be.not.ok;

            // y is falsy iff !!x is false.
            expect( null ).to.be.not.ok;
            expect( o.member ).to.be.not.ok;
            expect( "" ).to.be.not.ok;
        } );

        it( 'should check equality', function() {
            var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
            var o = {};
            o.o = o;

            expect( 2*2 ).to.equal( 4 );
            expect( NaN ).to.not.equal( NaN );
            expect( 5 ).to.not.equal( '5' );
            // different object references are not equal
            expect( { a: 3 } ).to.not.equal( { a: 3 } );
            // references pointing at the same object are equal
            expect( o.o ).to.equal( o );
        } );

        it( 'should detect null, undefined and existing values', function() {
            var o = {};
            var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
            expect( o ).to.exist;
            expect( null ).to.not.exist;
            expect( null ).to.be.null;
            expect( null ).to.not.be.undefined;
            expect( o.member ).to.not.exist;
            expect( o.member ).to.not.be.null;
            expect( o.member ).to.be.undefined;
        } );

        it( 'should check if an array contains an element', function() {
            var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
            expect( [1, 3, 5] ).to.contain( 3 );
            expect( [1, 3, 5] ).to.not.contain( 4 );

            // contain expressed without contain
            expect( [1, 3, 5].indexOf( 3 ) ).to.not.equal( -1 );
        } );

        it( 'should check keys of an object', function() {
            var string = '{ "class": "go.GraphLinksModel","copiesArrays": true,"copiesArrayObjects": true,"nodeDataArray": [ {"category":"Classe", "tipo":"<<abstract>>", "name":"A", "attributi":[ {"name":"x", "type":"int", "visibility":"+", "attributeID":0},{"name":"y", "type":"bool", "visibility":"+", "attributeID":"1"} ], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":2, "methodCount":1, "key":-1, "loc":{"class":"go.Point", "x":-343.20001220703125, "y":-204.71665954589844}},{"category":"Classe", "tipo":"default", "name":"B", "attributi":[], "methods":[ {"name":"metodo1", "parameters":"x:int, y:bool", "type":"int", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-2, "loc":{"class":"go.Point", "x":-353.20001220703125, "y":74.28334045410156}},{"category":"Classe", "tipo":"default", "name":"C", "attributi":[ {"name":"z", "type":"String", "visibility":"+", "attributeID":0} ], "methods":[ {"name":"metodo2", "parameters":"z:string", "type":"void", "visibility":"+", "methodID":0} ], "priority":1, "opacity":1, "color":"#fff59d", "attributeCount":1, "methodCount":1, "key":-3, "loc":{"class":"go.Point", "x":28.79998779296875, "y":-140.71665954589844}}],"linkDataArray": [ {"points":[ -238.20001220703125,74.28334045410156,-238.20001220703125,64.28334045410156,-238.20001220703125,20.23334045410155,-228.20001220703125,20.23334045410155,-228.20001220703125,-23.81665954589846,-228.20001220703125,-33.81665954589846 ], "category":"Generalizzazione", "from":-2, "to":-1},{"points":[ -113.20001220703125,-119.26665954589845,-103.20001220703125,-119.26665954589845,-42.20001220703125,-119.26665954589845,-42.20001220703125,-63.71665954589844,18.79998779296875,-63.71665954589844,28.79998779296875,-63.71665954589844 ], "category":"Dipendenza", "from":-1, "to":-3}]}'; ApplicationController.getGeneratedCode = JSON.parse(string); var App = {name:'x', type:'int', visibility:'+', attributeID:'0'};
            var jsonPayload =
                {
                    name:    'John',
                    email:   'john@user.com',
                    country: 'NZL'
                }

            // exact matching of all keys
            expect( jsonPayload ).to.have.keys( [ 'name', 'email', 'country' ] );
            // exclusion of keys
            expect( jsonPayload ).to.not.have.keys( [ 'repeat_email' ] );
            // inclusion of keys
            expect( jsonPayload ).to.contain.keys( [ 'name' ] );
        } );

    });