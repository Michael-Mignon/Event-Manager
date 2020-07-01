import React from "react";
import { Button, Container, Backdrop, ListItemText } from "@material-ui/core";
import {
	Typography,
	Avatar,
	Modal,
	Fade,
	ListItem,
	IconButton
} from "@material-ui/core";
import useStyles from "../css/useStyles";
import DashCard from "./DashCard";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import RemoveIcon from "@material-ui/icons/Remove";
import Comments from "./Comments";
import Face from "@material-ui/icons/Face";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

export default function CommentModal(props) {
	const [editComment, setEditComment] = React.useState(false);
	const classes = useStyles();
	const comments = props.comments.filter(item => item.text !== null);
	const user = JSON.parse(localStorage.getItem("user"));
	const list = comments.map((item, id) => (
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar>
					{" "}
					<Face />{" "}
				</Avatar>
			</ListItemAvatar>
			<IconButton onClick={() => {}}>
				{item.uid === user.uid ? <ZoomInIcon /> : <RemoveIcon />}
			</IconButton>
			<ListItemText primary={item.text} secondary={item.text} />
		</ListItem>
	));
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={props.show}
			onClose={() => {
				props.handleClose();
			}}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
		>
			<Fade in={props.show}>
				<div className={classes.paper1}>
					<Comments
						handleClose={props.handleClose}
						comments={comments}
						event={props.event}
					/>
				</div>
			</Fade>
		</Modal>
	);
}
