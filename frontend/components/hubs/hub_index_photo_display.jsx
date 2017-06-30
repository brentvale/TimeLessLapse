import React from 'react';

import { Link } from 'react-router';
//GLOBAL VARIABLES
import { tabletBreakPoint } from '../../util/global_variables';

class HubIndexPhotoDisplay extends React.Component{
	constructor(){
		super();
		this.state = {
			currentImageIndex: 0,
			interval: 500,
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
		e.preventDefault();
		this.props.activateHub( parseInt( $(e.currentTarget).data("hub-id") ) );
		let that = this;
		let photosLength = this.props.hub.photographs.length;
		this.interval = setInterval(() => {
			if((that.state.currentImageIndex + 1) < photosLength){
				that.setState({currentImageIndex: that.state.currentImageIndex+1});
			} else {
				that.setState({currentImageIndex: 0})
			}
		}, that.state.interval);
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
		
		let imageToUse = (this.state.lessThanTabletBreakSize)	? <img src={hub.photographs[this.state.currentImageIndex].thumbnail_image} className="drop-shadow"/>
																														: 
																														<img src={hub.photographs[this.state.currentImageIndex].small_image} className="drop-shadow"/>;
																																
																							
		let hubInfoDisplay =  <div>
														<Link to={`/hubs/${hub.id}`} onClick={this.stopFlipping}>View {hub.hub_name} Hub >></Link>
														<h2 className="heading-block">{hub.hub_name}</h2>
													</div>;
		let hubImageKlass = (this.props.activeHubId == hub.id) ? "center-block active-hub" : "center-block inactive-hub";
		return (
			<div className="one-third-block">
				<div>
					<div onMouseEnter={this.startFlipping} 
							 onMouseLeave={this.stopFlipping} 
							 onTouchStart={this.startFlipping} 
							 onTouchEnd={this.stopFlipping}	
							 data-hub-id={hub.id}
							 className={hubImageKlass}
							 style={{position:"relative"}}>
							 
							 <div className="overlay"></div>
							 {imageToUse}
							 
							 <Link to={`/hubs/${hub.id}`} onClick={this.stopFlipping}>
							 		<i className="fa fa-share-square hand-on-hover" aria-hidden="true"></i>
							 </Link>
					</div>
				</div>
			</div>
				
		);
	}
}
export default HubIndexPhotoDisplay;