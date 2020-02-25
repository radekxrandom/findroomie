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
import { loginUser } from './actions/authActions';

class Sign extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			error: ''
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/'); // push user to dashboard when they login
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}
	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('pach');

		const { username, password } = this.state;

		const user = {
			username,
			password
		};
		this.props.loginUser(user);
	};
	goToMain = () => {
		this.props.history.push('/');
	};
	render() {
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
						Sign in
					</Typography>
					<form
						onSubmit={this.handleSubmit}
						style={{ width: '100%', marginTop: '3' }}
						noValidate
					>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							onChange={this.handleInputChange}
							autoComplete="username"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange={this.handleInputChange}
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							style={{ margin: '3, 0, 2' }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="/resetpwd" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/signup" variant="body2">
									{'Don\'t have an account? Sign Up'}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}
Sign.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(
	mapStateToProps,
	{ loginUser }
)(Sign);
