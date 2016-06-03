var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient; 
//instance of 
var db = MongoClient.connect('mongodb://localhost/contactlist')
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser')

app.use(express.static(__dirname + "/public")); 
//use static(__dirname) to server the directory of public
//also can add url behind the express.static to make server side file based on url direcoty. 




app.use(bodyParser.json())

app.get('/abc', function(req, res) {
	db.then(function(db) {
		return db.collection('contactlist').find().toArray()
	}).then(res.json.bind(res))

})
app.post('/addUser', function(req, res) {
	var data = req.body;
	console.log(data)
	db.then(function(db) {
		db.collection('contactlist').insert(data)
	})
})
app.delete('/contactlist/:id', function(req, res) {
	var id = ObjectId(req.params.id);
	console.log(id)

	db.then(function(db) {
		return db.collection('contactlist').remove({
			_id: id
		})
	})
})
app.get('/find/:id', function(req, res) {
	var id = ObjectId(req.params.id);
	console.log(id);
	db.then(function(db) {
			return db.collection('contactlist').findOne({
				_id: id
			});
		}).then(res.json.bind(res))
		// .then(function(data){res.json.bind(data)})
})
app.put('/contactlist/:id', function(req, res) {
	var id = ObjectId(req.params.id);
	console.log(req.body.name)
	db.then(function(db) {
			db.collection('contactlist').updateOne(
				{_id: id}, 
				{$set: {
						name: req.body.name,
						email: req.body.email,
						number: req.body.number
						}},
				{upsert:true}
				
			)
	})
})

// app.get('/abc', function(req, res) {


// 	// console.log('I recive this from server side using GET')

// 	// res.json(db.contactlist.find())

// 	// db.then(function(db){
// 	// 	console.log('db.then good pass');
// 	// 	return db.collection('contactlist').find().toArray();
// 	// 	console.log('return not work')
// 	// }).then(res.json.bind(res))
// })

app.listen(3000);
console.log("server running in 3000")