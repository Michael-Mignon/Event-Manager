import React from "react";
import Header from "../components/Header";
import useStyles from "../css/useStyles.js";
import { CssBaseline, Container } from "@material-ui/core";
import UniversityTable from "../components/UniversityTable.jsx";

export default function SuperAdmin() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header name="Super Admin" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<UniversityTable />;
				</Container>
			</main>
		</div>
	);
}
