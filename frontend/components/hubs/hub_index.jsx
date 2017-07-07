import React from 'react';

import { Link } from 'react-router';
//COMPONENTS
import HubIndexPhotoDisplay from './hub_index_photo_display';
import HomeContainer from '../static_pages/home_container';
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
			return (<HomeContainer />);
		}
		
		if(hubs.length === 0){
			return (
				<div>
					<UserInfo currentUser={currentUser}/>
					<div className="page-block page-block-border center-block" style={{padding: "10px"}}>
						<div className="one-third-block" style={{textAlign:"center"}}>
							<Link to={"/take_photo"} className="no-photos">
								<div className="no-photos-container box-with-shadow-inverted">
									<p>No Photos Taken</p>
								
										<i className="fa fa-picture-o no-photos-alert" aria-hidden="true"></i>
									<p>Click to upload new photo.</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			);
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