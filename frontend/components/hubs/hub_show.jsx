import React from 'react';

import {Link} from 'react-router';
import HubIndexListItem from './hub_index_list_item';
import TakePhotoLink from '../shared/links/take_photo_link';
import YourHubsLink from '../shared/links/your_hubs_link';
import HubMap from './hub_map';
import HubShowPhotoDisplay from './hub_show_photo_display';

//GLOBAL VARIABLES
import { tabletBreakPoint } from '../../util/global_variables';

class HubShow extends React.Component{
	constructor(){
		super();
		this.state = {
			lessThanTabletBreakSize: window.innerWidth < tabletBreakPoint
		}
		this.saveHubName = this.saveHubName.bind(this);
		this.changeStateSizeIfBreakpointReached = this.changeStateSizeIfBreakpointReached.bind(this);
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.changeStateSizeIfBreakpointReached);
		this.props.requestHub(this.props.hubId);
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}

	changeStateSizeIfBreakpointReached(){
		if(window.innerWidth < tabletBreakPoint){
			this.setState({lessThanTabletBreakSize: true});
		} else {
			this.setState({lessThanTabletBreakSize: false});
		}
	}

	saveHubName(hubName, callback){
		this.props.updateHub({hub: this.props.hub, hubName: hubName, callback: callback});
	}
	
	render(){
		let { hub } = this.props;
		
		if(!hub){
			return <div>Fetching Hub</div>
		}
		let spanKlass = "bold";
		let that = this;
		
		
		debugger
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
						return <HubShowPhotoDisplay key={photo.id} photo={photo} lessThanTabletBreakSize={that.state.lessThanTabletBreakSize} spanKlass={spanKlass}/>
					})}
				</div>
			</div>)
	}
}

export default HubShow;