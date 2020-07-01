import React from "react";
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon
} from "react-share";
import { Typography, Modal, Backdrop, Fade } from "@material-ui/core";
import useStyles from "../css/useStyles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

export default function ExpandedUniversity(props) {
	const classes = useStyles();
	console.log(props);
	let item = props.item;
	let title = "";
	let description = "";
	let total_enroll;
	let location;
	if (item !== undefined && item !== null) {
		title = props.item.uname;

		if (item.description !== undefined && item.description !== null) {
			description = item.description;
			total_enroll = item.numStudents;
			location = item.lname;
		}
	}

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
				<Card className={classes.expanded_card}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image="/static/images/cards/contemplative-reptile.jpg"
							title="Contemplative Reptile"
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="h2"
							>
								{title}
							</Typography>
							<Typography
								gutterBottom
								variant="body2"
								component="p"
							>
								Location: {location}
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
							>
								{description}
							</Typography>
							<Typography
								gutterBottom
								variant="body2"
								component="p"
							>
								Total Enrollment: {total_enroll}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<FacebookShareButton
							url="localhost:3001"
							children={<FacebookIcon size={20} />}
						/>
						<TwitterShareButton
							url="localhost:3001"
							children={<TwitterIcon size={20} />}
						/>
						<Button size="small" color="primary">
							Join University
						</Button>
					</CardActions>
				</Card>
			</Fade>
		</Modal>
	);
}
