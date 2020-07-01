import React from "react";
import useStyles from "../css/useStyles";
import clsx from "clsx";
import { List, Typography, Grid, Paper } from "@material-ui/core";
import ExpandedEvent from "./ExpandedEvent";
import ExpandedRSO from "./ExpandedRSO";
import ExpandedUniversity from "./ExpandedUniversity";
import Select from "@material-ui/core/Select";
import url from "../config";
export default function DashCard(props) {
	const events = props.list;
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	let expandView;

	if (props.view === "RSO") {
		expandView = (
			<ExpandedRSO
				show={props.showModal}
				handleClose={props.handleClose}
				item={props.item}
			/>
		);
	} else if (props.view === "Uni") {
		expandView = (
			<ExpandedUniversity
				show={props.showModal}
				handleClose={props.handleClose}
				item={props.item}
			/>
		);
	} else if (props.view === "comment") {
		expandView = null;
	} else {
		expandView = (
			<ExpandedEvent
				show={props.showModal}
				handleClose={props.handleClose}
				item={props.item}
			/>
		);
	}

	return (
		<Grid item xs={12} md={8} lg={9}>
			<Typography
				component="h1"
				variant="h6"
				color="inherit"
				noWrap
				className={classes.title}
			>
				{props.title}
			</Typography>
			{props.search}
			<Paper className={fixedHeightPaper}>
				<List>{events}</List>
			</Paper>
			{expandView}
		</Grid>
	);
}
