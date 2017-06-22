import React from 'react';
import { Link } from 'react-router';

class HubIndexListItem extends React.Component{
	constructor(){
		super();
		this.state = {
			currentImageIndex: 0,
			interval: 500,
			editingHubName: false,
			nameField: ""
		}
		this.stopFlipping = this.stopFlipping.bind(this);
		this.handleNextImage = this.handleNextImage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.changeHubName = this.changeHubName.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	componentDidMount(){
		this.setState({nameField: this.props.hub.hub_name});
	}
	
	changeHubName(){
		this.setState({editingHubName: true})
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
	
	handleNextImage(){
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
		let mainContent = <div className={klass} onMouseEnter={this.handleNextImage} 
																						 onMouseLeave={this.stopFlipping} 
																						 onTouchStart={this.handleNextImage} 
																						 onTouchCancel={this.stopFlipping}>
												{titleEditingField}
												<img src={hub.photographs[this.state.currentImageIndex].small_image} style={{height:"300px", width:"400px"}} className="drop-shadow"/>
											</div>;
											
		if(onIndexView){
			return <Link to={`/hubs/${hub.id}`} onClick={this.stopFlipping}>
								{mainContent}
						 </Link>;
		} else {
			return <div>{mainContent}</div>;
		}
	}
}
export default HubIndexListItem;