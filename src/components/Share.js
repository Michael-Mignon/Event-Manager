import React from "react";
import useStyles from "../css/useStyles";
import Divider from "@material-ui/core/Divider";
import {
	FacebookShareButton,
	TwitterShareButton,
	TwitterIcon,
	FacebookIcon
} from "react-share";

export default function Share(props) {
	const classes = useStyles();
	return (
		<div>
			<FacebookShareButton
				children={<FacebookIcon size={20} />}
				url={props.id}
			/>
			<TwitterShareButton
				children={<TwitterIcon size={20} />}
				url={props.id}
			/>
		</div>
	);
}
