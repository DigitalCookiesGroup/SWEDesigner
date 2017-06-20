process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require ('mongoose');

var server = require('../app');
var categoria = require('../models/template');

var should = chai.should();
chai.use(chaiHttp);


describe('Categoria', function () {

    categoria.collection.drop();




});