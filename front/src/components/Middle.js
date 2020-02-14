import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(92),
			height: theme.spacing(32)
		},
		formControl: {
			margin: theme.spacing(3),
			minWidth: 340
		},
		selectEmpty: {
			marginTop: theme.spacing(2)
		}
	}
}));

export default function Middle() {
	const classes = useStyles();

	return (
		<div
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -50%)'
			}}
		>
			<div className={classes.root}>
				<Paper style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} elevation={5}>
					<center>
						<h1 style={{ color: 'white' }}>ZNAJDŹ IDEALNEGO WSPÓŁLOKATORA</h1>
					</center>
					<br />
					<div style={{ marginLeft: '1rem', marginTop: '2rem' }}>
						<select
							className="form-control"
							style={{ width: 'fit-content', display: 'inline' }}
							id="sel"
						>
							<option value="room">I need a room</option>
							<option value="mate">I need a roommate</option>
						</select>
						<input
							style={{
								width: 'fit-content',
								display: 'inline',
								marginLeft: '1rem'
							}}
							type="text"
							className="form-control"
							placeholder="City"
						/>
						<Button
							style={{
								width: '15rem',
								display: 'inline',
								marginLeft: '1rem'
							}}
							variant="contained"
							color="primary"
						>
							Go &nbsp; &nbsp; &gt;
						</Button>
					</div>
				</Paper>
			</div>
		</div>
	);
}
