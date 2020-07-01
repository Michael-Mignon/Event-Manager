import React from "react";
import StarRatings from "react-star-ratings";
import {
	TextField,
	Container,
	Typography,
	Modal,
	Backdrop,
	Fade
} from "@material-ui/core";
import useStyles from "../css/useStyles";
import CommentModal from "./CommentModal";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import url from "../config";
import SuccessfulCommentModal from "./SuccessfulCommentModal";
export default function EditComment(props) {
	const classes = useStyles();
	const base_url = url();
	const [comment, setComment] = React.useState(props.comment.text);
	const [showCommentModal, setCommentModal] = React.useState(false);
	const [commentList, setCommentList] = React.useState([]);
	const [showAllComments, toggleShowComments] = React.useState(false);
	let item = props.item;
	let title = {};
	let description = "";
	const [rating, setRating] = React.useState(props.comment.rating);
	const handleChange = event => {
		setComment(event);
	};
	const updated_comment = props.comment;
	const submitComment = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		updated_comment.text = comment;
		updated_comment.rating = rating;
		const options = {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updated_comment)
		};
		fetch(base_url + "/comment", options)
			.then(r => r.json())
			.then(data => {
				setCommentModal(true);
				props.handleClose();
			});
	};

	const deleteComment = () => {
		const options = {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(props.comment)
		};
		fetch(base_url + "/comment", options)
			.then(r => r.json())
			.then(data => {
				setCommentModal(true);
				props.handleClose();
			});
	};

	if (item !== null && item !== undefined) {
		title = item.eventName === undefined ? item.title : item.eventName;

		if (item.description !== null && item.description !== undefined) {
			description = item.description.replace(/<[^>]*>/g, "");
		}
	}
	return (
		<div>
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
					<Card className={classes.expanded_card}>
						<CardMedia
							image="/static/images/cards/contemplative-reptile.jpg"
							title="Contemplative Reptile"
						/>
						<CardContent className={classes.expanded_card}>
							<Container fixed={true}>
								<Typography
									gutterBottom
									variant="h5"
									component="h2"
								>
									{props.comment.eventId}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
								>
									{description}
								</Typography>
								<TextField
									id="standard-multiline-static"
									label="Comment:"
									multiline
									defaultValue={props.comment.text}
									rows="4"
									className={classes.textField}
									margin="normal"
									fullWidth={true}
									onChange={event =>
										handleChange(event.target.value)
									}
								/>
							</Container>
							<StarRatings
								rating={rating}
								starRatedColor="blue"
								changeRating={(rating, name) =>
									setRating(rating)
								}
								numberOfStars={5}
								name="rating"
							/>
						</CardContent>
						<Button
							onClick={() => submitComment()}
							size="small"
							color="primary"
							disabled={comment === "" || rating === -1}
						>
							Update Comment
						</Button>
						<Button
							onClick={() => deleteComment()}
							size="small"
							color="primary"
						>
							Delete Comment
						</Button>
					</Card>
				</Fade>
			</Modal>
			<SuccessfulCommentModal
				showCommentModal={showCommentModal}
				setCommentModal={setCommentModal}
			/>
		</div>
	);
}
