import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { CssBaseline, Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../css/useStyles";
import Sidebar from "./Sidebar";
import clsx from "clsx";
import Header from "./Header";
import url from "../config";
import CloseIcon from "@material-ui/icons/Close";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import CheckIcon from "@material-ui/icons/Check";
// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2)
//   }
// }));

function generate(element) {
	return [0, 1, 2].map(value =>
		React.cloneElement(element, {
			key: value
		})
	);
}

export default function InteractiveList() {
	const user = JSON.parse(localStorage.getItem("user"));
	const classes = useStyles();
	const [dense, setDense] = React.useState(false);
	const [secondary, setSecondary] = React.useState(false);
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const [publicEvents, setPublicEvents] = React.useState([]);
	const [privateEvents, setPrivateEvents] = React.useState([]);
	React.useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		console.log(user);
		fetch(url() + "/private_event/superadmin/" + user.uid)
			.then(res => res.json())
			.then(data => {
				setPrivateEvents(
					data.filter(item => item.superAdminUid === null)
				);
			});

		fetch(url() + "/public_event/superadmin/" + user.uid)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setPublicEvents(
					data.filter(item => item.superAdminUid === null)
				);
			});
	}, []);

	const approveEvent = (item, type) => {
		let ext = "";
		if (type === "public") {
			ext = "/public_event/activate";
		} else if (type === "private") {
			ext = "/private_event/activate";
		}

		console.log(ext);

		const body = {
			superAdminUid: user.uid,
			eventId: item.eventId
		};

		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		};

		fetch(url() + ext, options)
			.then(res => {
				res.json();
			})
			.then(data => {
				window.location.reload();
			});
	};

	const denyEvent = item => {
		const body = {
			eventId: item.eventId
		};

		const options = {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		};

		fetch(url() + "/event", options)
			.then(res => {
				res.json();
			})
			.then(data => {
				console.log(data);
				window.location.reload();
			});
	};

	const pub_list = publicEvents.map((item, id) => (
		<ListItem key={id} button>
			<IconButton onClick={() => {}}>
				<ZoomInIcon />
			</IconButton>
			<ListItemText primary={item.eventId} />
			<ListItemSecondaryAction>
				<IconButton onClick={() => approveEvent(item, "public")}>
					<CheckIcon />
				</IconButton>
				<IconButton onClick={() => denyEvent(item)}>
					<CloseIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	));

	const private_list = privateEvents.map((item, id) => (
		<ListItem key={id} button>
			<IconButton onClick={() => {}}>
				<ZoomInIcon />
			</IconButton>
			<ListItemText primary={item.eventId} />
			<ListItemSecondaryAction>
				<IconButton onClick={() => approveEvent(item, "private")}>
					<CheckIcon />
				</IconButton>
				<IconButton onClick={() => denyEvent(item)}>
					<CloseIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	));

	console.log(publicEvents);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header name="Approve Events" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid item xs={12} md={8} lg={9}>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							className={classes.title}
						>
							Pending Public Events
						</Typography>
						<Paper className={fixedHeightPaper}>
							<List>{pub_list}</List>
						</Paper>
					</Grid>
				</Container>
				<Container maxWidth="lg" className={classes.container}>
					<Grid item xs={12} md={8} lg={9}>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							className={classes.title}
						>
							Pending Private Events
						</Typography>
						<Paper className={fixedHeightPaper}>
							<List>{private_list}</List>
						</Paper>
						{/* Icon here*/}
					</Grid>
				</Container>
			</main>
		</div>
	);
}
