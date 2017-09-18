var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to MongoDB database hosted on mLab
mongoose.connect('mongodb://test:test@ds141454.mlab.com:41454/todo_tut');

// Create a schema - blueprint for data
var todoSchema = new mongoose.Schema({
	item: String
});

// Create a model
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended:false});

// var data = [{item: 'Groceries'}, {item: 'Homework'}, {item: 'Get Diamond'}];

module.exports = function(app){

	app.get('/todo', function(req, res){
		// Get data from MongoDB
		Todo.find({}, function(err, data){
			if( err ) throw err;
			res.render('todo', {todos: data});;
		});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		// Get data from view, and add it to MongoDB
		var newTodo = Todo( req.body ).save(function(err, data) {
			if( err ) throw err;
			res.json( data );
		})
	});

	app.delete('/todo/:item', function(req, res){
		// Delete requested item from MongoDB
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
			if( err ) throw err;
			res.json(data);
		});
	});

};