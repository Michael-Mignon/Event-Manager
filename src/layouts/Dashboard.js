import React from "react";
import useStyles from "../css/useStyles.js";
import Header from "../components/Header";
import { CssBaseline, Container, Grid } from "@material-ui/core";
import RSSFeed from "../components/RSSFeed";
import RSO from "../components/RSO";
import Events from "../components/Events";
import Select from "@material-ui/core/Select";
export default function Dashboard() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header name="Dashboard" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={4}>
						<Events status="public" />
						<Events status="private" />
						<RSO />
						<RSSFeed />
					</Grid>
				</Container>
			</main>
		</div>
	);
}
