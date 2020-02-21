import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Nav from './components/Nav.js';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useHistory,
	useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './actions/authActions';
import ListItem from './components/ListItem';
class Ad extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: ''
		};
	}
	componentDidMount() {
		const uid = this.props.match.params.uid;
		axios.get(`http://localhost:9000/api/single/${uid}`).then((res) => {
			const items = res.data;
			this.setState({ item: items.ad });
		});
	}
	logout = () => {
		this.props.logoutUser();
	};
	render() {
		return (
			<>
				<Nav onClick={this.logout} />
				<Button
					style={{ margin: '0.5%', position: 'absolute', left: '0' }}
					variant="contained"
					href="/ads"
				>
					&larr; Go back
				</Button>
				<br />
				<br />
				<ListItem item={this.state.item} />
			</>
		);
	}
}
Ad.propTypes = {
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
)(Ad);
