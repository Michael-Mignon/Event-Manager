import Header from "../components/Header";
import useStyles from "../css/useStyles.js";
import { Avatar, CssBaseline, Container, Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect } from "react";
import {
	Button,
	TextField,
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
export default function ManageEvents(props) {
	const event = props.event;
	const item = props.item;
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const base_url = url();
	const [events, setEvents] = React.useState([]);
	const [startTime, setStart] = React.useState(null);
	const [endTime, setEnd] = React.useState(null);
	const [eventId, setEventName] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [lname, setLocation] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [eventName, setName] = React.useState("");

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const editEvent = () => {
		let date = startTime === null ? new Date() : startTime;
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

		date = endTime === null ? new Date() : endTime;

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
			eventId: eventId === "" ? item.eventId : eventId,
			startTime: start,
			endTime: end,
			description: description === "" ? item.description : description,
			eventName: eventName === "" ? item.eventName : eventName,
			contactPhone: phone === "" ? item.contactPhone : phone,
			contactEmail: email === "" ? item.contactEmail : email,
			lname: lname === "" ? item.lname : lname
		};

		const options = {
			method: "PUT",
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
									fetch(base_url + "/event", options)
										.then(res => res.json())
										.then(data => {
											window.location.reload();
										});
								});
						});
				} else {
					fetch(base_url + "/event", options)
						.then(res => res.json())
						.then(data => {
							window.location.reload();
						});
				}
			});
	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={props.show}
			onClose={props.handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
		>
			<Fade in={props.show}>
				<div className={classes.paper1}>
					<Container component="main" maxWidth="xs">
						<Typography component="h1" variant="h5">
							Edit Event
						</Typography>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Event Name"
										name="email"
										defaultValue={
											item === null ? "" : item.eventName
										}
										onChange={event =>
											setName(event.target.value)
										}
										autoComplete="email"
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
										defaultValue={
											item === null
												? ""
												: item.contactEmail
										}
										onChange={event =>
											setEmail(event.target.value)
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
										defaultValue={
											item === null
												? ""
												: item.description
										}
										name="description"
										label="Description"
										type="description"
										id="description"
										onChange={event => {
											setDescription(event.target.value);
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
										defaultValue={
											item === null
												? ""
												: item.contactPhone
										}
										name="phone"
										onChange={event =>
											setPhone(event.target.value)
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
										defaultValue={
											item === null ? "" : item.lname
										}
										label="Address"
										name="lname"
										onChange={event =>
											setLocation(event.target.value)
										}
										autoComplete="location"
									/>
								</Grid>
								<Grid item xs={12}>
									Start : {"  "}
									<DateTimePicker
										onChange={date => {
											setStart(date);
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									End : {"  "}
									<DateTimePicker
										onChange={date => {
											setEnd(date);
										}}
									/>
								</Grid>
							</Grid>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								onClick={() => {
									handleClose(true);
									editEvent();
								}}
								className={classes.submit}
							>
								Update
							</Button>
						</form>
					</Container>
				</div>
			</Fade>
		</Modal>
	);
}
