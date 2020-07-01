import React from "react";
import Header from "../components/Header";
import useStyles from "../css/useStyles.js";
import { CssBaseline, Container, Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
function generate(element) {
	return [0, 1, 2].map(value =>
		React.cloneElement(element, {
			key: value
		})
	);
}

export default function SuperAdmin() {
	const classes = useStyles();
	const dense = true;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header name="Administrator" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Typography variant="h6" className={classes.title}>
								University of Central Florida
							</Typography>
							<div className={classes.demo}>
								<List dense={dense}>
									{generate(
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<FolderIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary="Student Organization"
												secondary="Description of RSO"
											/>
										</ListItem>
									)}
								</List>
							</div>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant="h6" className={classes.title}>
								Upcoming Events
							</Typography>
							<div className={classes.demo}>
								<List dense={dense}>
									{generate(
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<FolderIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary="Event Name"
												secondary="Orlando, FL"
											/>
										</ListItem>
									)}
								</List>
							</div>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}
