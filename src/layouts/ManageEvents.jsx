import Header from "../components/Header";
import useStyles from "../css/useStyles.js";
import { Avatar, CssBaseline, Container, Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect } from "react";
import {
	Button,
	TextField,
	Select,
	MenuItem,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	CardHeader
} from "@material-ui/core";
import { Typography, Modal, Backdrop, Fade } from "@material-ui/core";
import url from "../config";
import ExpandedEvent from "../components/ExpandedEvent";
import DateTimePicker from "react-datetime-picker";
import EditEvent from "../components/EditEvent";
import ConflictModal from "../components/ConflictModal";
export default function ManageEvents(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const base_url = url();
	const [events, setEvents] = React.useState([]);
	const [eventType, setType] = React.useState("");
	const [eventId, setEventName] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [startTime, setStart] = React.useState(new Date());
	const [endTime, setEnd] = React.useState(new Date());
	const [lname, setLocation] = React.useState(null);
	const [phone, setPhone] = React.useState("");
	const [email, setEmail] = React.useState("");
	const user = JSON.parse(localStorage.getItem("user"));
	const [edit, toggleEdit] = React.useState(false);
	const [rso, setRSO] = React.useState("");
	const [rso_list, setRSOList] = React.useState([]);
	const [category, setCategory] = React.useState("");
	const [conflict, setConflict] = React.useState(false);
	const [conflicting, setConflicting] = React.useState(null);
	const disabled = () => {
		return (
			lname === "" ||
			eventType === "" ||
			eventId === "" ||
			description === "" ||
			phone === "" ||
			email === "" ||
			startTime === null ||
			endTime === null
		);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		fetch(base_url + "/event")
			.then(r => r.json())
			.then(data => {
				setEvents(data);
				fetch(base_url + "/rso/admin/" + user.uid)
					.then(res => res.json())
					.then(rsos => {
						setRSOList(rsos);
					});
			});
	}, [base_url]);

	const [showModal, setModal] = React.useState(false);
	const [currentEvent, setCurrentEvent] = React.useState(null);
	const handleModalClose = () => {
		setModal(false);
	};

	const addEvent = () => {
		let ext = "/event";
		if (eventType === "private") {
			ext = "/private_event";
		} else if (eventType === "public") {
			ext = "/public_event";
		} else if (eventType === "rso") {
			ext = "/rso_event";
		}

		let date = startTime;
		const start =
			date.getUTCFullYear() +
			"-" +
			("00" + (date.getUTCMonth() + 1)).slice(-2) +
			"-" +
			("00" + date.getUTCDate()).slice(-2) +
			" " +
			("00" + date.getUTCHours()).slice(-2) +
			":" +
			("00" + date.getUTCMinutes()).slice(-2) +
			":" +
			("00" + date.getUTCSeconds()).slice(-2);

		date = endTime;

		const end =
			date.getUTCFullYear() +
			"-" +
			("00" + (date.getUTCMonth() + 1)).slice(-2) +
			"-" +
			("00" + date.getUTCDate()).slice(-2) +
			" " +
			("00" + date.getUTCHours()).slice(-2) +
			":" +
			("00" + date.getUTCMinutes()).slice(-2) +
			":" +
			("00" + date.getUTCSeconds()).slice(-2);

		const newEvent = {
			eventId: eventId,
			startTime: start,
			endTime: end,
			description: description,
			eventName: eventId,
			contactPhone: phone,
			contactEmail: email,
			lname: lname,
			adminUid: user.uid,
			category: category,
			rsoId: rso
		};
		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newEvent)
		};

		fetch(base_url + "/location/" + lname)
			.then(r => r.json())
			.then(loc => {
				if (loc[0] === undefined || loc[0 === null]) {
					const api_url =
						"https://maps.googleapis.com/maps/api/geocode/json?address=" +
						newEvent.lname +
						"&key=AIzaSyAv9NYTJ-KjN4KoCO_BLQP_SspzXmTkeA4";
					let newLocation = {
						lname: lname,
						address: "",
						lattitude: 0,
						longitude: 0
					};
					fetch(api_url)
						.then(res => res.json())
						.then(location_data => {
							if (
								location_data !== undefined &&
								location_data !== null &&
								location_data.status === "OK"
							) {
								const results = location_data.results;

								newLocation.address =
									location_data.results[0].formatted_address;
								newLocation.lattitude =
									results[0].geometry.location.lat;
								newLocation.longitude =
									results[0].geometry.location.lng;
							}

							const location_options = {
								method: "POST",
								headers: {
									Accept: "application/json",
									"Content-Type": "application/json"
								},
								body: JSON.stringify(newLocation)
							};

							fetch(base_url + "/location", location_options)
								.then(add_res => add_res.json())
								.then(adding_location => {
									const options = {
										method: "POST",
										headers: {
											Accept: "application/json",
											"Content-Type": "application/json"
										},
										body: JSON.stringify(newEvent)
									};
									fetch(base_url + ext, options)
										.then(res => res.json())
										.then(data => {
											if (
												data[0] !== undefined &&
												data[0].eventId !== eventId
											) {
												setConflict(true);
												setConflicting(data[0]);
											} else window.location.reload();
										});
								});
						});
				} else {
					fetch(base_url + ext, options)
						.then(res => res.json())
						.then(data => {
							console.log(data);
							if (
								data[0] !== undefined &&
								data[0].eventId !== eventId
							) {
								setConflict(true);
								setConflicting(data[0]);
							} else window.location.reload();
						});
				}
			});

		handleClose(true);
	};

	const convertDate = date => {
		if (date === null) return null;
		const year = date.substring(0, 4);
		const month = date.substring(5, 7);
		const day = date.substring(8, 10);
		const hour = date.substring(12, 14);
		const mins = date.substring(14, 16);

		return month + "/" + day + "/" + year + ", " + hour + "" + mins;
	};

	const list_of_rsos = rso_list.map(item => (
		<MenuItem value={item.rsoId}>{item.rsoId}</MenuItem>
	));
	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header name="Administrator" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Typography
						gutterBottom
						variant="h5"
						component="h2"
						className={classes.eventTitle}
					>
						Events
						<Fab
							color="primary"
							aria-label="add"
							className={classes.fab}
							onClick={handleOpen}
						>
							<AddIcon />
						</Fab>
					</Typography>
					<Container className={classes.cardGrid} maxWidth="md">
						<Grid container spacing={4}>
							{events.map((card, id) => (
								<Grid item key={id} xs={12} sm={6} md={4}>
									<Card className={classes.card}>
										<CardHeader
											avatar={
												<Avatar
													aria-label="recipe"
													className={classes.avatar}
												>
													{card.eventName !== null
														? card.eventName.charAt(
																0
														  )
														: null}
												</Avatar>
											}
											title={card.eventName}
											subheader={convertDate(
												card.startTime
											)}
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
													setCurrentEvent(card);
													setModal(true);
												}}
											>
												View
											</Button>
											<Button
												size="small"
												color="primary"
												onClick={() => {
													setCurrentEvent(card);
													toggleEdit(true);
												}}
											>
												Edit
											</Button>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</Container>
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={open}>
							<div className={classes.paper1}>
								<Container component="main" maxWidth="xs">
									<Typography component="h1" variant="h5">
										Create Event
									</Typography>
									<form
										onSubmit={() => addEvent()}
										className={classes.form}
										noValidate
									>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<TextField
													autoComplete="uname"
													name="setEventName"
													variant="outlined"
													required
													fullWidth
													id="eventName"
													label="Event Name"
													onChange={event => {
														setEventName(
															event.target.value
														);
													}}
													autoFocus
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													id="email"
													label="Contact Email"
													name="email"
													onChange={event =>
														setEmail(
															event.target.value
														)
													}
													autoComplete="email"
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													multiline={true}
													fullWidth
													name="description"
													label="Description"
													type="description"
													id="description"
													onChange={event => {
														setDescription(
															event.target.value
														);
													}}
													autoComplete="description"
												/>
											</Grid>

											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													id="phone"
													label="Contact Phone Number"
													name="phone"
													onChange={event =>
														setPhone(
															event.target.value
														)
													}
													autoComplete="phone"
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													id="lname"
													label="Address"
													name="lname"
													onChange={event =>
														setLocation(
															event.target.value
														)
													}
													autoComplete="location"
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													id="category"
													label="Category"
													name="category"
													onChange={event =>
														setCategory(
															event.target.value
														)
													}
													autoComplete="email"
												/>
											</Grid>
											<Grid item xs={12}>
												<Select
													value={eventType}
													fullWidth
													onChange={event => {
														setType(
															event.target.value
														);
													}}
													displayEmpty
													className={
														classes.selectEmpty
													}
												>
													<MenuItem value="" disabled>
														Select Event Type
													</MenuItem>
													<MenuItem value={"public"}>
														Public
													</MenuItem>
													<MenuItem value={"private"}>
														Private
													</MenuItem>
													<MenuItem value={"rso"}>
														RSO Event
													</MenuItem>
												</Select>
											</Grid>
											<Grid item xs={12}>
												{eventType === "rso" ? (
													<Select
														value={rso}
														fullWidth
														onChange={event => {
															setRSO(
																event.target
																	.value
															);
														}}
														displayEmpty
														className={
															classes.selectEmpty
														}
													>
														{list_of_rsos}
													</Select>
												) : null}
											</Grid>
											<Grid item xs={12}>
												Start : {"  "}
												<DateTimePicker
													disableClock={true}
													disableCalendar={true}
													onChange={date => {
														setStart(date);
													}}
												/>
											</Grid>
											<Grid item xs={12}>
												End : {"  "}
												<DateTimePicker
													disableClock={true}
													disableCalendar={true}
													onChange={date => {
														setEnd(date);
													}}
												/>
											</Grid>
										</Grid>
										<Button
											fullWidth
											disabled={disabled()}
											variant="contained"
											color="primary"
											onClick={() => {
												addEvent();
												handleClose(true);
											}}
											className={classes.submit}
										>
											Create
										</Button>
									</form>
								</Container>
							</div>
						</Fade>
					</Modal>
					<EditEvent
						show={edit}
						item={currentEvent}
						handleClose={() => {
							toggleEdit(false);
						}}
					/>
				</Container>
				<ExpandedEvent
					show={showModal}
					handleClose={handleModalClose}
					item={currentEvent}
				/>
				<ConflictModal
					item={conflicting}
					show={conflict}
					close={() => {
						setConflict(false);
					}}
				/>
			</main>
		</div>
	);
}
