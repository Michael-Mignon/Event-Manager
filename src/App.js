import React from "react";
import "./css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./layouts/Login.jsx";
import ManageEvents from "./layouts/ManageEvents.jsx";
import Organizations from "./layouts/Organizations.jsx";
import Account from "./layouts/Account.jsx";
import University from "./layouts/University.jsx";
import Dashboard from "./layouts/Dashboard.js";
import SuperAdmin from "./layouts/SuperAdmin.jsx";
import Admin from "./layouts/Admin.jsx";
import Comments from "./components/Comments.jsx";
import Membership from "./layouts/Membership";
import Approval from "./components/Approval";
export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route exact path="/home">
					<Dashboard />
				</Route>
				<Route path="/create">
					<ManageEvents />
				</Route>
				<Route path="/rsos">
					<Organizations />
				</Route>
				<Route path="/account">
					<Account />
				</Route>
				<Route path="/university">
					<University />
				</Route>
				<Route path="/super_admin">
					<SuperAdmin />
				</Route>
				<Route path="/admin">
					<Dashboard />
				</Route>
				<Route exact path="/approval">
					<Approval />
				</Route>
				<Route path="/comments">
					<Comments />
				</Route>
				<Route path="/membership">
					<Membership />
				</Route>
			</Switch>
		</Router>
	);
}
