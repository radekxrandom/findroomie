import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav.js';
import Middle from './components/Middle.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './actions/authActions';

class Main extends Component {
	logout = () => {
		this.props.logoutUser();
	};
	render() {
		return (
			<div>
				<Nav onClick={this.logout} />
				<Middle />
			</div>
		);
	}
}
Main.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Main);
