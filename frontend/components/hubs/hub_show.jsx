import React from 'react';

import {Link} from 'react-router';
import HubIndexListItem from './hub_index_list_item';
import TakePhotoLink from '../shared/links/take_photo_link';
import YourHubsLink from '../shared/links/your_hubs_link';
import HubMap from './hub_map';

class HubShow extends React.Component{
	constructor(){
		super();
		this.state = {
			
		}
		this.saveHubName = this.saveHubName.bind(this);
	}
	componentDidMount(){
		this.props.requestHub(this.props.hubId);
	}
	
	saveHubName(hubName, callback){
		this.props.updateHub({hub: this.props.hub, hubName: hubName, callback: callback});
	}
	
	render(){
		let { hub } = this.props;
		
		if(!hub){
			return <div>Fetching Hub</div>
		}
		
		return(
			<div>
				<TakePhotoLink />
				<YourHubsLink />
				<div className="col-xs-12" style={{paddingBottom: "2em", marginBottom: "4em"}}>
					<div className="col-xs-12 col-sm-6">
						<HubIndexListItem hub={hub} klass="col-xs-12 align-center" onIndexView={false} saveHubName={this.saveHubName}/>
					</div>
					<div className="col-xs-12 col-sm-6">
						<HubMap lat={hub.latitude} lng={hub.longitude}/>
					</div>
				</div>
				
				<div className="col-xs-12">
					{hub.photographs.map((photo) => {
						return <div className="col-xs-12" key={photo.id} style={{textAlign:"center", marginBottom: "4em"}}>
											<img src={photo.small_image} style={{height:"300px", width:"400px"}} className="drop-shadow"/>
											<p style={{marginTop: "1em"}}>latitude: {photo.latitude}</p>
											<p>longitude: {photo.longitude}</p>
											<p>rotation: {photo.rotation}</p>
											<p>created date: {photo.created_at.slice(0,10)}</p>
									 </div>
					})}
				</div>
			</div>)
	}
}

export default HubShow;