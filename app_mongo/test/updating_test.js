// Modify package.json so mocha is run with "npm run test"
const assert = require('assert');

const MarioChar = require('../models/mariochar');

// Describe tests
describe('Upadating records', function(){

	var char;

	// Hook
	beforeEach(function(done){
		char = new MarioChar({
			name: 'Mario',
			weight: 50
		});

		// Mongoose save is async, so need to test with promise
		char.save().then(function(){
			done(); // Lets Mocha know to move to next test
		});
	});

	// Create tests

	it('Updates a record from the database', function(done){
		MarioChar.findOneAndUpdate({name: 'Mario'}, {name: 'Luigi'}).then(function(){
			MarioChar.findOne({_id: char._id}).then(function(result){
				assert(result.name === 'Luigi');
				done();
			});
		});
	});

	it('Increments weight by 1', function(done){
		MarioChar.update({}, {$inc: {weight: 1}}).then(function(){
			MarioChar.findOne({name: 'Mario'}).then(function(result){
				assert(result.weight === 51);
				done();
			});
		});
	});
});