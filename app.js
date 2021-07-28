"use strict"

var fs = require('fs')
var http = require('http')
var path = require('path')
var url = require('url')

var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var ejs = require('ejs')
const router = express.Router()

app.set('view engine','ejs')
app.engine('ejs', require('ejs').__express)


router.get('/', function(req, res){

	res.render('index', {pagename: "Home"})
	
})

router.post('/register', function(req, res){
	
	console.log(req.body)
	var errors = []
	var success = 'Signed Up Successfully'
	var fields = ['Firstname', 'Lastname', 'Address', 'City', 'State', 'Zip', ]
	
	for(let i = 0; i < fields.length; i++){
	
		if(req.body[fields[i].toLowerCase()] === ''){
		
			errors.push(fields[i] + ' is required!')
		
		}
	
	}
	
	if(!req.body.male && !req.body.female){
	
		errors.push('A gender selection is required')
	
	}
	
	if(req.body.bio === ''){
	
		errors.push('A Bio is required!')
	
	}
	
	if(!req.body.consent){
	
		errors.push('You must agree to our Terms & Conditions')
	
	}
	
	if(errors.length === 0){
	
		res.render('index', {pagename: "Home", success:success})
	
	}else{
	
		res.render('index', {pagename: "Home", errors:errors})
	
	}
	
})
app.use(express.static('public'))
app.use('/', router)
var server = app.listen('8080')