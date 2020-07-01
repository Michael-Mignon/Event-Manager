import React from "react";
import useStyles from "../css/useStyles.js";
import {
	CssBaseline,
	Container,
	Typography,
	ListItemSecondaryAction,
	IconButton,
	Button,
	Grid
} from "@material-ui/core";
import List from "@material-ui/core/List";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Face from "@material-ui/icons/Face";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import Map from "./Map.js";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import url from "../config";
import EditComment from "./EditComment";
export default function Comments(props) {
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem("user"));
	const [location, setLocation] = React.useState();
	const [newComment, setNewComment] = React.useState("");
	const [newRating, setNewRating] = React.useState(-1);
	const [show, setShow] = React.useState(false);
	React.useEffect(() => {
		fetch(url() + "/event/" + props.event.eventId)
			.then(res => res.json())
			.then(event_data => {
				if (event_data[0] !== undefined) {
					fetch(url() + "/location/" + event_data[0].lname)
						.then(r => r.json())
						.then(location_data => {
							setLocation(location_data[0]);
						});
				}
			});
	}, []);

	const [selectedComment, setComment] = React.useState(null);
	const editComment = item => {
		setComment(item);
		setShow(true);
	};

	const commentList = props.comments.map((item, id) => (
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar> {item.rating} </Avatar>
			</ListItemAvatar>
			<ListItemText primary={item.uid} secondary={item.text} />
			{user.uid === item.uid ? (
				<ListItemSecondaryAction>
					<IconButton
						onClick={() => {
							editComment(item);
						}}
						edge="end"
						aria-label="delete"
					>
						<EditSharpIcon />
					</IconButton>
				</ListItemSecondaryAction>
			) : null}
		</ListItem>
	));

	return (
		<div className={classes.root}>
			<CssBaseline />
			<main className={classes.content}>
				<Container maxWidth="lg" className={classes.container}>
					<div className={classes.paper2}>
						<Grid item xs={12} md={6}>
							<div className={classes.description}>
								<Typography variant="h6">
									{props.event.eventId}
								</Typography>
								{}
							</div>
							{location !== undefined ? (
								<Map
									className={classes.map}
									location={location}
								/>
							) : null}
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant="p">Comments: </Typography>
							<List className={classes.rootComment}>
								{commentList}
							</List>
							<div className={classes.margin}>
								<Grid
									container
									spacing={2}
									alignItems="flex-end"
								>
									<Grid item></Grid>
								</Grid>
							</div>
						</Grid>
					</div>
					<Button
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={props.handleClose}
					>
						Go Back
					</Button>
				</Container>
				{selectedComment !== null ? (
					<EditComment
						show={show}
						handleClose={() => {
							setShow(false);
						}}
						comment={selectedComment}
					/>
				) : null}
			</main>
		</div>
	);
}
