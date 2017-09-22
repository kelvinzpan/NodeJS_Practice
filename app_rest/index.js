const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set up Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// MIDDLEWARE
// Serve static files like HTML
app.use(express.static('public'));

// Parse JSON from body before it goes to route
app.use(bodyParser.json());

// Initialize routes
app.use('/api', require('./routes/api'));

// Error handling middleware, custom function
app.use(function(err, req, res, next){
	// console.log(err);
	res.status(422).send({error: err.message});
});

// Listen for get request at root
app.get('/', function(req, res){
	console.log('GET request at root');
	res.send({ name: 'xD' });
});

// Listen for requests
app.listen(process.env.port || 4000, function(){
	console.log('Now listening for requests.');
});