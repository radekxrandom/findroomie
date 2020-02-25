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
import Routes from './Routes.js';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useHistory,
	useLocation,
	withRouter
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from './actions/authActions';

class Up extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			email: '',
			error: ''
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}
	componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}
	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { username, password, email } = this.state;

		const user = {
			username,
			password,
			email
		};

		this.props.registerUser(user, this.props.history);
		/*	this.setState({
			redirect: true
		});*/
	};
	goToMain = () => {
		this.props.history.push('/');
	};
	render() {
		/*	if (this.state.redirect === true) {
			return <Redirect to="/" />;
		}
*/
		return (
			<Container component="main" maxWidth="xs">
				<Button
					style={{ margin: '0.5%', position: 'absolute', left: '0' }}
					variant="contained"
					onClick={this.goToMain}
				>
					&larr; Go back
				</Button>
				<CssBaseline />
				<div
					style={{
						marginTop: '8',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Avatar
						style={{
							margin: '1',
							backgroundColor: 'theme.palette.secondary.main'
						}}
					>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form
						onSubmit={this.handleSubmit}
						style={{ width: '100%', marginTop: '3' }}
						noValidate
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="fname"
									name="username"
									onChange={this.handleInputChange}
									variant="outlined"
									required
									fullWidth
									id="username"
									label="Username"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									onChange={this.handleInputChange}
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									onChange={this.handleInputChange}
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowxtraEmails" color="primary" />}
									label="I agee to some stuff and things.."
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							style={{ margin: '3, 0, 2' }}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="/signin" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

Up.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Up));
