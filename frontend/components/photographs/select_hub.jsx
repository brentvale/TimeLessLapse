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
			</div>
		)
	}
}

export default SelectHub;