import React, { useEffect } from "react";
import DashCard from "./DashCard";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import LinkIcon from "@material-ui/icons/Link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import url from "../config";
import useStyles from "../css/useStyles";
import AddIcon from "@material-ui/icons/Add";
import ExpandedRSO from "../components/ExpandedRSO";
import AddRSO from "../components/AddRSO";
import Moment from "moment";

import {
	Container,
	Avatar,
	Card,
	CardHeader,
	CardActions,
	CardMedia,
	Typography,
	Fab,
	Grid,
	Button,
	Backdrop,
	TextField,
	Modal,
	CardContent,
	Fade
} from "@material-ui/core";
export default function ManageRSO() {
	const [rsos, setRsos] = React.useState([]);
	const [showModal, setModal] = React.useState(false);
	const [showExpanded, setShowExpanded] = React.useState(false);
	const [currentRSO, setCurrentRSO] = React.useState(null);
	const [fabOpen, setFabOpen] = React.useState(false);
	const [showUpdate, setShowUpdate] = React.useState(false);
	const classes = useStyles();
	const base_url = url();
	const role = localStorage.getItem("role");
	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		fetch(base_url + "/rso/" + user.emailDomain)
			.then(r => r.json())
			.then(data => {
				setRsos(data);
			});
	}, [base_url]);

	const delete_rso = current => {
		console.log(current);
		const options = {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(current)
		};

		fetch(base_url + "/rso", options)
			.then(res => res.json())
			.then(data => {
				console.log(data);
			});
	};

	const list = rsos.map((item, id) => (
		<ListItem key={id} button>
			<IconButton
				onClick={() => {
					setModal(true);
					setCurrentRSO(item);
				}}
			>
				<ZoomInIcon />
			</IconButton>
			<ListItemText primary={item.rsoId} />
			<ListItemSecondaryAction>
				<IconButton disabled={item.id === undefined}>
					{role === "admin" ? <AddIcon /> : null}
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	));

	console.log(rsos);
	return (
		<div className={classes.root}>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Typography
						gutterBottom
						variant="h5"
						component="h2"
						className={classes.eventTitle}
					>
						RSOs
						{role === "admin" ? (
							<Fab
								color="primary"
								aria-label="add"
								className={classes.fab}
								onClick={() => {
									setModal(true);
								}}
							>
								<AddIcon />
							</Fab>
						) : null}
					</Typography>
					<Container className={classes.cardGrid} maxWidth="md">
						<Grid container spacing={4}>
							{rsos.map((card, id) => (
								<Grid item key={id} xs={12} sm={6} md={4}>
									<Card className={classes.card}>
										<CardHeader
											avatar={
												<Avatar
													aria-label="recipe"
													className={classes.avatar}
												>
													{card.rsoId.charAt(0)}
												</Avatar>
											}
											title={card.rsoId}
										/>
										<CardMedia
											className={classes.cardMedia}
											image={
												"https://source.unsplash.com/featured/?college,event/" +
												id
											}
											title="Image title"
										/>
										<CardContent
											className={classes.cardContent}
										>
											<Typography>
												{card.description}
											</Typography>
										</CardContent>
										<CardActions>
											<Button
												size="small"
												color="primary"
												onClick={() => {
													setCurrentRSO(card);
													setShowExpanded(true);
												}}
											>
												View
											</Button>
											{role === "admin" &&
											card.uid === user.uid ? (
												<Button
													size="small"
													color="primary"
													onClick={() => {
														delete_rso(card);
													}}
												>
													Delete
												</Button>
											) : null}
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</Container>
					<AddRSO
						open={showModal}
						item={currentRSO}
						handleClose={() => {
							setModal(false);
							window.location.reload();
						}}
					/>
				</Container>
				<ExpandedRSO
					show={showExpanded}
					handleClose={() => setShowExpanded(false)}
					item={currentRSO}
				/>
			</main>
		</div>
	);
}
