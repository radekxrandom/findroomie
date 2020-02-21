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

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			typeofadd: 0,
			title: '',
			message: '',
			selectedFile: null,
			mobile: ''
		};
	}
	logout = () => {
		this.props.logoutUser();
	};
	componentDidMount() {
		//redirect to mainpage if user isn't logged in
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}
	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onChangeHandler = (e) => {
		this.setState({
			selectedFile: e.target.files[0],
			loaded: 0
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { typeofadd, title, message, mobile, selectedFile } = this.state;
		/*	const data = {
			title,
			body,
			mobile,
			file
		}; */
		let formData = new FormData();
		formData.append('title', title);
		formData.append('message', message);
		formData.append('mobile', mobile);
		formData.append('selectedFile', selectedFile);
		formData.append('typeofadd', typeofadd);
		let post = await axios.post('http://localhost:9000/api/add', formData);
		console.log(post.status);
		console.log(post.res);
	};
	showForm = (i) => {
		this.setState({
			typeofadd: i
		});
	};

	render() {
		if (this.state.typeofadd === 0) {
			return (
				<div>
					<Nav onClick={this.logout} />
					<div
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%, -50%)',
							width: '45%',
							height: '50%'
						}}
					>
						<Paper
							style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
							elevation={5}
						>
							<center>
								<p style={{ color: 'white', fontSize: '2rem' }}>
									JAKI RODZAJ OGLOSZENIA CHCESZ DODAC?
								</p>
								<Button
									onClick={(e) => this.showForm(1)}
									variant="contained"
									color="primary"
									style={{ margin: '3%', fontSize: '1.2rem' }}
								>
									Szukam mieszkania
								</Button>
								<Button
									onClick={(e) => this.showForm(1)}
									variant="contained"
									color="primary"
									style={{ margin: '3%', fontSize: '1.2rem' }}
								>
									Szukam współlokatora
								</Button>
							</center>
						</Paper>
					</div>
				</div>
			);
		} else if (this.state.typeofadd === 1) {
			return (
				<div>
					<Nav onClick={this.logout} />
					<Button
						style={{ margin: '0.5%', position: 'absolute', left: '0' }}
						variant="contained"
						onClick={(e) => this.showForm(0)}
					>
						&larr; Go back
					</Button>
					<center>
						<div className="container">
							<div
								className="col-md-5"
								style={{
									backgroundColor: 'rgba(0, 0, 0, 0.6)',
									marginTop: '10%',
									borderRadius: '9px'
								}}
							>
								<div className="form-area">
									<form onSubmit={this.handleSubmit}>
										<br style={{ clear: 'both' }} />
										<h3
											style={{
												marginBottom: '25px',
												textAlign: 'center',
												color: 'white'
											}}
										>
											DODAJ OGŁOSZENIE ŻEBY ZNALEŹĆ MIESZKANIE
										</h3>

										<div className="form-group">
											<input
												type="text"
												className="form-control"
												id="mobile"
												name="mobile"
												placeholder="Mobile Number"
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												id="title"
												name="title"
												placeholder="Title"
												required
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group">
											<textarea
												className="form-control"
												type="textarea"
												id="message"
												name="message"
												placeholder="Message"
												maxLength={140}
												rows={7}
												defaultValue={''}
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group files">
											<label style={{ color: 'white' }}>
												Upload Your File{' '}
											</label>
											<input
												type="file"
												onChange={this.onChangeHandler}
												className="form-control"
												multiple
											/>
										</div>
										<button
											style={{ margin: '2%' }}
											type="submit"
											id="submit"
											name="submit"
											className="btn btn-primary pull-right"
										>
											Submit Form
										</button>
									</form>
								</div>
							</div>
						</div>
					</center>
				</div>
			);
		} else if (this.state.typeofadd === 2) {
			return (
				<div>
					<Nav onClick={this.logout} />
					<Button
						style={{ margin: '0.5%', position: 'absolute', left: '0' }}
						variant="contained"
						onClick={(e) => this.showForm(0)}
					>
						&larr; Go back
					</Button>
					<center>
						<div className="container">
							<div
								className="col-md-5"
								style={{
									backgroundColor: 'rgba(0, 0, 0, 0.6)',
									marginTop: '10%',
									borderRadius: '9px'
								}}
							>
								<div className="form-area">
									<form role="form" onSubmit={this.handleSubmit}>
										<br style={{ clear: 'both' }} />
										<h3
											style={{
												marginBottom: '25px',
												textAlign: 'center',
												color: 'white'
											}}
										>
											DODAJ OGŁOSZENIE ŻEBY ZNALEŹĆ MIESZKANIE
										</h3>

										<div className="form-group">
											<input
												type="text"
												className="form-control"
												id="mobile"
												name="mobile"
												placeholder="Mobile Number"
												required
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												id="title"
												name="title"
												placeholder="Title"
												required
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group">
											<textarea
												className="form-control"
												type="textarea"
												id="message"
												name="message"
												placeholder="Message"
												maxLength={140}
												rows={7}
												defaultValue={''}
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group files">
											<label style={{ color: 'white' }}>
												Upload Your File{' '}
											</label>
											<input
												type="file"
												className="form-control"
												multiple
												onChange={this.onChangeHandler}
											/>
										</div>
										<button
											style={{ margin: '2%' }}
											type="submit"
											id="submit"
											name="submit"
											className="btn btn-primary pull-right"
										>
											Submit Form
										</button>
									</form>
								</div>
							</div>
						</div>
					</center>
				</div>
			);
		}
	}
}
Add.propTypes = {
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
)(Add);
