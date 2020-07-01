import React from "react";
import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Check from "@material-ui/icons/Check";
import FilterList from "@material-ui/icons/FilterList";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import ResetSearch from "@material-ui/icons/Clear";
import Clear from "@material-ui/icons/Clear";
import Remove from "@material-ui/icons/Remove";
import SortArrow from "@material-ui/icons/ArrowUpward";
import url from "../config";

export default function MaterialTableDemo() {
	const user = JSON.parse(localStorage.getItem("user"));
	const base_url = url();
	const [state, setState] = React.useState({
		columns: [
			{ title: "Name", field: "uname" },
			{ title: "Location", field: "lname", editable: "onAdd" },
			{ title: "# of Students", field: "numStudents", type: "numeric" },
			{ title: "Description", field: "description" }
		],
		data: []
	});

	React.useEffect(() => {
		fetch(base_url + "/university")
			.then(r => r.json())
			.then(newData => {
				const user_uni = newData.filter(uni => uni.uid === user.uid);
				const newState = { columns: state.columns, data: user_uni };
				setState(newState);
			});
	}, [base_url, state.columns, user.uid]);

	const addRow = newData => {
		console.log(newData);
		newData.universityId = newData.uname;
		newData.uid = user.uid;

		fetch(base_url + "/location/" + newData.lname)
			.then(r => r.json())
			.then(data => {
				if (data[0] === undefined || data[0] === null) {
					const api_url =
						"https://maps.googleapis.com/maps/api/geocode/json?address=" +
						newData.lname +
						"&key=AIzaSyAv9NYTJ-KjN4KoCO_BLQP_SspzXmTkeA4";
					let newLocation = {
						lname: newData.lname,
						address: "",
						lattitude: 0,
						longitude: 0
					};
					fetch(api_url)
						.then(res => res.json())
						.then(location_data => {
							if (
								location_data !== undefined &&
								location_data !== null &&
								location_data.status === "OK"
							) {
								const results = location_data.results;

								newLocation.address =
									location_data.results[0].formatted_address;
								newLocation.lattitude =
									results[0].geometry.location.lat;
								newLocation.longitude =
									results[0].geometry.location.lng;

								const location_options = {
									method: "POST",
									headers: {
										Accept: "application/json",
										"Content-Type": "application/json"
									},
									body: JSON.stringify(newLocation)
								};
								fetch(base_url + "/location", location_options)
									.then(add_res => add_res.json())
									.then(adding_location => {
										console.log(adding_location);
										const options = {
											method: "POST",
											headers: {
												Accept: "application/json",
												"Content-Type":
													"application/json"
											},
											body: JSON.stringify(newData)
										};
										fetch(base_url + "/university", options)
											.then(r => r.json())
											.then(data => {});
									});
							}
						});
				} else {
					const options = {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json"
						},
						body: JSON.stringify(newData)
					};
					fetch(base_url + "/university", options)
						.then(r => r.json())
						.then(data => {});
				}
			});
	};

	const editRow = newData => {
		const options = {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newData)
		};
		fetch(base_url + "/university", options)
			.then(res => res.json())
			.then(data => {
				fetch(base_url + "/university")
					.then(r => r.json())
					.then(newList => {
						const nList = newList.filter(
							uni => uni.uid === user.uid
						);
						setState({ columns: state.columns, data: nList });
					});
			});
	};

	const removeRow = oldData => {
		const options = {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(oldData)
		};

		fetch(base_url + "/university", options)
			.then(res => res.json())
			.then(data => {
				const newState = {
					columns: state.columns,
					data: state.data.filter(uni => uni.unname !== oldData.uname)
				};
				setState(newState);
			});
	};

	const tempData = state.data;
	const tempState = state;

	return (
		<MaterialTable
			title="Universities"
			icons={{
				ViewColumn: ViewColumn,
				Delete: Delete,
				Filter: FilterList,
				FirstPage: FirstPage,
				LastPage: LastPage,
				NextPage: ChevronRight,
				PreviousPage: ChevronLeft,
				Search: Search,
				DetailPanel: ChevronRight,
				Add: Add,
				Edit: Edit,
				ResetSearch: ResetSearch,
				Clear: Clear,
				Check: Check,
				ThirdStateCheck: Remove,
				SortArrow: SortArrow
			}}
			columns={tempState.columns}
			data={tempData}
			editable={{
				onRowAdd: newData =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							setState(prevState => {
								const data = [...prevState.data];
								data.push(newData);
								addRow(newData);
								return { ...prevState, data };
							});
						}, 600);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							if (oldData) {
								setState(prevState => {
									const data = [tempState.data];
									data[data.indexOf(oldData)] = newData;
									editRow(newData);
									const newState = {
										columns: tempState.columns,
										data: data
									};
									return { newState, data };
								});
							}
						}, 600);
					}),
				onRowDelete: oldData => {
					return new Promise(resolve => {
						setTimeout(() => {
							resolve();
							setState(prevState => {
								const data = [state.data];
								data.splice(data.indexOf(oldData), 1);
								removeRow(oldData);
								const newList = tempData.splice(
									data.indexOf(oldData),
									1
								);
								return { newList, data };
							});
						}, 600);
					});
				}
			}}
		/>
	);
}
