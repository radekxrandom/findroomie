import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav.js';
import Middle from './components/Middle.js';

class App extends Component {
	render() {
		return (
			<div>
				<Nav />
				<Middle />
			</div>
		);
	}
}

export default App;
