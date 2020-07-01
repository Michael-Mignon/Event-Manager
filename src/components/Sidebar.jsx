import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import { withRouter, Link } from "react-router-dom";
import useStyles from "../css/useStyles";
import CreateIcon from "@material-ui/icons/Create";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SchoolIcon from "@material-ui/icons/School";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
const direct = (ext, icon, label) => {
	return (
		<Link to={ext}>
			<ListItem button>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={label} />
			</ListItem>
		</Link>
	);
};

function Sidebar() {
	const classes = useStyles();
	const role = localStorage.getItem("role");
	const dashboard = direct("/home", <DashboardIcon />, "Dashboard");
	const admin_events = direct("/create", <CreateIcon />, "Manage Events");
	const admin_rsos = direct("/rsos", <PeopleIcon />, "Browse RSOs");
	const account = direct("/account", <AccountBoxIcon />, "Your Account");
	const university = direct("/university", <SchoolIcon />, "Your University");
	const super_admin = direct(
		"super_admin",
		<AccountBalanceIcon />,
		"Manage Universities"
	);
	const approve_super = direct(
		"/approval",
		<DashboardIcon />,
		"Approve Events"
	);

	const membership = direct(
		"/membership",
		<RecordVoiceOverIcon />,
		"Your RSOs"
	);
	return (
		<List className={classes.sidebar}>
			{role !== "superadmin" ? dashboard : null}
			{role === "admin" ? admin_events : null}
			{role === "admin" || role === "user" ? admin_rsos : null}
			{account}
			{role !== "superadmin" ? university : null}
			{role === "superadmin" ? super_admin : null}
			{role === "superadmin" ? approve_super : null}
			{role !== "superadmin" ? membership : null}
		</List>
	);
}

export default withRouter(Sidebar);
