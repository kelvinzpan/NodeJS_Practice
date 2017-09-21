// Modify package.json so mocha is run with "npm run test"
const assert = require('assert');

const MarioChar = require('../models/mariochar');

// Describe tests
describe('Finding records', function(){

	var char;

	// Hook
	beforeEach(function(done){
		char = new MarioChar({
			name: 'Mario'
		});

		// Mongoose save is async, so need to test with promise
		char.save().then(function(){
			done(); // Lets Mocha know to move to next test
		});
	});

	// Create tests

	it('Finds a record from the database', function(done){
		MarioChar.findOne({
			name: 'Mario'
		}).then(function(result){
			assert(result.name === 'Mario');
			done();
		})
	});

	it('Finds a record by ID from the database', function(done){
		MarioChar.findOne({
			_id: char._id
		}).then(function(result){
			assert(result._id.toString() === char._id.toString());
			done();
		})
	});
});