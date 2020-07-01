import React, { useEffect } from "react";
import DashCard from "./DashCard";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import IconButton from "@material-ui/core/IconButton";
import url from "../config";

export default function RSO() {
	const [RSO_list, setlist] = React.useState([]);
	const [showModal, setModal] = React.useState(false);
	const [currentRSO, setCurrentRSO] = React.useState(null);
	const base_url = url();
	const user = JSON.parse(localStorage.getItem("user"));
	const handleClose = () => {
		setModal(false);
	};

	useEffect(() => {
		fetch(base_url + "/rso/" + user.emailDomain)
			.then(r => r.json())
			.then(data => {
				console.log(data);
				setlist(data);
			});
	}, [base_url]);

	const list = RSO_list.map((item, id) => (
		<ListItem key={id} button>
			<IconButton
				onClick={() => {
					setModal(true);
					setCurrentRSO(item);
				}}
			>
				<ZoomInIcon />
			</IconButton>
			<ListItemText primary={item.rsoId} />
		</ListItem>
	));

	return (
		<DashCard
			title="RSOs"
			list={list}
			item={currentRSO}
			showModal={showModal}
			handleClose={handleClose}
			view="RSO"
		/>
	);
}
