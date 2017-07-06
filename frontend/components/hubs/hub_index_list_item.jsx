import React from 'react';
import { Link } from 'react-router';

//GLOBAL VARIABLES
import { tabletBreakPoint } from '../../util/global_variables';

class HubIndexListItem extends React.Component{
	constructor(){
		super();
		this.state = {
			currentImageIndex: 0,
			interval: 500,
			editingHubName: false,
			nameField: "",
		}
		this.stopFlipping = this.stopFlipping.bind(this);
		this.startFlipping = this.startFlipping.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.changeHubName = this.changeHubName.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	componentDidMount(){
		this.setState({nameField: this.props.hub.hub_name});
	}
	
	componentWillUnmount(){
		this.stopFlipping();
	}
	
	changeHubName(){
		this.setState({editingHubName: true})
	}
	
	handleChange(e){
		this.setState({nameField: e.target.value});
	}
	
	handleKeyPress(e){
		if(e.keyCode == 13 || e.keyCode == 9){
			if(this.state.nameField !== ""){
				e.preventDefault();
				let that = this;
				this.props.saveHubName(this.state.nameField, () => {that.setState({editingHubName: false}) } );
			} else {
				alert("Name Field Cannot Be Blank");
			}
		}
	}
	
	startFlipping(e){
		e.preventDefault();
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
		clearInterval(this.interval);
	}

	render(){
		let { hub, windowWidth, mainImages } = this.props;
																				
		if(hub.photographs.length === 0){
			return <div>Not photographs with timelapse hub with id {hub.id}</div>
		}	
		if(typeof mainImages === "undefined"){
			return <div>Fetching timelapse hub.</div>
		}								
		
		let imageToUse;
		if(windowWidth > 400){
			imageToUse = <img src={hub.photographs[this.state.currentImageIndex].large_image} className="image-display"/>;
		} else {
			imageToUse = <img src={hub.photographs[this.state.currentImageIndex].small_image} className="image-display"/>;
		}																			
		
		if(USER_IS_MOBILE){
			alert("user is mobile");
			return (
				<div className="center-block"
						 style={{position:"relative"}}>
						 {imageToUse}
						 <img src={mainImages.finger_print_url} 
						 			alt="Fingerprint to animate timelapse." 
						 			id="fingerPrintIcon"
						 			onTouchStart={this.startFlipping} 
						 			onTouchEnd={this.stopFlipping}/>
				</div>
			);
		} else {
			return (
				<div onMouseEnter={this.startFlipping} 
						 onMouseLeave={this.stopFlipping} 
						 className="center-block">
						 {imageToUse}
				</div>
			);
		}						
		
	}
}
export default HubIndexListItem;