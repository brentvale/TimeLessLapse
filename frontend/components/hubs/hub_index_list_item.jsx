import React, {Component} from 'react';
import { Link } from 'react-router';
import {ProgressBar} from 'react-bootstrap';

//GLOBAL VARIABLES
import { tabletBreakPoint } from '../../util/global_variables';
import {convertToDisplayableDate} from './shared_functions';

class HubIndexListItem extends Component{
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
		const newTimeInterval = (this.props.timeInterval) ? this.props.timeInterval : 500;
		this.setState({nameField: this.props.hub.hub_name,
									 interval: newTimeInterval });
	}
	
	componentWillReceiveProps(nextProps){
		const newTimeInterval = (nextProps.timeInterval) ? nextProps.timeInterval : 500;
		this.setState({interval: newTimeInterval});
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

		let photosLength = this.props.hub.photographs.length;
		this.interval = setInterval(() => {
			if((this.state.currentImageIndex + 1) < photosLength){
				this.setState({currentImageIndex: this.state.currentImageIndex+1});
			} else {
				this.setState({currentImageIndex: 0})
			}
		}, this.state.interval);
	}
	
	stopFlipping(){
		clearInterval(this.interval);
	}
	
	render(){
		let { hub, windowWidth, mainImages } = this.props;
																				
		if(hub.photographs.length === 0){
			return <div>Not photographs with timelapse hub with id {hub.id}</div>
		}	
		
		let imageSrc = "https://image.ibb.co/mdbUH5/finger_print.png";						
		
		let imageToUse;
    imageToUse = <img src={hub.photographs[this.state.currentImageIndex].large_image} className="image-display"/>;
		// if(windowWidth > 400){
//       imageToUse = <img src={hub.photographs[this.state.currentImageIndex].large_image} className="image-display"/>;
//     } else {
//       imageToUse = <img src={hub.photographs[this.state.currentImageIndex].small_image} className="image-display"/>;
//     }
		
		const now = (this.state.currentImageIndex / hub.photographs.length) * 100;	
		const progressBar = (hub.photographs.length > 1) ? <ProgressBar bsStyle="danger" now={now} /> : "";	
												
		const dateDisplay = convertToDisplayableDate(hub.photographs[this.state.currentImageIndex].datetime_digitized);
		const dateDisplayStyle = {position: 'absolute', top: '20px', right: '0px', height: "30px", lineHeight: "30px", width: "150px", backgroundColor: 'black', color: '#FD5C63', textAlign: 'center'};
		
		if(USER_IS_MOBILE){
			return (
				<div className="center-block"
						 style={{position:"relative"}}>
						 {progressBar}
						 {imageToUse}
						 <img src={imageSrc} 
						 			alt="Fingerprint to animate timelapse." 
						 			id="fingerPrintIcon"
						 			onTouchStart={this.startFlipping} 
						 			onTouchEnd={this.stopFlipping}/>
							<div style={dateDisplayStyle}>{dateDisplay}</div>
				</div>
			);
		} else {
			return (
				<div onMouseEnter={this.startFlipping} 
						 onMouseLeave={this.stopFlipping} 
						 className="center-block"
						 style={{position:"relative"}}>
						 {progressBar}
						 {imageToUse}
						 <div style={dateDisplayStyle}>{dateDisplay}</div>
				</div>
			);
		}						
		
	}
}
export default HubIndexListItem;