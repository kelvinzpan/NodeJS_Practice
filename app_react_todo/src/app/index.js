var React = require('react');
var ReactDOM = require('react-dom');
require('./css/index.css');

import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

// Module requires
var TodoItem = require('./todoItem');
var AddItem = require('./addItem');
var About = require('./about');

var App = React.createClass({
	render: function(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact={true} path={'/'} component={TodoComponent}></Route>
					<Route exact={true} path={'/about'} component={About}></Route>
				</Switch>
			</BrowserRouter>
		);
	}
});

// Create component
var TodoComponent = React.createClass({

	// Define states
	getInitialState: function() {

		return {
			todos: ['Game', 'Groceries', 'Homework']
		}
	}, // getInitialState

	// Required method is render, returns HTML code which will be inserted
	render: function(){
		var todos = this.state.todos;
		todos = todos.map(function(item, index){
			return (
				<TodoItem item={item} key={index} onDelete={this.onDelete}/>
			);
		}.bind(this));

		return (
			// Write JSX, must be one parent div
			<div id="todo-list">
				<Link to={'/about'}>About</Link>
				<p>Todos:</p>
				<ul>{todos}</ul>
				<AddItem onAdd={this.onAdd}/>
			</div>
		);
	}, // render

	// Custom functions
	onDelete: function(item){
		var updatedTodos = this.state.todos.filter(function(val, index){
			return item !== val;
		});
		this.setState({
			todos: updatedTodos
		});
	},

	onAdd: function(item){
		var updatedTodos = this.state.todos;
		updatedTodos.push(item);
		this.setState({
			todos: updatedTodos
		});
	}

	// Lifecycle functions
});

// Place component into HTML page
ReactDOM.render(<App />, document.getElementById('todo-wrapper'));
