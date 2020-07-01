import React, { useEffect } from "react";
import * as rssParser from "react-native-rss-parser";
import DashCard from "./DashCard";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import LinkIcon from "@material-ui/icons/Link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

export default function RSSFeed() {
	const [events, setEvents] = React.useState([]);
	const [showModal, setModal] = React.useState(false);
	const [currentEvent, setCurrentEvent] = React.useState(null);

	const handleClose = () => {
		setModal(false);
	};

	useEffect(() => {
		fetch("https://events.ucf.edu/feed.rss")
			.then(response => response.text())
			.then(responseData => rssParser.parse(responseData))
			.then(rss => {
				setEvents(rss.items);
			});
	}, []);

	const list = events.map((item, id) => (
		<ListItem key={id} button>
			<IconButton
				onClick={() => {
					setModal(true);
					setCurrentEvent(item);
				}}
			>
				<ZoomInIcon />
			</IconButton>
			<ListItemText primary={item.title} />
			<ListItemSecondaryAction>
				<IconButton onClick={() => window.open(item.id)}>
					<LinkIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	));

	return (
		<DashCard
			title="RSS Feed"
			list={list}
			item={currentEvent}
			showModal={showModal}
			handleClose={handleClose}
		/>
	);
}
