const Mongoose = require('mongoose');

// ES6 Promises
Mongoose.Promise = global.Promise;

// Connect to database before tests run
before(function(done){
	// Connect to MongoDB
	Mongoose.connect('mongodb://localhost/test');

	// Event listener, once connection is open
	Mongoose.connection.once('open', function(){
		console.log('Connection has been made.');
		done();
	}).on('error', function(error){
		console.log('Connection error: ', error);
	});
});

// Drop the characters collection before each test
beforeEach(function(done){

	// Drop the collection
	Mongoose.connection.collections.mariochars.drop(function(){
		done();
	});
})