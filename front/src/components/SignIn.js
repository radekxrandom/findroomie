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

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
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

		const { username, password } = this.state;

		const user = {
			username,
			password
		};

		let po = await axios.post('http://localhost:9000/api/login', user);
		console.log(`Status code: ${po.status}`);
		console.log(`Status text: ${po.statusText}`);
		console.log(`Request method: ${po.request.method}`);
		console.log(`Path: ${po.request.path}`);
		history.push('/');
	};

	render() {
		return (
			<Container component="main" maxWidth="xs">
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
							id="login"
							label="Username"
							name="login"
							autoComplete="login"
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
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
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
export default SignIn;
