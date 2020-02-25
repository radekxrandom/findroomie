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
import Popup from 'reactjs-popup';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: '',
			username: '',
			email: '',
			mobile: '',
			address: '',
			about: '',
			street: '',
			city: '',
			open: false,
			tab: 0,
			password: '',
			pwd: '',
			pwd1: '',
			open1: false,
			err: ''
		};
	}
	componentDidMount() {
		const id = this.props.match.params.id;
		axios.get(`http://localhost:9000/api/user/${id}`).then((res) => {
			const items = res.data;
			const fields = items.usr;
			this.setState({ item: fields });

			let ad = fields.address.split('_');
			this.setState({
				username: fields.username,
				email: fields.email,
				mobile: fields.mobile,
				about: fields.about,
				street: ad[0],
				city: ad[1]
			});
		});
	}
	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		const { username, email, mobile, about, street, city } = this.state;
		if (street && city) {
			var adrs = street + '_' + city;
		} else {
			var adrs = '';
		}
		let form = {
			username,
			email,
			mobile,
			address: adrs,
			about
		};

		let id = this.props.match.params.id;
		let pos = await axios.post(`http://localhost:9000/api/user/${id}`, form);
		console.log(pos.data);
		if (pos.status == 200) {
			this.setState({ open: true });
		}
	};

	handleSubmit1 = async (e) => {
		e.preventDefault();
		const { password, pwd, pwd1 } = this.state;
		if (pwd == pwd1) {
			let form = {
				pwd: pwd,
				password: password
			};
			let poss = await axios.post('http://localhost:9000/api/pwdchange', form);
			console.log(poss.data);
			let dat = poss.data;

			this.setState({
				open1: true,
				err: dat.err
			});
		} else {
			this.setState({
				open1: true,
				err: 'New passwords do not match'
			});
		}
	};
	logout = () => {
		this.props.logoutUser();
	};
	goToMain = () => {
		this.props.history.push('/');
	};
	openModal = () => {
		this.setState({ open: true });
	};
	closeModal = () => {
		this.setState({ open: false, open1: false });
	};
	switchTab = (i) => {
		this.setState({
			tab: i
		});
	};

	render() {
		if (this.state.tab == 0) {
			return (
				<>
					<Nav onClick={this.logout} />
					<Button
						style={{ margin: '0.5%', position: 'absolute', left: '0' }}
						variant="contained"
						onClick={this.goToMain}
					>
						&larr; Go back
					</Button>
					<br />
					<br />
					<div className="profile">
						<div className="tabbar">
							<div className="tabs">
								<div
									className="activetab tab"
									id="tab0"
									onClick={() => this.switchTab(0)}
								>
									Profil
								</div>
								<div
									className="tab"
									id="tab1"
									onClick={() => this.switchTab(1)}
								>
									Zmien haslo
								</div>
								<div
									className="tab"
									id="tab2"
									onClick={() => this.switchTab(2)}
								>
									Ustawienia
								</div>
							</div>
						</div>
						<img
							style={{ float: 'left', margin: '1.5%' }}
							src="https://avatars2.githubusercontent.com/u/12987981?s=460&v=4"
						/>
						<div className="profilefields">
							<div className="form-area" style={{ padding: '0' }}>
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<span className="lab">Username: </span>
										<input
											type="text"
											className="form-control"
											id="username"
											name="username"
											value={this.state.username}
											onChange={this.handleInputChange}
										/>
									</div>
									<div className="form-group">
										<span className="lab">Email address:</span>
										<input
											type="text"
											className="form-control"
											id="email"
											name="email"
											value={this.state.email}
											onChange={this.handleInputChange}
										/>
									</div>
									<div className="form-group">
										<span className="lab">Phone number:</span>
										<input
											type="text"
											className="form-control"
											id="mobile"
											name="mobile"
											value={this.state.mobile}
											onChange={this.handleInputChange}
										/>
									</div>

									<div className="tt form-group" style={{ marginLeft: '-28%' }}>
										<span className="lab">Napisz cos o sobie</span>
										<textarea
											style={{
												width: '108%',
												height: '15rem',
												marginTop: '1%'
											}}
											type="text"
											className="form-control"
											id="about"
											name="about"
											value={this.state.about}
											onChange={this.handleInputChange}
										/>
									</div>
									<div style={{ marginLeft: '-28%' }}>
										<div className="form-group">
											<span className="lab">Ulica:</span>
											<input
												type="text"
												className="form-control"
												id="street"
												name="street"
												value={this.state.street}
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group">
											<span className="lab">Miasto:</span>
											<input
												type="text"
												className="form-control"
												id="city"
												name="city"
												value={this.state.city}
												onChange={this.handleInputChange}
											/>
										</div>
									</div>
									<div style={{ marginLeft: '80%', width: '100%' }}>
										<Button
											style={{}}
											type="submit"
											variant="contained"
											color="primary"
										>
											Zapisz zmiany
										</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<Popup
						style={{ width: '30%' }}
						open={this.state.open}
						closeOnDocumentClicks
						onClose={this.closeModal}
					>
						<div className="modal lodal">
							<span className="mod"> Zmiany zapisane. </span>
							<br />
							<Button
								style={{ margin: '2%', backgroundColor: '#609F51' }}
								type="submit"
								variant="contained"
								color="primary"
								className="ber"
								onClick={this.closeModal}
							>
								Zamknij
							</Button>
						</div>
					</Popup>
				</>
			);
		} else if (this.state.tab == 1) {
			return (
				<>
					<Nav onClick={this.logout} />
					<Button
						style={{ margin: '0.5%', position: 'absolute', left: '0' }}
						variant="contained"
						onClick={this.goToMain}
					>
						&larr; Go back
					</Button>
					<br />
					<br />
					<div className="profile">
						<div className="tabbar">
							<div className="tabs">
								<div
									className="tab"
									id="tab0"
									onClick={() => this.switchTab(0)}
								>
									Profil
								</div>
								<div
									className="activetab tab"
									id="tab1"
									onClick={() => this.switchTab(1)}
								>
									Zmien haslo
								</div>
								<div
									className="tab"
									id="tab2"
									onClick={() => this.switchTab(2)}
								>
									Ustawienia
								</div>
							</div>
						</div>

						<div className="nd profilefields">
							<div className="form-area" style={{ padding: '0' }}>
								<form onSubmit={this.handleSubmit1}>
									<div className="form-group">
										<span className="lab">Obecne haslo: </span>
										<input
											type="password"
											className="form-control"
											id="password"
											name="password"
											value={this.state.password}
											onChange={this.handleInputChange}
										/>
									</div>
									<div className="form-group">
										<span className="lab">Nowe haslo:</span>
										<input
											type="password"
											className="form-control"
											id="pwd"
											name="pwd"
											value={this.state.pwd}
											onChange={this.handleInputChange}
										/>
									</div>
									<div className="form-group">
										<span className="lab">Nowe haslo:</span>
										<input
											type="password"
											className="form-control"
											id="pwd1"
											name="pwd1"
											value={this.state.pwd1}
											onChange={this.handleInputChange}
										/>
									</div>
									<input
										type="checkbox"
										id="showpwd"
										name="showpwd"
										value="showpwd"
										onClick={this.switchpwd}
									/>
									<label htmlFor="showpwd"> Pokaz hasla</label>
									<br />
									<div style={{}}>
										<Button
											style={{}}
											type="submit"
											variant="contained"
											color="primary"
										>
											Zapisz zmiany
										</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<Popup
						style={{ width: '30%' }}
						open={this.state.open1}
						closeOnDocumentClicks
						onClose={this.closeModal}
					>
						<div className="modal lodal">
							<span className="mod"> {this.state.err} </span>
							<br />
							<Button
								style={{ margin: '2%', backgroundColor: '#609F51' }}
								type="submit"
								variant="contained"
								color="primary"
								className="ber"
								onClick={this.closeModal}
							>
								Zamknij
							</Button>
						</div>
					</Popup>
				</>
			);
		} else if (this.state.tab == 2) {
			return (
				<>
					<Nav onClick={this.logout} />
					<Button
						style={{ margin: '0.5%', position: 'absolute', left: '0' }}
						variant="contained"
						onClick={this.goToMain}
					>
						&larr; Go back
					</Button>
					<br />
					<br />
					<div className="profile">
						<div className="tabbar">
							<div className="tabs">
								<div
									className="tab"
									id="tab0"
									onClick={() => this.switchTab(0)}
								>
									Profil
								</div>
								<div
									className="tab"
									id="tab1"
									onClick={() => this.switchTab(1)}
								>
									Zmien haslo
								</div>
								<div
									className="activetab tab"
									id="tab2"
									onClick={() => this.switchTab(2)}
								>
									Ustawienia
								</div>
							</div>
						</div>
						<img
							style={{ float: 'left', margin: '1.5%' }}
							src="https://avatars2.githubusercontent.com/u/12987981?s=460&v=4"
						/>
						<div className="profilefields">
							<div className="form-area" style={{ padding: '0' }}>
								<form onSubmit={this.handleSubmit1}>
									<div className="form-group">
										<span className="lab">Username: </span>
										<input
											type="text"
											className="form-control"
											id="username"
											name="username"
											value={this.state.username}
											onChange={this.handleInputChange}
										/>
									</div>
									<div className="form-group">
										<span className="lab">Email address:</span>
										<input
											type="text"
											className="form-control"
											id="email"
											name="email"
											value={this.state.email}
											onChange={this.handleInputChange}
										/>
									</div>
									<div className="form-group">
										<span className="lab">Phone number:</span>
										<input
											type="text"
											className="form-control"
											id="mobile"
											name="mobile"
											value={this.state.mobile}
											onChange={this.handleInputChange}
										/>
									</div>

									<div className="tt form-group" style={{ marginLeft: '-28%' }}>
										<span className="lab">Napisz cos o sobie</span>
										<textarea
											style={{
												width: '108%',
												height: '15rem',
												marginTop: '1%'
											}}
											type="text"
											className="form-control"
											id="about"
											name="about"
											value={this.state.about}
											onChange={this.handleInputChange}
										/>
									</div>
									<div style={{ marginLeft: '-28%' }}>
										<div className="form-group">
											<span className="lab">Ulica:</span>
											<input
												type="text"
												className="form-control"
												id="street"
												name="street"
												value={this.state.street}
												onChange={this.handleInputChange}
											/>
										</div>
										<div className="form-group">
											<span className="lab">Miasto:</span>
											<input
												type="text"
												className="form-control"
												id="city"
												name="city"
												value={this.state.city}
												onChange={this.handleInputChange}
											/>
										</div>
									</div>
									<div style={{ marginLeft: '60%', width: '115%' }}>
										<Button
											variant="contained"
											color="secondary"
											style={{ marginRight: '2%' }}
										>
											Zmien haslo
										</Button>
										<Button
											style={{}}
											type="submit"
											variant="contained"
											color="primary"
										>
											Zapisz zmiany
										</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<Popup
						style={{ width: '30%' }}
						open={this.state.open}
						closeOnDocumentClicks
						onClose={this.closeModal}
					>
						<div className="modal lodal">
							<span className="mod"> Zmiany zapisane. </span>
							<br />
							<Button
								style={{ margin: '2%', backgroundColor: '#609F51' }}
								type="submit"
								variant="contained"
								color="primary"
								className="ber"
								onClick={this.closeModal}
							>
								Zamknij
							</Button>
						</div>
					</Popup>
				</>
			);
		}
	}
}
User.propTypes = {
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
)(User);
