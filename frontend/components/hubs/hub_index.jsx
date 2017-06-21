import React from 'react';

//COMPONENTS
import HubIndexListItem from './hub_index_list_item';

class HubIndex extends React.Component{
	constructor(){
		super();
	}
	componentDidMount(){
		this.props.requestHubs()
	}
	render(){
		let {hubs} = this.props;
		if(hubs.length === 0){
			return <div>No Hubs Have Been Created Yet</div>
		}
		return(
			<div>
				{hubs.map((hub) => {
					return <HubIndexListItem key={hub.id} hub={hub} klass="col-xs-12 col-md-6"/>
				})}
			</div>
		)
	}
};

export default HubIndex;