import React from 'react';

import SelectHubListItem from './select_hub_list_item';

class SelectHub extends React.Component{
	constructor(){
		super();
		this.state = {
			hubs: null,
			errors: null
		}
		this.handleSelectHub = this.handleSelectHub.bind(this);
	}
	
	componentDidMount(){
		let that = this;
		
		$.ajax({
			url: "api/timelapse_hubs",
			method: "GET",
			success: (resp) => {
				that.setState({hubs: resp});
			},
			error: (resp) => {
				that.setState({errors: resp});
			}
		});
	}
	
	handleSelectHub(e){
		this.props.handleSelectHub(e);
	}
	
	render(){
		if(!this.state.hubs){
			return <div>Fetching Timelapse Hubs...</div>;
		}
		let that = this;
		return(
			<div style={{textAlign: "center"}}>
				{Object.keys(this.state.hubs).map((hub_id,idx) => {
					return <SelectHubListItem key={idx} hub={that.state.hubs[hub_id]} handleSelectHub={that.props.handleSelectHub}/>
				})}
				
				<div onClick={this.props.createNewHub} className="center-block select-hub-list-item hand-on-hover" style={{padding: "0"}}>
					<i className="fa fa-picture-o" aria-hidden="true"></i>
					<div style={{verticalAlign: "top", height: "100%"}}>
						<h4 style={{marginTop: "2em", display: "inline-block", verticalAlign: "middle"}}>Create New Hub</h4>
					</div>
				</div>
				
			</div>
		)
	}
}

export default SelectHub;