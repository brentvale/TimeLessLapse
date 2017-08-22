import React from 'react';
import { withRouter } from 'react-router';
import SelectHubListItem from './select_hub_list_item';

class SelectHub extends React.Component{
	constructor(){
		super();
		this.state = {
			hubs: null,
			errors: null
		}
		this.handleCreateNewHub = this.handleCreateNewHub.bind(this);
		this.navigateToTimelapseHub = this.navigateToTimelapseHub.bind(this);
	}
	
	componentDidMount(){
		if(this.props.hubs.length === 0){
			this.props.requestHubs();
		}
	}
	
	handleCreateNewHub(e){
		e.preventDefault();
		this.props.createNewHub({timelapse_hub: {
																							latitude: this.props.photograph.latitude.slice(0,13),
																							longitude: this.props.photograph.longitude.slice(0,13),
																							hub_name: "Unnamed",
																							first_photograph_id: this.props.photograph.id
																							}
														}).then((obj) => {alert(`creating new hub and using photograph with id: ${this.props.photograph.id}
																								  latitude: ${this.props.photograph.latitude}
																									longitude: ${this.props.photograph.longitude}`);
																									
																									this.navigateToTimelapseHub(obj.hub.id)} );
											
	}
	
  navigateToTimelapseHub(hubId) {
    this.props.router.push(`hubs/${hubId}`);
  }
	
	render(){
		const {hubs, handleSelectHub} = this.props;
		let that = this;
		return(
			<div style={{textAlign: "center"}}>
				{Object.keys(hubs).map((hub_id,idx) => {
					return <SelectHubListItem key={idx} hub={hubs[hub_id]} handleSelectHub={handleSelectHub}/>
				})}
				
				<div onClick={this.handleCreateNewHub} className="center-block select-hub-list-item hand-on-hover" style={{padding: "0"}}>
					<i className="fa fa-picture-o" aria-hidden="true"></i>
					<div style={{verticalAlign: "top", height: "100%"}}>
						<h4 style={{marginTop: "2em", display: "inline-block", verticalAlign: "middle"}}>Create New Hub</h4>
					</div>
				</div>
				
			</div>
		)
	}
}

export default withRouter(SelectHub);