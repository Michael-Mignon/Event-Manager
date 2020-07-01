import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stores: [
				{ lat: props.location.lattitude, lng: props.location.longitude }
			]
		};
	}

	displayMarkers = () => {
		return this.state.stores.map((store, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: store.lat,
						lng: store.lng
					}}
					onClick={() => console.log('You clicked me!')}
				/>
			);
		});
	};

	render() {
		const mapStyles = {
			maxWidth: '538px',
			height: '200px',
			marginTop: '20px'
		};

		return (
			<Map
				google={this.props.google}
				zoom={15}
				style={mapStyles}
				className={mapStyles}
				initialCenter={{
					lat:
						(this.state.stores[0].lat === 0 &&
							this.state.stores[0].lng === 0) ||
						(this.state.stores[0].lat === null &&
							this.state.stores[0].lng === null)
							? 28.6024
							: this.state.stores[0].lat,
					lng:
						(this.state.stores[0].lat === 0 &&
							this.state.stores[0].lng === 0) ||
						(this.state.stores[0].lat === null &&
							this.state.stores[0].lng === null)
							? -81.2001
							: this.state.stores[0].lng
				}}
			>
				{this.displayMarkers()}
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: null
})(MapContainer);
