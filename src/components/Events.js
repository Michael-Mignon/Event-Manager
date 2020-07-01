import React, { useEffect } from "react";
import DashCard from "./DashCard";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import LinkIcon from "@material-ui/icons/Link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import url from "../config";
import Select from "@material-ui/core/Select";
import {
	makeStyles,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	InputLabel,
	Input,
	FormControl,
	MenuItem,
	FormHelperText
} from "@material-ui/core";
import useStyles from "../css/useStyles";
export default function Events(props) {
	const [events, setEvents] = React.useState([]);
	const [allEvents, setAllEvents] = React.useState([]);
	const [showModal, setModal] = React.useState(false);
	const [currentEvent, setCurrentEvent] = React.useState(null);
	const base_url = url();
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();
	const [universities, setUniversities] = React.useState([]);
	const [universitySelection, setUniversitySelection] = React.useState("all");
	const handleClose = () => {
		setModal(false);
	};
	const user = JSON.parse(localStorage.getItem("user"));
	const ext =
		props.status === "private"
			? "/private_event/" + user.uid
			: "/public_event/activate";

	const temp = props.status === "private" ? "Private" : "Public";
	const title = "Upcoming " + temp + " Events";
	useEffect(() => {
		fetch(base_url + "/event")
			.then(r => r.json())
			.then(data => {
				let intersect = [];
				let unis = [];
				fetch(base_url + ext)
					.then(res => res.json())
					.then(publicEvent => {
						for (let i = 0; i < data.length; i++) {
							for (let j = 0; j < publicEvent.length; j++) {
								if (
									data[i].eventId === publicEvent[j].eventId
								) {
									intersect.push(data[i]);
								}
							}
						}

						for (let i = 0; i < publicEvent.length; i++) {
							if (!unis.includes(publicEvent[i].universityId)) {
								unis.push(publicEvent[i].universityId);
							}
						}
						setUniversities(unis);
						setAllEvents(publicEvent);
						setEvents(intersect);
					});
			});
	}, [base_url]);

	const handleChange = event => {
		setUniversitySelection(event.target.value);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleDialogClose = () => {
		setOpen(false);
	};

	const dialog = makeStyles(theme => ({
		container: {
			display: "flex",
			flexWrap: "wrap"
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120
		}
	}));

	const style = dialog();

	const uniList = universities.map((item, id) => {
		return (
			<option key={id} value={item}>
				{item}
			</option>
		);
	});

	const search =
		props.status === "public" ? (
			<div>
				<Button variant="outlined" onClick={handleClickOpen}>
					Sort By University
				</Button>
				<Dialog
					disableBackdropClick
					disableEscapeKeyDown
					open={open}
					onClose={handleDialogClose}
				>
					<DialogTitle>Select University</DialogTitle>
					<DialogContent>
						<form className={style.container}>
							<FormControl className={style.formControl}>
								<InputLabel htmlFor="demo-dialog-native">
									University
								</InputLabel>
								<Select
									native
									value={universitySelection}
									onChange={handleChange}
									input={<Input id="demo-dialog-native" />}
								>
									<option value={"all"}>All</option>
									{uniList}
								</Select>
							</FormControl>
						</form>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								setOpen(false);
							}}
							color="primary"
						>
							Cancel
						</Button>
						<Button onClick={handleDialogClose} color="primary">
							Ok
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		) : null;

	const list_to_render =
		universitySelection === "all"
			? allEvents
			: allEvents.filter(
					item => item.universityId === universitySelection
			  );
	const list = list_to_render.map((item, id) => (
		<ListItem key={id} button>
			<IconButton
				onClick={() => {
					setModal(true);
					fetch(base_url + "/event/" + item.eventId)
						.then(r => r.json())
						.then(items => {
							setCurrentEvent(items[0]);
							console.log(items);
						});
					// setCurrentEvent(item);
				}}
			>
				<ZoomInIcon />
			</IconButton>
			<ListItemText primary={item.eventId} />
			<ListItemSecondaryAction>
				<IconButton
					disabled={item.id === undefined}
					onClick={() => window.open(item.id)}
				>
					<LinkIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	));

	return (
		<DashCard
			search={search}
			title={title}
			list={list}
			item={currentEvent}
			showModal={showModal}
			handleClose={handleClose}
		/>
	);
}
