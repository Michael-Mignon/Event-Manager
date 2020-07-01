import React from "react";
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon
} from "react-share";
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
export default function ExpandedEvent(props) {
	const classes = useStyles();
	const base_url = url();
	const [comment, setComment] = React.useState("");
	const [showCommentModal, setCommentModal] = React.useState(false);
	const [commentList, setCommentList] = React.useState([]);
	const [showAllComments, toggleShowComments] = React.useState(false);
	let item = props.item;
	let title = {};
	const [newItem, setItem] = React.useState(props.item);
	let description = "";

	const [rating, setRating] = React.useState(-1);
	const handleChange = event => {
		setComment(event);
	};

	React.useEffect(() => {
		if (props.item !== null) {
			fetch(base_url + "/comment/event/" + props.item.eventId)
				.then(res => res.json())
				.then(data => {
					setCommentList(data);
					setItem(props.item);
				});
		}
	});

	const submitComment = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				uid: user.uid,
				eventId: item.eventId,
				commentId: 0,
				text: comment,
				rating: rating
			})
		};
		fetch(base_url + "/comment", options)
			.then(r => r.json())
			.then(data => {
				setCommentModal(true);
				setComment("");
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
									{newItem !== null
										? newItem.eventName
										: null}
								</Typography>

								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
								>
									Description:{" "}
									{newItem !== null
										? newItem.description
										: null}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
								>
									Contact Phone:{" "}
									{newItem !== null
										? newItem.contactPhone
										: null}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
								>
									Contact Email:{" "}
									{newItem !== null
										? newItem.contactEmail
										: null}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
								>
									Start Time:{" "}
									{newItem !== null
										? newItem.startTime
										: null}
								</Typography>
								<TextField
									id="standard-multiline-static"
									label="Comment:"
									multiline
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
							Submit Comment
						</Button>
						<CardActions>
							<FacebookShareButton
								url={"http://localhost:3000/home"}
								children={<FacebookIcon size={20} />}
							/>
							<TwitterShareButton
								url={"http://localhost:3000/home"}
								children={<TwitterIcon size={20} />}
							/>
							<Button
								onClick={() => toggleShowComments(true)}
								size="small"
								color="primary"
							>
								More Information
							</Button>
						</CardActions>
					</Card>
				</Fade>
			</Modal>
			<SuccessfulCommentModal
				showCommentModal={showCommentModal}
				setCommentModal={setCommentModal}
			/>
			<CommentModal
				event={item}
				show={showAllComments}
				comments={commentList}
				handleClose={() => {
					toggleShowComments(false);
				}}
			/>
		</div>
	);
}
