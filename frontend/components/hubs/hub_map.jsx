import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';

class HubMap extends Component {
  constructor(){
  	super();
		this.state = {
		}
		this.placeMarker = this.placeMarker.bind(this);
  }
  componentDidMount() {
		let mapOptions = {
		  center: {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng)},
		  zoom: 15,
			mapTypeId: 'terrain',
			scrollwheel: false
		}
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
		
		let that = this;
		$.ajax({
			url: "fetch_map_image",
			method: "GET",
			success: (resp) => {
				that.placeMarker(resp.image_url);
			}
		})
  }
	
	placeMarker(photoImageUrl){
	  var image = {
	    url: photoImageUrl,
	    // This marker is 32 pixels wide by 32 pixels high.
	    size: new google.maps.Size(32, 32),
	    // The origin for this image is (0, 0).
	    origin: new google.maps.Point(0, 0),
	    // The anchor for this image is the base of the flagpole at (0, 32).
	    anchor: new google.maps.Point(0, 32)
	  };
 
	  var shape = {
	    coords: [1, 1, 1, 20, 18, 20, 18, 1],
	    type: 'poly'
	  };
	
	  this.marker = new google.maps.Marker({
	    position: {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng)},
	    map: this.map,
	    icon: image,
	    shape: shape
	  });
	}
  
  render() {
		const { windowWidth } = this.props;
		const mapWidth = (windowWidth > 800) ? 800 : windowWidth;
		const mapHeight = mapWidth * 0.6;
		
    return (
						<div>
							<div className="heading-block-container">
								<h2 className="heading-block center-block">GoogleMaps</h2>
						  </div>
							<div id="map" ref="map" className="center-block" style={{width: mapWidth, height: mapHeight}}>Map</div>
					 	</div>
    	
    );
  }
}

export default withRouter(HubMap);