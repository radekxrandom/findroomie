import React, { useState, useRef, useEffect } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

const Nav = (props) => {
	const node = useRef();
	const secnode = useRef();
	const [show, setShow] = useState(false);
	const dropdown = () => {
		setShow(!show);
	};
	const classes = useStyles();
	{
		/*	const handleClick = (e) => {
		if (node.current.contains(e.target)) {
			// inside click
			return;
		}
	}; */
	}
	if (!props.auth.isAuthenticated) {
		return (
			<>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							<Link style={{ textDecoration: 'none', color: 'white' }} to="/">
								znajdź współlokatora!{' '}
							</Link>
						</Typography>

						<Button
							component={Link}
							to={'/signup'}
							style={{ margin: '0.5%' }}
							variant="contained"
						>
							Zarejestruj się
						</Button>
						<Button
							component={Link}
							to={'/signin'}
							style={{ margin: '0.5%' }}
							variant="contained"
							color="secondary"
						>
							Zaloguj się
						</Button>
					</Toolbar>
				</AppBar>
			</>
		);
	} else {
		return (
			<>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" href="/" className={classes.title}>
							<Link
								to="/"
								style={{
									textDecoration: 'none',
									color: 'white',
									fontSize: '2rem !important'
								}}
							>
								znajdź współlokatora!
							</Link>
						</Typography>

						<Button
							variant="contained"
							style={{ margin: '0.5%', backgroundColor: '#2FB827' }}
							color="primary"
							component={Link}
							to={'/ads'}
						>
							Zobacz wszystkie ogloszenia
						</Button>

						<Button
							component={Link}
							to={'/add'}
							style={{ margin: '0.5%' }}
							variant="contained"
							color="secondary"
						>
							Dodaj ogloszenie
						</Button>

						<ArrowDropDownIcon
							className="dropIcon"
							color="action"
							style={{ fontSize: '60', marginLeft: '2%', marginRight: '1%' }}
							onClick={dropdown}
						/>
					</Toolbar>
				</AppBar>
				{show && (
					<div
						className="dropDiv"
						style={{
							position: 'absolute',
							color: 'white',
							textAlign: 'center',
							right: '1%',
							fontSize: '20px'
						}}
					>
						<ul
							className="dropUl"
							style={{
								listStyleType: 'none',
								border: 'solid',
								borderLeft: 'none',
								borderRight: 'none',
								borderBottomRightRadius: '5px',
								borderBottomLeftRadius: '5px',
								paddingInlineStart: '0 ',
								width: '112%',
								backgroundColor: ' #3f51b5',
								fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'
							}}
						>
							<Link to={`user/${props.auth.user.data.id}`}>
								<li
									className="dropLi"
									style={{ borderBottom: 'solid' }}
									component={Link}
								>
									PROFIL
								</li>
							</Link>
							<li className="dropLi" onClick={props.onClick}>
								WYLOGUJ SB
							</li>
						</ul>
					</div>
				)}
			</>
		);
	}
};

Nav.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps)(Nav);
