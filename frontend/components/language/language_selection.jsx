import React, {Component} from 'react';

export default class LanguageSelection extends Component{
	constructor(){
		super();
		this.state = {
			activity: null
		};
		this.toggleActiveState = this.toggleActiveState.bind(this);
	}
	
	toggleActiveState(){
		if(!this.state.activity){
			//this.state.activity is null
			this.setState({activity: "active"});
		} else {
			//
			if(this.state.activity === "active"){
				setTimeout(() => {
					//animation timing should coincide with #languageContainer.active and #languageContainer.inactive
					this.setState({activity: null});
				}, 500)
				this.setState({activity: "inactive"});
			}
		}
		this.setState({active: !this.state.active})
	}
	
	render(){
		const {updateActiveLanguage} = this.props;
		let englishBlockClass = (window.LANG_SELECTED === 0) ? "language english flag-box-with-shadow hand-on-hover active" : "language english flag-box-with-shadow hand-on-hover inactive";
		let spanishBlockClass = (window.LANG_SELECTED === 1) ? "language spanish flag-box-with-shadow hand-on-hover active" : "language spanish flag-box-with-shadow hand-on-hover inactive";
		let klingonBlockClass = (window.LANG_SELECTED === 2) ? "language klingon flag-box-with-shadow hand-on-hover active" : "language klingon flag-box-with-shadow hand-on-hover inactive";
		
		return(
			<div id="languageContainer" className={this.state.activity || ""}>
				<div className="background-block">
					<div className="first-child three-quarter-border" style={{borderTopRightRadius: "0px", paddingTop: "4px"}}>
						<div className={englishBlockClass} onClick={() => {updateActiveLanguage(0)}}>
							<h6>English</h6>
							<div className="usa"></div>
							<div className="britain"></div>
						</div>
						<div className={spanishBlockClass} onClick={() => {updateActiveLanguage(1)}}>
							<h6>{"Espa\u00f1ol"}</h6>
							<div className="spain"></div>
							<div className="mexico"></div>
						</div>
						<div className={klingonBlockClass} onClick={() => {updateActiveLanguage(2)}}>
							<h6>Klingon</h6>
							<div className="klingon"></div>
						</div>
					</div>
					<div onClick={this.toggleActiveState} className="last-child three-quarter-border">
						<div></div>
					</div>
				</div>
			</div>
		)
	}
}