import React from 'react';

//COMPONENTS
import HubIndexListItem from './hub_index_list_item';
import Home from '../static_pages/home';
import UserInfo from '../users/info';

class HubIndex extends React.Component{
	constructor(){
		super();
		this.state = {
			fetchedHubs: false
		}
	}
	
	componentDidMount(){
		this.props.requestCurrentUser();
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.currentUser && !this.state.fetchedHubs){
			this.props.requestHubs();
			this.setState({fetchedHubs: true})
		}
	}
	
	render(){
		let {hubs, currentUser} = this.props;
		if(!currentUser){
			return (<Home />);
		}
		
		if(hubs.length === 0){
			return (<div>
									<p>No Hubs Have Been Created Yet, Take a photo to create your first hub.</p>
				</div>);
		} else {
			return(
				<div>
					
					{hubs.map((hub) => {
						return <HubIndexListItem key={hub.id} hub={hub} klass="col-xs-12 col-md-6 align-center" onIndexView={true}/>
					})}
				</div>
			);
		}
	}
};

export default HubIndex;