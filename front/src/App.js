import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Sign from './Sign';
import Up from './Up';
import Add from './Add';
import Ads from './Ads';
import Ad from './Ad';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = './login';
	}
}
const App = () => {
	return (
		<div>
			<Provider store={store}>
				<Router>
					<Switch>
						<Route path="/signup" component={Up} />
						<Route path="/signin" component={Sign} />
						<Route path="/add" component={Add} />
						<Route path="/ads" component={Ads} />
						<Route path="/ad/:uid" component={Ad} />
						<Route path="/" component={Main} />
					</Switch>
				</Router>
			</Provider>
		</div>
	);
};

export default App;
