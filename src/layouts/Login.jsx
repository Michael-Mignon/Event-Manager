import React, { useState } from "react";
import {
	Button,
	CssBaseline,
	MenuItem,
	TextField,
	Container
} from "@material-ui/core";

import { FormControlLabel, Checkbox, Link, Paper } from "@material-ui/core";
import { Grid, Typography, Modal, Backdrop, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../img/login-cover.jpg";
import { Redirect } from "react-router";
import url from "../config";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles(theme => ({
	root: {
		height: "100vh"
	},
	image: {
		backgroundImage: `url(${Image})`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center"
	},
	paper: {
		margin: theme.spacing(15, 4),
		display: "flex",
		flexDirection: "column"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(3)
	},
	submit: {
		background:
			"linear-gradient(234deg, rgba(0,51,175,1) 0%, rgba(0,151,255,1) 100%)",
		margin: theme.spacing(3, 0, 2),
		color: "#FFFF",
		fontWeight: "800"
	},
	title: {
		color: "#0097ff",
		fontWeight: "800"
	},
	subtitle: {
		fontWeight: "300",
		color: "grey"
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	paper1: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(8, 8, 6)
	}
}));

let role = "user";

export default function Login() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const classes = useStyles();

	const [newFirstName, setNewFirstName] = React.useState("");
	const [newLastName, setNewLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [newPassword, setNewPassword] = React.useState("");

	const [errorModal, toggleErrorModal] = React.useState(false);
	const [usernameTakenModal, setUsernameTakenModal] = React.useState(false);

	const [value, setValue] = React.useState("user");

	const [universities, setUniversities] = React.useState([]);
	const [selectedUniversity, setSelected] = React.useState(null);
	const base_url = url();

	const bcrypt = require("bcryptjs");
	const saltRounds = 10;

	React.useEffect(() => {
		fetch(base_url + "/university")
			.then(res => res.json())
			.then(data => {
				setUniversities(data);
			});
	}, [base_url]);

	const handleChange = event => {
		setValue(event.target.value);
	};

	if (loggedIn) {
		localStorage.setItem("role", role);
		if (role === "superadmin") {
			return <Redirect to="/super_admin" />;
		} else if (role === "admin") {
			return <Redirect to="/admin" />;
		} else if (role === "user") {
			return <Redirect to="/home" />;
		}
	}

	const login = () => {
		localStorage.clear();

		fetch(base_url + "/user/" + username)
			.then(r => r.json())
			.then(data => {
				if (data[0] !== undefined && data[0] !== null) {
					bcrypt.compare(password, data[0].password).then(res => {
						if (res !== true) {
							toggleErrorModal(true);
							setLoggedIn(false);
							return;
						} else {
							const logged_user = data[0];
							logged_user.password = password;
							localStorage.setItem(
								"user",
								JSON.stringify(logged_user)
							);

							fetch(base_url + "/admin/" + data[0].uid)
								.then(res => res.json())
								.then(admin => {
									if (
										admin[0] !== undefined &&
										admin[0] !== null
									) {
										role = "admin";
										setLoggedIn(true);
									} else {
										fetch(
											base_url +
												"/superadmin/" +
												data[0].uid
										)
											.then(res2 => res2.json())
											.then(sAdmin => {
												if (
													sAdmin[0] !== undefined &&
													sAdmin[0] !== null
												) {
													role = "superadmin";
													setLoggedIn(true);
												} else {
													role = "user";
													setLoggedIn(true);
												}
											});
									}
								});
						}
					});
				} else {
					toggleErrorModal(true);
				}
			});
	};

	const signUp = () => {
		let domain;
		let i = 0;
		let ext = "/user";
		while (i < email.length - 1 && email.charAt(i) !== "@") i++;

		if (email.charAt(i) === "@") domain = email.substring(i);
		else domain = null;

		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				uid: username,
				password: bcrypt.hashSync(password),
				emailDomain: domain,
				universityId: selectedUniversity
			})
		};
		fetch(base_url + "/user", options)
			.then(r => r.json())
			.then(data => {
				if (data.uid !== undefined) {
					setUsername(username);
					setPassword(newPassword);
					if (value === "signUp_super") {
						ext = "/superadmin";
						fetch(base_url + "" + ext, options)
							.then(res => res.json())
							.then(data => {
								login();
							});
					} else if (value === "signUp_admin") {
						ext = "/admin";
						fetch(base_url + "" + ext, options)
							.then(res => res.json())
							.then(data => {
								login();
							});
					} else {
						login();
					}
				} else {
					setUsernameTakenModal(true);
				}
			});
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Welcome to{" "}
						<span className={classes.title}>Event Manager</span>
					</Typography>

					<Typography component="h5" className={classes.subtitle}>
						Event management for universities, made easy.
					</Typography>

					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="Username"
							label="Username"
							name="Username"
							autoComplete="Username"
							onChange={event => {
								setUsername(event.target.value);
							}}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange={event => {
								setPassword(event.target.value);
							}}
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/>
						<Button
							fullWidth
							variant="contained"
							onClick={() => {
								login();
							}}
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link
									style={{ cursor: "pointer" }}
									onClick={handleOpen}
									variant="body2"
								>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Grid>
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
								Sign up
							</Typography>
							<form className={classes.form} noValidate>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											autoComplete="uname"
											name="setUsername"
											variant="outlined"
											required
											fullWidth
											id="Username"
											label="Username"
											onChange={event => {
												setUsername(event.target.value);
											}}
											autoFocus
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="email"
											label="School Email"
											name="email"
											onChange={event => {
												setEmail(event.target.value);
											}}
											autoComplete="email"
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											onChange={event => {
												setPassword(event.target.value);
											}}
											id="password"
											autoComplete="current-password"
										/>
									</Grid>
									<Grid item xs={12}>
										<FormControl
											component="fieldset"
											className={classes.formControl}
										>
											<FormLabel component="legend">
												Select Desired Actions
												(Optional)
											</FormLabel>
											<RadioGroup
												aria-label="role"
												name="role"
												value={value}
												onChange={handleChange}
											>
												<FormControlLabel
													value="signUp_admin"
													control={<Radio />}
													label="Create, Manage, and View Events"
												/>
												<FormControlLabel
													value="signUp_super"
													control={<Radio />}
													label="Create and Manage Universities"
												/>
											</RadioGroup>
										</FormControl>
									</Grid>

									<Grid item xs={12}>
										<FormLabel component="legend">
											Select University
										</FormLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={selectedUniversity}
											onChange={event => {
												setSelected(event.target.value);
											}}
											fullWidth
										>
											{universities.map((uni, id) => {
												return (
													<MenuItem
														key={id}
														value={uni.universityId}
													>
														{uni.universityId}
													</MenuItem>
												);
											})}
										</Select>
									</Grid>
								</Grid>
								<Button
									fullWidth
									disabled={
										email === "" ||
										password === "" ||
										username === ""
									}
									variant="contained"
									color="primary"
									onClick={() => signUp()}
									className={classes.submit}
								>
									Sign Up
								</Button>
							</form>
						</Container>
					</div>
				</Fade>
			</Modal>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={errorModal}
				onClose={() => {
					toggleErrorModal(false);
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={errorModal}>
					<div className={classes.paper1}>
						<Container component="main" maxWidth="xs">
							<Typography component="h1" variant="h5">
								Invalid Username or Password
							</Typography>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={() => toggleErrorModal(false)}
							>
								Retry
							</Button>
						</Container>
					</div>
				</Fade>
			</Modal>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={usernameTakenModal}
				onClose={() => {
					setUsernameTakenModal(false);
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={usernameTakenModal}>
					<div className={classes.paper1}>
						<Container component="main" maxWidth="xs">
							<Typography component="h1" variant="h5">
								Username is already Active
							</Typography>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={() => setUsernameTakenModal(false)}
							>
								Retry
							</Button>
						</Container>
					</div>
				</Fade>
			</Modal>
		</Grid>
	);
}
