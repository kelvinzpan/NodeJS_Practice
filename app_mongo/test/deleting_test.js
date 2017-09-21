// Modify package.json so mocha is run with "npm run test"
const assert = require('assert');

const MarioChar = require('../models/mariochar');

// Describe tests
describe('Deleting records', function(){

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

	it('Deletes a record from the database', function(done){
		MarioChar.findOneAndRemove({
			name: 'Mario'
		}).then(function(){
			MarioChar.findOne({
				name: 'Mario'
			}).then(function(result){
				assert(result === null);
				done();
			});
		});
	});
});