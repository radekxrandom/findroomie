import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						znajdź współlokatora!
					</Typography>
					<Button href="/signup" style={{ margin: '0.5%' }} variant="contained">
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
};
export default Nav;
