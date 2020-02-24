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

class Reset extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pageShown: 0,
			password: ''
		};
	}
	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		const { email } = this.state;
		let dull = {
			email: email
		};
		let formData = new FormData();
		formData.append('email', email);
		let post = await axios.post('http://localhost:9000/api/sentcode', dull);
		console.log(post.status);
		console.log(post.data);
	};
	goFurther = () => {
		this.setState({
			pageShown: 1
		});
	};

	handlePwdChange = async (e) => {
		e.preventDefault();
		if (this.state.pageShown == 1) {
			const { email, code } = this.state;
			let form = {
				email: email,
				code: code,
				case: '1'
			};
			let pos = await axios.post('http://localhost:9000/api/resetpwd', form);
			console.log(pos.data);
			console.log(pos.status);
			this.setState({
				pageShown: 2
			});
		} else if (this.state.pageShown == 2) {
			const { email, code, password } = this.state;
			let form = {
				email,
				code,
				pwd: password,
				case: '2'
			};
			let pos = await axios.post('http://localhost:9000/api/resetpwd', form);
			console.log(pos.data);
			console.log(pos.status);
			this.props.history.push('/');
		}
	};
	render() {
		if (this.state.pageShown == 0) {
			return (
				<Container component="main" maxWidth="xs">
					<Button
						style={{ margin: '0.5%', position: 'absolute', left: '0' }}
						variant="contained"
						href="/"
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
							Zapomniales hasla? Podaj swoj adres e-mail a wyslemy ci kod
							resetujacy je.
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
								id="email"
								label="Your email address"
								name="email"
								onChange={this.handleInputChange}
								autoComplete="email"
								autoFocus
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								style={{ margin: '3, 0, 5%, 4' }}
							>
								Reset
							</Button>
							<br />
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								style={{ margin: '3, 0, 2' }}
								onClick={this.goFurther}
							>
								Idz dalej
							</Button>
						</form>
					</div>
				</Container>
			);
		} else if (this.state.pageShown == 1) {
			return (
				<Container component="main" maxWidth="xs">
					<Button
						style={{ margin: '0.5%', position: 'absolute', left: '0' }}
						variant="contained"
						href="/"
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
							Podaj kod wyslany na twoj email.
						</Typography>
						<form
							onSubmit={this.handlePwdChange}
							style={{ width: '100%', marginTop: '3' }}
							noValidate
						>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Your email address"
								name="email"
								onChange={this.handleInputChange}
								autoComplete="email"
								autoFocus
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="code"
								label="Code sent to your email"
								name="code"
								onChange={this.handleInputChange}
								autoComplete="code"
								autoFocus
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								style={{ margin: '3, 0, 2' }}
							>
								Send code
							</Button>
						</form>
					</div>
				</Container>
			);
		} else if (this.state.pageShown == 2) {
			return (
				<Container component="main" maxWidth="xs">
					<Button
						style={{ margin: '0.5%', position: 'absolute', left: '0' }}
						variant="contained"
						href="/"
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
							Podaj nowe haslo.
						</Typography>
						<form
							onSubmit={this.handlePwdChange}
							style={{ width: '100%', marginTop: '3' }}
							noValidate
						>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Your email address"
								name="email"
								onChange={this.handleInputChange}
								autoComplete="email"
								autoFocus
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="code"
								label="Code sent to your email"
								name="code"
								onChange={this.handleInputChange}
								autoComplete="code"
								autoFocus
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="password"
								label="New password"
								name="password"
								onChange={this.handleInputChange}
								autoComplete="password"
								autoFocus
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								style={{ margin: '3, 0, 2' }}
							>
								Reset
							</Button>
						</form>
					</div>
				</Container>
			);
		}
	}
}
Reset.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps)(Reset);
