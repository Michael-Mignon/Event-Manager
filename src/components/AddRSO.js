import React, { useEffect } from "react";
import DashCard from "./DashCard";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import LinkIcon from "@material-ui/icons/Link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import url from "../config";
import useStyles from "../css/useStyles";
import AddIcon from "@material-ui/icons/Add";
import ExpandedRSO from "../components/ExpandedRSO";
import {
	Container,
	Avatar,
	Card,
	CardHeader,
	CardActions,
	CardMedia,
	Typography,
	Fab,
	Grid,
	Button,
	Backdrop,
	TextField,
	Modal,
	CardContent,
	Fade
} from "@material-ui/core";
export default function AddRSO(props) {
	const open = props.open;
	const handleClose = props.handleClose;
	const classes = useStyles();
	const base_url = url();
	const user = JSON.parse(localStorage.getItem("user"));
	const [rsoName, setRsoName] = React.useState("");
	let rso_to_add = {
		status: "inactive",
		uid: user.uid,
		rsoId: rsoName
	};

	const addRso = () => {
		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(rso_to_add)
		};

		fetch(base_url + "/rso", options)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				alert("Joined RSO");
				handleClose();
			});
	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
		>
			<Fade in={open}>
				<div className={classes.paper1}>
					<Container component="main" maxWidth="xs">
						<Typography component="h1" variant="h5">
							Create RSO
						</Typography>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										autoComplete="rsoId"
										name="rsoId"
										variant="outlined"
										required
										fullWidth
										id="rsoId"
										label="RSO Name"
										autoFocus
										onChange={event => {
											setRsoName(event.target.value);
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Domain"
										name="email"
										autoComplete="email"
										disabled
										defaultValue={user.emailDomain}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="university"
										disabled
										defaultValue={user.universityId}
										label="University"
										name="university"
										autoComplete="university"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="lname"
										label="Administrator"
										name="lname"
										disabled
										defaultValue={user.uid}
										autoComplete="location"
									/>
								</Grid>
							</Grid>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								disabled={rso_to_add.rsoId === ""}
								className={classes.submit}
								onClick={() => addRso()}
							>
								Create
							</Button>
						</form>
					</Container>
				</div>
			</Fade>
		</Modal>
	);
}
