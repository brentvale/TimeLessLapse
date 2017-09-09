import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import { Link } from 'react-router';

class HubIndexPhotoDisplayThumbnail extends Component{
	render(){
		let { hub} = this.props;
						
		//save for dev (production, all hubs should have at least 1 photograph)											
		if(hub.photographs.length === 0){
			return <div>Not photographs with timelapse_hub with id {hub.id}</div>
		}									
																			
		return (
			<div className="one-half-block">
				
				<div className="center-block inactive-hub"
						 style={{position:"relative"}}>
					<img src={hub.photographs[0].small_image} className="drop-shadow"/>
					<Link to={`/hubs/${hub.id}`} data-hub-id={hub.id}>
						<i className="fa fa-share-square hand-on-hover" aria-hidden="true"></i>
					</Link>
				</div>
				
			</div>
		)
	}
}
HubIndexPhotoDisplayThumbnail.PropTypes = {
	hub: PropTypes.object.isRequired,
}

export default withRouter(HubIndexPhotoDisplayThumbnail);