import React, {Component} from 'react';

export default class PublicPrivateSlider extends Component{
	constructor(){
		super();
		this.state = {
			public: false
		};
		this.togglePublic = this.togglePublic.bind(this);
	}
	
	componentDidMount(){
		this.setState({public: this.props.hub.public});
	}
	
	componentWillReceiveProps(nextProps){
		this.setState({public: nextProps.hub.public});
	}
	
	togglePublic(e){
		//need to save to server...temp solution
		let newHub = Object.assign({}, this.props.hub);
		newHub['public'] = !this.state.public
		this.props.updateHub({hub: newHub});
		this.setState({public: !this.state.public});
	}
	
	render(){
		const {hub} = this.props;
		const inputText = (this.state.public) ? "Public\u00A0" : "Private";
		
		return(
				<div id="publicPrivateSwitch">
					<p>This Hub is <strong>{inputText}</strong></p>
					<label className="switch">
						<input type="checkbox" checked={this.state.public} onClick={this.togglePublic}/>
					  <span className="slider round"></span>
					</label>
				</div>
		)
	}	
}