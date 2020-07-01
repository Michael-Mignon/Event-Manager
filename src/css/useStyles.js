import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},

	rootComment: {
		width: "100%",
		height: "35vh",
		overflow: "auto",
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: "inline"
	},
	toolbar: {
		paddingRight: 24 // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	sidebar: {
		height: "100vh"
	},
	menuButton: {
		marginRight: 36
	},
	menuButtonHidden: {
		display: "none"
	},
	title: {
		flexGrow: 1
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9)
		}
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		float: "left",
		flexGrow: 1,
		height: "100vh",
		overflow: "auto"
	},
	expanded_card: {
		width: 700,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		jusifyContent: "center"
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4)
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column"
	},
	fixedHeight: {
		height: 240
	},
	map: {
		display: "block"
	},
	modal1: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
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
		padding: theme.spacing(4, 4),
		maxHeight: "82vh",
		minWidth: "80%"
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
	cardMedia: {
		paddingTop: "56.25%" // 16:9
	},
	media: {
		width: 700
	},
	cardContent: {
		flexGrow: 1
	},
	fab: {
		float: "right"
	},
	eventTitle: {
		margin: "0 50px 20px"
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(3)
	},
	submit: {
		background:
			"linear-gradient(234deg, rgba(0,51,175,1) 0%, rgba(0,151,255,1) 100%)",
		margin: theme.spacing(3, 0, 2),
		color: "#FFFF"
	},
	left: {
		display: "flex"
	},
	margin: {
		margin: theme.spacing(3)
	},
	submitComment: {
		float: "right",
		background:
			"linear-gradient(234deg, rgba(0,51,175,1) 0%, rgba(0,151,255,1) 100%)",
		margin: theme.spacing(0, 0, 0, 3),
		color: "#FFFF",
		fontWeight: "600"
	},
	description: {
		paddingRight: "30px",
		maxHeight: "300px",
		overflow: "auto",
		fontWeight: "800"
	},
	rootComment: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: "inline"
	},
	paper2: {
		display: "flex",
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(8, 8, 6)
	},
	left: {
		display: "flex"
	},
	margin: {
		margin: theme.spacing(3)
	},
	submitComment: {
		float: "right",
		background:
			"linear-gradient(234deg, rgba(0,51,175,1) 0%, rgba(0,151,255,1) 100%)",
		margin: theme.spacing(0, 0, 0, 3),
		color: "#FFFF",
		fontWeight: "600"
	},
	rootComment: {
		width: "100%",
		height: "35vh",
		overflow: "auto",
		backgroundColor: theme.palette.background.paper
	}
}));

export default useStyles;
