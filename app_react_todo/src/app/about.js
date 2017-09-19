var React = require('react');

import {Link} from 'react-router-dom';


var About = React.createClass({
	render: function(){
		return(
			<div>
				<Link to={'/'}>Home</Link>
				<h2>About Me</h2>
			</div>
		);
	}
});

module.exports = About;