import React from 'react';

//COMPONENTS
import HubIndexPhotoDisplay from './hub_index_photo_display';
import Home from '../static_pages/home';
import UserInfo from '../users/info';

class HubIndex extends React.Component{
	constructor(){
		super();
		this.state = {
			fetchedHubs: false,
			activeHubId: 0
		}
		this.activateHub = this.activateHub.bind(this);
		this.deactivateHub = this.deactivateHub.bind(this);
	}
	
	componentDidMount(){
		this.props.requestCurrentUser();
	}
	
	activateHub(hubId){
		this.setState({activeHubId: hubId});
	}
	
	deactivateHub(){
		this.setState({activeHubId: 0})
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
			let that = this;
			return(
				<div>
					<UserInfo currentUser={currentUser}/>
					<div className="page-block page-block-border center-block">
			
						{hubs.map((hub) => {
							return <HubIndexPhotoDisplay key={hub.id} 
																						hub={hub} 
																						activeHubId={that.state.activeHubId} 
																						activateHub={that.activateHub} 
																						deactivateHub={that.deactivateHub}/>
						})}
					</div>
				</div>
			);
		}
	}
};

export default HubIndex;