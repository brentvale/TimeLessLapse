import React from 'react';

import {Link} from 'react-router';
import HubIndexListItem from './hub_index_list_item';
import HubMap from './hub_map';
import HubShowPhotoDisplay from './hub_show_photo_display';
import UserInfo from '../users/info';

//GLOBAL VARIABLES
import { tabletBreakPoint } from '../../util/global_variables';

class HubShow extends React.Component{
	constructor(){
		super();
		this.state = {
			windowWidth: window.innerWidth
		}
		this.saveHubName = this.saveHubName.bind(this);
		this.changeWindowSize = this.changeWindowSize.bind(this);
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.changeWindowSize);
		this.props.requestHub(this.props.hubId);
		this.props.requestCurrentUser();
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.changeWindowSize);
	}
	
	changeWindowSize(){
		this.setState({windowWidth: window.innerWidth})
	}

	saveHubName(hubName, callback){
		this.props.updateHub({hub: this.props.hub, hubName: hubName, callback: callback});
	}
	
	render(){
		let { hub, currentUser } = this.props;
		
		if(!hub || !currentUser){
			return <div>Fetching Data...</div>
		}
		let spanKlass = "bold";
		let that = this;
		
		let titleEditingField = <h2 className="heading-block center-block">{hub.hub_name}</h2>;
		// if(this.state.editingTitle){
// 			titleEditingField = <h2 className="heading-block">{hub.hub_name}</h2>;
// 		} else {
// 			titleEditingField = (this.state.editingHubName) ? <input style={{marginTop: "0", marginBottom: "0.5em", display:"block", fontSize: "2em", width: "12em", height: "2em", textAlign:"center"}}
// 																																			 onFocus={this.handleFocus}
// 																																			 onKeyDown={this.handleKeyPress}
// 																																			 className="center-block"
// 																																			 value={this.state.nameField}
// 																																			 onChange={this.handleChange} /> :
// 																												<h2 className="heading-block" onClick={this.changeHubName}>{hub.hub_name}</h2>;
// 		}
		
		return(
			<div>
				<UserInfo currentUser={currentUser}/>
			
				<div className="page-block page-block-border center-block">
					<div className="heading-block-container">
						<Link to={"/"}>
							<i className="fa fa-home hand-on-hover" aria-hidden="true"></i>
						</Link>
						{titleEditingField}
						<span>Edit</span>
					</div>
	
					<HubIndexListItem hub={hub} windowWidth={this.state.windowWidth}/>
					
					<HubMap lat={hub.latitude} lng={hub.longitude} windowWidth={this.state.windowWidth}/>
		
					<div className="heading-block-container">
						<h2 className="heading-block center-block"><strong>{hub.photographs.length}</strong> Photos to create <strong>{hub.hub_name}</strong> Timelapse</h2>
					</div>
					{hub.photographs.map((photo) => {
						return <HubShowPhotoDisplay key={photo.id} photo={photo} windowWidth={this.state.windowWidth} spanKlass={spanKlass}/>
					})}
				</div>
				
			</div>)
	}
}

export default HubShow;