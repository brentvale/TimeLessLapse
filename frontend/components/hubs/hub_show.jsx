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
			windowWidth: window.innerWidth,
			editingTitle: false,
			nameField: ""
		}
		this.saveHubName = this.saveHubName.bind(this);
		this.changeWindowSize = this.changeWindowSize.bind(this);
		this.changeHubName = this.changeHubName.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.changeWindowSize);
		this.props.requestHub(this.props.hubId);
		this.props.requestCurrentUser();
		this.props.requestMainImages();
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.hub){
			this.setState({nameField: nextProps.hub.hub_name});
		}	
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.changeWindowSize);
	}
	
	changeHubName(){
		this.setState({editingTitle: true});
	}
	
	changeWindowSize(){
		this.setState({windowWidth: window.innerWidth})
	}
	
	handleChange(property){
		return (e) => {
			this.setState({
				[property] : e.currentTarget.value
			})
		}
	}

	saveHubName(){
		this.props.updateHub({hub: this.props.hub, hubName: this.state.nameField}).then(this.setState({editingTitle: false}));
	}
	
	render(){
		let { hub, currentUser, homePage, mainImages } = this.props;
		
		if(!hub || (!currentUser && !homePage)){
			return <div>Fetching Data...</div>
		}
		let spanKlass = "bold";
		let that = this;
		
		let titleEditingField;
		
		titleEditingField = (this.state.editingTitle) ? <input autoFocus
																													 className="center-block heading"
																													 value={this.state.nameField}
																													 onChange={this.handleChange("nameField")} /> :
																											<h2 className="heading-block center-block">{hub.hub_name}</h2>;
																											
		let spanEditOrSave = (this.state.editingTitle) ? <span onClick={this.saveHubName} className={"hand-on-hover"}>Save</span> : <span onClick={this.changeHubName} className={"hand-on-hover"}>Edit</span>;
		
		let currentUserDisplay = (currentUser) ? <UserInfo currentUser={currentUser}/> : "";
		return(
			<div>
				{ currentUserDisplay }
			
				<div className="page-block page-block-border center-block">
					<div className="heading-block-container">
						<Link to={"/"}>
							<i className="fa fa-home hand-on-hover" aria-hidden="true"></i>
						</Link>
						{titleEditingField}
						{spanEditOrSave}
					</div>
	
					<HubIndexListItem hub={hub} windowWidth={this.state.windowWidth} mainImages={mainImages}/>
					
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