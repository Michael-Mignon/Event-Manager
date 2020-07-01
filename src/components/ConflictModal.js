import React from "react";
import { Button, Container, Backdrop } from "@material-ui/core";
import { Typography, Modal, Fade } from "@material-ui/core";
import useStyles from "../css/useStyles";

export default function SuccessfulCommentModal(props) {
	const classes = useStyles();
	console.log(props.item);

	const convertDate = date => {
		if (date === null) return null;
		const year = date.substring(0, 4);
		const month = date.substring(5, 7);
		const day = date.substring(8, 10);
		const hour = date.substring(12, 14);
		const mins = date.substring(14, 16);

		return month + "/" + day + "/" + year + ", " + hour + "" + mins;
	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={props.show}
			onClose={() => {
				props.close();
			}}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
		>
			<Fade in={props.show}>
				<div className={classes.paper1}>
					<Container component="main" maxWidth="xs">
						<Typography gutterBottom variant="h5" component="h2">
							There is already an event at this location at that
							time!
						</Typography>
						{props.item !== null ? (
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								gutterBottom
							>
								Event Name: {props.item.eventId}
							</Typography>
						) : null}
						{props.item !== null ? (
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								gutterBottom
							>
								Location: {props.item.lname}
							</Typography>
						) : null}
						{props.item !== null ? (
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								gutterBottom
							>
								Start Time: {convertDate(props.item.startTime)}
							</Typography>
						) : null}
						{props.item !== null ? (
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								gutterBottom
							>
								End Time: {convertDate(props.item.endTime)}
							</Typography>
						) : null}
						<Button
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={() => props.close()}
						>
							Go Back
						</Button>
					</Container>
				</div>
			</Fade>
		</Modal>
	);
}
