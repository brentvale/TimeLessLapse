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
			lessThanTabletBreakSize: window.innerWidth < tabletBreakPoint
		}
		this.stopFlipping = this.stopFlipping.bind(this);
		this.startFlipping = this.startFlipping.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.changeHubName = this.changeHubName.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.changeStateSizeIfBreakpointReached = this.changeStateSizeIfBreakpointReached.bind(this);
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.changeStateSizeIfBreakpointReached);
		this.setState({nameField: this.props.hub.hub_name});
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}
	
	changeHubName(){
		this.setState({editingHubName: true})
	}
	
	changeStateSizeIfBreakpointReached(){
		if(window.innerWidth < tabletBreakPoint){
			this.setState({lessThanTabletBreakSize: true});
		} else {
			this.setState({lessThanTabletBreakSize: false});
		}
	}
	
	handleChange(e){
		this.setState({nameField: e.target.value});
	}
	
	handleFocus(){
		if(this.state.nameField === "Click to Add Hub Name"){
			this.setState({nameField: ""});
		}
	}
	
	handleKeyPress(e){
		if(e.keyCode == 13 || e.keyCode == 9){
			console.log(`key code was ${e.keyCode}`)
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
		let { hub, klass, onIndexView } = this.props;
		let titleEditingField = (this.state.editingHubName) ? <input style={{marginTop: "0", marginBottom: "0.5em", display:"block", fontSize: "2em", width: "12em", height: "2em", textAlign:"center"}} 
																																 onFocus={this.handleFocus} 
																																 onKeyDown={this.handleKeyPress} 
																																 className="center-block" 
																																 value={this.state.nameField} 
																																 onChange={this.handleChange} /> : 
																													<h2 className="heading-block" onClick={this.changeHubName}>{hub.hub_name}</h2>;
																				
		if(hub.photographs.length === 0){
			return <div>Not photographs with timelapse_hub with id {hub.id}</div>
		}									
		
		let imageToUse = (this.state.lessThanTabletBreakSize)	? <div onMouseEnter={this.startFlipping} 
																						 										onMouseLeave={this.stopFlipping} 
																						 									  onTouchStart={this.startFlipping} 
																						 									  onTouchEnd={this.stopFlipping}>
																																<img src={hub.photographs[this.state.currentImageIndex].thumbnail_image} style={{height:"150px", width:"200px"}} className="drop-shadow"/>;
																														</div> : 
																														<div onMouseEnter={this.startFlipping} 
																						 										onMouseLeave={this.stopFlipping} 
																						 									  onTouchStart={this.startFlipping} 
																						 									  onTouchEnd={this.stopFlipping}>
																																<img src={hub.photographs[this.state.currentImageIndex].small_image} style={{height:"300px", width:"400px"}} className="drop-shadow"/>;
																														</div>
		
		let linkToHub = (onIndexView) ? <div style={{marginTop: "20px"}}>
																			<Link to={`/hubs/${hub.id}`} onClick={this.stopFlipping}>View {hub.hub_name} Hub >></Link>
																		</div> : "";														
		return (
			<div>
				<div className={klass}>
					{titleEditingField}
					{imageToUse}
					{linkToHub}
				</div>
			</div>);
	}
}
export default HubIndexListItem;