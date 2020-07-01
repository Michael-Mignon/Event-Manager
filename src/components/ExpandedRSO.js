import React from "react";
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon
} from "react-share";
import {
	Typography,
	ListItem,
	List,
	ListItemText,
	Modal,
	Backdrop,
	TextField,
	Fade
} from "@material-ui/core";
import useStyles from "../css/useStyles";
import url from "../config";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
export default function ExpandedRSO(props) {
	const classes = useStyles();

	let item = props.item;
	let title = "";
	let description = "";
	const user = JSON.parse(localStorage.getItem("user"));
	const [members, setMembers] = React.useState([]);
	const [isEditing, setEditing] = React.useState(false);
	const [newTitle, setNewTitle] = React.useState("");
	if (item !== undefined && item !== null) {
		title = props.item.rsoId;

		description = item.status;
	}

	React.useEffect(() => {
		const id = item === null ? null : item.rsoId;
		fetch(url() + "/rsomembership/rso/" + id)
			.then(res => res.json())
			.then(data => {
				setMembers(data);
			});
	});

	const joinRso = () => {
		const body = {
			uid: user.uid,
			rsoId: item.rsoId
		};

		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		};

		fetch(url() + "/rsomembership", options)
			.then(res => {
				res.json();
			})
			.then(data => {
				alert("Successfully Joined RSO");
				props.handleClose();
			});
	};

	const list = members.map((item, id) => (
		<ListItem alignItems="flex-start">
			<ListItemText secondary={item.uid} />
		</ListItem>
	));

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
							{isEditing === true &&
							item !== null &&
							item.uid === user.uid ? (
								<TextField
									fullWidth
									disabled={!isEditing}
									onChange={event => {
										setNewTitle(event.target.value);
									}}
									id="standard-required"
									defaultValue={title}
									className={classes.textField}
									label="RSO Name"
								/>
							) : null}
							{!isEditing ? (
								<Typography
									gutterBottom
									variant="h5"
									component="h2"
								>
									{title}
								</Typography>
							) : null}
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								gutterBottom
							>
								Status: {description}
							</Typography>
							<Typography
								color="textSecondary"
								component="p"
								variant="p"
							>
								Members:{" "}
							</Typography>
							<List className={classes.rootComment}>{list}</List>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<FacebookShareButton
							url="www.facebook.com"
							children={<FacebookIcon size={20} />}
						/>
						<TwitterShareButton
							url="www.facebook.com"
							children={<TwitterIcon size={20} />}
						/>
						<Button
							onClick={() => {
								joinRso();
							}}
							size="small"
							color="primary"
						>
							Join RSO
						</Button>
						{item !== null && item.uid === user.uid ? (
							<Button
								onClick={() => {
									if (!isEditing) {
										setEditing(true);
									} else {
										// editRso();
										setEditing(false);
									}
								}}
								size="small"
								color="primary"
							>
								{isEditing ? "Save" : "Edit Name"}
							</Button>
						) : null}
						{isEditing ? (
							<Button
								onClick={() => {
									setEditing(false);
								}}
								size="small"
								color="primary"
							>
								Cancel
							</Button>
						) : null}
					</CardActions>
				</Card>
			</Fade>
		</Modal>
	);
}
