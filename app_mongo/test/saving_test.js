// Modify package.json so mocha is run with "npm run test"
const assert = require('assert');

const MarioChar = require('../models/mariochar');

// Describe tests
describe('Saving records', function(){

	// Create tests

	it('Saves a record to the database', function(done){
		
		var char = new MarioChar({
			name: 'Mario'
		});

		// Mongoose save is async, so need to test with promise
		char.save().then(function(){
			assert(char.isNew === false);
			done(); // Lets Mocha know to move to next test
		});
	});
});