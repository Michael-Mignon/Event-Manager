import React from "react";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Sidebar from "./Sidebar.jsx";
import { withRouter, Link } from "react-router-dom";
import useStyles from "../css/useStyles";
import {
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	Divider,
	IconButton,
	Badge
} from "@material-ui/core";

function Header(props) {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}
					>
						{props.name}
					</Typography>
					<Link to="/">
						<IconButton
							onClick={() => {
								localStorage.clear();
							}}
							color="inherit"
						>
							<Badge color="secondary">
								<ExitToAppIcon />
							</Badge>
						</IconButton>
					</Link>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(
						classes.drawerPaper,
						!open && classes.drawerPaperClose
					)
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<Sidebar />
			</Drawer>
		</div>
	);
}

export default withRouter(Header);
