import React from 'react';

//COMPONENTS
import { Link } from 'react-router';
import HubIndexListItem from '../hubs/hub_index_list_item';
import SpeedControlsBlock from '../hubs/speed_controls_block';
import LandingHeader from './landing_header';

import language from '../../util/language';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			hub: null,
			mainImages: null,
			timeInterval: 500,
			//value of 1 thru 10 represents frames per second value
			//calculation of timeInterval = sliderValue / 1000 to get miliseconds
			sliderValue: 2
		};
		this.navigateToSignUp = this.navigateToSignUp.bind(this);
		this.handleGuestLogin = this.handleGuestLogin.bind(this);
		this.updateSliderValue = this.updateSliderValue.bind(this);
	}
	
	componentDidMount(){
		this.props.requestHomeHub();
	}
	
	componentWillReceiveProps(nextProps){
		this.setState({hub: nextProps.homeHub});
	}
	
	handleGuestLogin(){
		window.location.replace('/welcome_guest_user');
	}
	
	navigateToSignUp(){
		window.location.replace('/users/sign_up');
	}
	
	updateSliderValue(sliderValue){
		//onChange of React-Slider gives a value (no event)
		const newTimeInterval = 1000 / sliderValue;
		this.setState({sliderValue: sliderValue, timeInterval: newTimeInterval});
	}
	
	render(){
		const { selectedLanguage } = this.props;
		let hubIndexListItemDisplay, speedBar;

		if(this.state.hub){
			hubIndexListItemDisplay = <HubIndexListItem hub={this.state.hub} timeInterval={this.state.timeInterval} windowWidth={500}/>;
			speedBar = <SpeedControlsBlock sliderValue={this.state.sliderValue} updateSliderValue={this.updateSliderValue}/>;
		} else {
			hubIndexListItemDisplay = "";
			speedBar = "";
		}
		
		const mountainImageDisplay = <img className="mountain" src="https://image.ibb.co/fLUic5/mountain_silhouette.png" alt="Mountains" />;
		const cameraImageDisplay = <img className="tripod" src="https://image.ibb.co/cumwx5/tripod_with_camera_silhouette.png" alt="Camera Silhouette" />;
		
		let instructionsText;
		if(USER_IS_MOBILE){
			instructionsText = language.landing_page.step_three.instruction_mobile[selectedLanguage];
		} else {
			instructionsText = language.landing_page.step_three.instruction_desktop[selectedLanguage];
		}
		
		return(
			<div className="page-block page-block-border center-block">
				
				<LandingHeader selectedLanguage={selectedLanguage}/>
			
				<div className="landing-page-block center-block">
					<h3 className="landing-step">{language.landing_page.step_one.title[selectedLanguage]}</h3>
					<h4>{language.landing_page.step_one.header[selectedLanguage]}</h4>
					<p>{language.landing_page.step_one.instruction[selectedLanguage]}</p>
					{mountainImageDisplay}
					{cameraImageDisplay}
				</div>
					
				<div className="landing-page-block center-block right-block" style={{marginBottom: "0px"}}>
					<h3 className="landing-step">{language.landing_page.step_two.title[selectedLanguage]}</h3>
					<h4>{language.landing_page.step_two.header[selectedLanguage]}</h4>
					<p style={{marginBottom: "20px"}}>{language.landing_page.step_two.instruction[selectedLanguage]}</p>
				</div>
				<div className="center-block icon-center-block">
					<i className="fa fa-picture-o landing" aria-hidden="true"></i>
					<i className="fa fa-picture-o landing" aria-hidden="true"></i>
					<i className="fa fa-picture-o landing" aria-hidden="true"></i>
				</div>
					
				<div className="landing-page-block center-block">
					<h3 className="landing-step">{language.landing_page.step_three.title[selectedLanguage]}</h3>
					<h4>{language.landing_page.step_three.header[selectedLanguage]}</h4>
					<p>{instructionsText}</p>
					<div className="center-block" style={{maxWidth: "350px", paddingTop: "20px", marginBottom: "20px"}}>
						{hubIndexListItemDisplay}
						{speedBar}
					</div>
				</div>
						
				<div className="landing-page-block center-block align-center">
					<h3 className="landing-step">{language.landing_page.step_four.title[selectedLanguage]}</h3>
					<h4>{language.landing_page.step_four.header[selectedLanguage]}</h4>
					<p>{language.landing_page.step_four.instruction[selectedLanguage]}</p>
				</div>
			
				<div className="button-container center-block">
					<div className="button button-create button-landing-width hand-on-hover button-height-large" onClick={this.navigateToSignUp}>{language.landing_page.cta_sign_up[selectedLanguage]}</div>
					<p>or</p>
					<div className="button button-create button-landing-width hand-on-hover button-height-large" onClick={this.handleGuestLogin}>{language.landing_page.cta_guest_login[selectedLanguage]}</div>
				</div>

			</div>
		)
	}
}

export default Home;