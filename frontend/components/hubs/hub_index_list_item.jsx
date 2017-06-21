import React from 'react';
import { Link } from 'react-router';

class HubIndexListItem extends React.Component{
	constructor(){
		super();
		this.state = {
			currentImageIndex: 0,
			interval: 500
		}
		this.stopFlipping = this.stopFlipping.bind(this);
		this.handleNextImage = this.handleNextImage.bind(this);
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
		let { hub, klass } = this.props;

		return(
			<Link to={`/hubs/${hub.id}`} onClick={this.stopFlipping}>
				<div className={klass} onMouseEnter={this.handleNextImage} onMouseLeave={this.stopFlipping} style={{textAlign: "center"}}>
					<div className="col-xs-12" style={{marginTop: "1em"}}>
						<h2 style={{marginTop: "0"}}>{hub.hub_name}</h2>
						<img src={hub.photographs[this.state.currentImageIndex].image} style={{height:"300px", width:"400px"}} className="drop-shadow"/>
					</div>
				</div>
			</Link>
		)
	}
}
export default HubIndexListItem;