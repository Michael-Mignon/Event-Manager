import React from "react";
import Header from "../components/Header";
import useStyles from "../css/useStyles.js";
import { CssBaseline, Container } from "@material-ui/core";
import UserRSO from "../components/UserRSO";

export default function Membership() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header name="Your RSOs" />
			<main className={classes.content}>
				<Container maxWidth="lg" className={classes.container}>
					<UserRSO />
				</Container>
			</main>
		</div>
	);
}
