import React from "react";
import Header from "../components/Header";
import useStyles from "../css/useStyles.js";
import { makeStyles } from "@material-ui/core/styles";
import url from "../config";
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Grid,
	Button,
	TextField,
	CssBaseline,
	Container
} from "@material-ui/core";

const button = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	}
}));

export default function Account() {
	const classes = useStyles();
	const bcrypt = require("bcryptjs");
	const [edit, setEdit] = React.useState(false);
	const user = JSON.parse(localStorage.getItem("user"));
	const [password, setPassword] = React.useState(user.password);
	const base_url = url();
	const cancel = (
		<Button
			fullWidth
			className={button.button}
			variant="contained"
			color="primary"
			onClick={() => {
				setEdit(false);
			}}
		>
			Cancel
		</Button>
	);

	const submitChanges = () => {
		const updated = user;
		updated.password = password;
		localStorage.setItem("user", JSON.stringify(user));
		user.password = bcrypt.hashSync(password);
		console.log(user);
		const options = {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updated)
		};

		fetch(base_url + "/user", options)
			.then(res => res.json())
			.then(data => {
				setEdit(false);
			});
	};
	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header name="Your Account" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Card className={classes.expanded_card}>
						<CardContent className={classes.expanded_card}>
							<Container fixed={true}>
								<TextField
									id="standard-multiline-static"
									label="Username:"
									disabled
									rows="4"
									defaultValue={user.uid}
									className={classes.textField}
									margin="normal"
									fullWidth={true}
								/>
								<TextField
									id="standard-multiline-static"
									label="Password:"
									disabled={!edit}
									rows="4"
									defaultValue={user.password}
									className={classes.textField}
									onChange={event => {
										setPassword(event.target.value);
									}}
									margin="normal"
									fullWidth={true}
								/>
								<TextField
									id="standard-multiline-static"
									label="Email Domain:"
									disabled
									rows="4"
									defaultValue={user.emailDomain}
									className={classes.textField}
									margin="normal"
									fullWidth={true}
								/>
								<TextField
									id="standard-multiline-static"
									label="University:"
									disabled
									rows="4"
									defaultValue={user.universityId}
									className={classes.textField}
									margin="normal"
									fullWidth={true}
								/>
							</Container>
						</CardContent>
						<Button
							onClick={() => {
								setEdit(!edit);
							}}
							size="small"
							color="primary"
						>
							{edit === false ? "Edit Password" : "Cancel"}
						</Button>
						<CardActions>
							{edit === true ? (
								<Button
									onClick={submitChanges}
									size="small"
									color="primary"
								>
									Submit
								</Button>
							) : null}
						</CardActions>
					</Card>
				</Container>
			</main>
		</div>
	);
}
