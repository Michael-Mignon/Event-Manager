import React, { useEffect } from "react";
import Header from "../components/Header";
import useStyles from "../css/useStyles.js";
import DashCard from "../components/DashCard";
import { CssBaseline, Container } from "@material-ui/core";
import { ListItem, IconButton, ListItemText } from "@material-ui/core";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import url from "../config";
export default function University() {
	const classes = useStyles();
	const base_url = url();
	const [universities, setUni] = React.useState([]);
	const [current_uni, setCurrentUni] = React.useState(null);
	const [showModal, setModal] = React.useState(false);
	const user = JSON.parse(localStorage.getItem("user"));
	useEffect(() => {
		fetch(base_url + "/university")
			.then(r => r.json())
			.then(data => {
				setUni(data);
			});
	}, [base_url]);

	const handleClose = () => {
		setModal(false);
	};
	const userUni = universities.filter(
		item => item.universityId === user.universityId
	);
	const list = userUni.map((item, id) => (
		<ListItem key={id} button>
			<IconButton
				onClick={() => {
					setModal(true);
					setCurrentUni(item);
				}}
			>
				<ZoomInIcon />
			</IconButton>
			<ListItemText primary={item.uname} />
		</ListItem>
	));

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header name="University" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<DashCard
						title="Your University"
						list={list}
						item={current_uni}
						showModal={showModal}
						handleClose={handleClose}
						view="Uni"
					/>
				</Container>
			</main>
		</div>
	);
}
