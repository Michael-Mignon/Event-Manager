import React from "react";
import { Button, Container, Backdrop } from "@material-ui/core";
import { Typography, Modal, Fade } from "@material-ui/core";
import useStyles from "../css/useStyles";

export default function SuccessfulCommentModal(props) {
	const classes = useStyles();

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={props.showCommentModal}
			onClose={() => {
				props.setCommentModal(false);
			}}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
		>
			<Fade in={props.showCommentModal}>
				<div className={classes.paper1}>
					<Container component="main" maxWidth="xs">
						<Typography variant="p">Comment Successful</Typography>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={() => props.setCommentModal(false)}
						>
							Go Back
						</Button>
					</Container>
				</div>
			</Fade>
		</Modal>
	);
}
