import React from 'react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SelectHubListItem extends React.Component {
	constructor(){
		super();
		this.state = {
			selected: false
		}
		this.handleSelectHub = this.handleSelectHub.bind(this);
	}
	
	handleSelectHub(e){
		e.preventDefault();
		const storedEvent = e;
		let that = this;
		
		this.props.handleSelectHub({e: storedEvent, callback: (() => { that.setState({selected: false}) } ) });
		this.setState({selected: true});
	}
	
	render(){
		let { hub } = this.props;
		let hubImageSrc = (typeof hub.photographs[0] === "undefined") ? "" : hub.photographs[0].thumbnail_image;
		
		return(
			<div onClick={this.handleSelectHub} data-hub-id={hub.id} data-hub-name={hub.hub_name} className="center-block select-hub-list-item hand-on-hover" >
				<img src={hubImageSrc} alt="First Image in Hub" style={{height:"75px", width:"100px", display: "inline-block"}} className="drop-shadow"/>
				<div>
					<h4 style={{marginTop: "0", display: "inline-block"}}>{hub.hub_name}</h4>
					<p><strong>latitude:</strong> {hub.latitude}</p>
					<p><strong>longitude:</strong> {hub.longitude}</p>
				</div>
			</div>
		)
	}
};

export default SelectHubListItem;