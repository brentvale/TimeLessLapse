import React from 'react';

import { Link } from 'react-router';
//GLOBAL VARIABLES
import { tabletBreakPoint } from '../../util/global_variables';

class HubIndexPhotoDisplay extends React.Component{
	constructor(){
		super();
		this.state = {
			currentImageIndex: 0,
			lessThanTabletBreakSize: window.innerWidth < tabletBreakPoint
		}
		this.stopFlipping = this.stopFlipping.bind(this);
		this.startFlipping = this.startFlipping.bind(this);
		this.changeStateSizeIfBreakpointReached = this.changeStateSizeIfBreakpointReached.bind(this);
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}
	
	changeStateSizeIfBreakpointReached(){
		if(window.innerWidth < tabletBreakPoint){
			this.setState({lessThanTabletBreakSize: true});
		} else {
			this.setState({lessThanTabletBreakSize: false});
		}
	}
	
	startFlipping(e){
		this.props.activateHub( parseInt( $(e.currentTarget).data("hub-id") ) );
		
		let photosLength = this.props.hub.photographs.length;
		this.interval = setInterval(() => {
			if((this.state.currentImageIndex + 1) < photosLength){
				this.setState({currentImageIndex: this.state.currentImageIndex+1});
			} else {
				this.setState({currentImageIndex: 0})
			}
		}, this.props.timeInterval);
	}
	
	stopFlipping(){
		this.props.deactivateHub();
		clearInterval(this.interval);
	}

	render(){
		let { hub} = this.props;
						
		//save for dev												
		if(hub.photographs.length === 0){
			return <div>Not photographs with timelapse_hub with id {hub.id}</div>
		}									
																							
		let hubInfoDisplay =  <div>
														<Link to={`/hubs/${hub.id}`} onClick={this.stopFlipping}>View {hub.hub_name} Hub >></Link>
														<h2 className="heading-block">{hub.hub_name}</h2>
													</div>;
		let hubImageKlass = (this.props.activeHubId == hub.id) ? "center-block active-hub" : "center-block inactive-hub";
		
		let containerKlass;
		if(this.state.lessThanTabletBreakSize){
			containerKlass = "one-half-block";
		} else {
			containerKlass = "one-third-block";
		}
		return (
			<div className={containerKlass}>
				
					<div onMouseEnter={this.startFlipping} 
							 onMouseLeave={this.stopFlipping} 
							 onTouchStart={this.startFlipping} 
							 onTouchEnd={this.stopFlipping}	
							 data-hub-id={hub.id}
							 className={hubImageKlass}
							 style={{position:"relative"}}>
							 
							 <div className="overlay"></div>
							 
							 <img src={hub.photographs[this.state.currentImageIndex].small_image} className="drop-shadow"/>
							 
							 <Link to={`/hubs/${hub.id}`} onClick={this.stopFlipping} onTouchStart={this.stopFlipping}>
							 		<i className="fa fa-share-square hand-on-hover" aria-hidden="true"></i>
							 </Link>
					</div>
				
			</div>
				
		);
	}
}
export default HubIndexPhotoDisplay;