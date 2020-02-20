import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
	const classes = useStyles();
	if (!props.auth.isAuthenticated) {
		return (
			<>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							<a style={{ textDecoration: 'none', color: 'white' }} href="/">
								znajdź współlokatora!{' '}
							</a>
						</Typography>

						<Button
							href="/signup"
							style={{ margin: '0.5%' }}
							variant="contained"
						>
							Zarejestruj się
						</Button>
						<Button
							href="/signin"
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
							<a style={{ textDecoration: 'none', color: 'white' }} href="/">
								znajdź współlokatora!
							</a>
						</Typography>
						<Button
							href="/add"
							style={{ margin: '0.5%' }}
							variant="contained"
							color="secondary"
						>
							Dodaj ogloszenie
						</Button>
						<Button
							style={{ margin: '0.5%' }}
							variant="contained"
							onClick={props.onClick}
						>
							Wyloguj się
						</Button>
					</Toolbar>
				</AppBar>
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
