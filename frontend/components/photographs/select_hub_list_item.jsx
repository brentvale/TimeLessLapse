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
		let that = this;
		this.props.handleSelectHub({e: e, callback: (() => { that.setState({selected: false}) } ) });
		this.setState({selected: true});
	}
	
	render(){
		let { hub } = this.props;
		let hubImageSrc = (typeof hub.photographs[0] === "undefined") ? "" : hub.photographs[0].thumbnail_image;
		
		let containerKlass = "center-block hub-select-container box-with-shadow";
		let circleButtonKlass = "circle-button center-block hand-on-hover";
		
		if(this.state.selected){
			containerKlass += " box-with-shadow-selected";
			circleButtonKlass += " circle-button-selected";
		}
		return(
			<div className="col-xs-12 block-element" onClick={this.handleSelectHub} data-hub-id={hub.id}>
				<div className={containerKlass}>
					<div className="col-xs-12 col-sm-6" style={{marginTop: "1em"}}>
						<h2 style={{marginTop: "0"}}>{hub.hub_name}</h2>
						<img src={hubImageSrc} alt="First Image in Hub" style={{height:"150px", width:"200px"}} className="drop-shadow"/>
					</div>
					<div className="col-xs-12 col-sm-6 circle-button-parent">
						<div className={circleButtonKlass}></div>
					</div>
				</div>
			</div>
		)
	}
};

export default SelectHubListItem;