import React from 'react';

import { Link } from 'react-router';
//COMPONENTS
import HubIndexPhotoDisplayThumbnail from './hub_index_photo_display_thumbnail';
import HomeContainer from '../static_pages/home_container';
import UserInfo from '../users/info';

//give user more granular control from hub_show (ability to adjust speed)
//set default value here for speed to display timelesslapse on hubs_index
const DEFAULT_TIME_INTERVAL = 400;

class HubIndex extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			fetchedHubs: false
		}
	}
	
	componentDidMount(){
		if(!this.props.currentUser){
			this.props.requestCurrentUser();
		}
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.currentUser && !this.state.fetchedHubs){
			this.props.requestHubs();
			this.setState({fetchedHubs: true})
		}
	}
	
	render(){
		let {hubs, currentUser, selectedLanguage} = this.props;
		if(!currentUser){
			return (<HomeContainer selectedLanguage={selectedLanguage}/>);
		}
		
		if(hubs.length === 0){
			let containerKlass = (window.innerWidth < 600) ? "one-half-block": "one-third-block";
			return (
				<div>
					<UserInfo currentUser={currentUser}/>
					<div className="page-block page-block-border center-block" style={{padding: "10px"}}>
						<div className={containerKlass} style={{textAlign:"center"}}>
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
							return <HubIndexPhotoDisplayThumbnail key={hub.id} 
																										hub={hub} />
						})}
					</div>
				</div>
			);
		}
	}
};

export default HubIndex;