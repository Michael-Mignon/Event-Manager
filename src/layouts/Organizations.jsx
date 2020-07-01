import React from "react";
import Header from "../components/Header";
import useStyles from "../css/useStyles.js";
import { CssBaseline, Container } from "@material-ui/core";
import ManageRSO from "../components/ManageRSO";
export default function Organizations() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header name="Organizations" />
			<main className={classes.content}>
				<Container maxWidth="lg" className={classes.container}>
					<ManageRSO />
				</Container>
			</main>
		</div>
	);
}
