import React from 'react';

//COMPONENTS
import { Link } from 'react-router';
import HubIndexListItem from '../hubs/hub_index_list_item';
import SpeedControlsBlock from '../hubs/speed_controls_block';
import LandingHeader from './landing_header';

class Home extends React.Component{
	constructor(){
		super();
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
		
		let instructionsText = (USER_IS_MOBILE) ? "Enjoy the compiled timelapse by placing your finger on top of the pink fingerprint.":"Enjoy the compiled timelapse by hovering over the photo with your mouse.";
		
		return(
			<div className="page-block page-block-border center-block">
				
				<LandingHeader />
			
				<div className="landing-page-block center-block">
					<h3 className="landing-step">Step 1</h3>
					<h4>Take a Photo to Create a Hub</h4>
					<p>Take a photo from a fixed tripod or use a mounted camera holder. Timelesslapse uses the lat/lng coordinates of your photo to create a Hub.</p>
					{mountainImageDisplay}
					{cameraImageDisplay}
				</div>
				<div className="landing-page-block center-block right-block" style={{marginBottom: "0px"}}>
					<h3 className="landing-step">Step 2</h3>
					<h4>Repeat</h4>
					<p style={{marginBottom: "20px"}}>Take daily photos.  Track progress toward your health goals, life goals, or G3s (<span>G</span>arden <span>G</span>rowing <span>G</span>oals).</p>
				</div>
				<div className="center-block icon-center-block">
					<i className="fa fa-picture-o landing" aria-hidden="true"></i>
					<i className="fa fa-picture-o landing" aria-hidden="true"></i>
					<i className="fa fa-picture-o landing" aria-hidden="true"></i>
				</div>
				<div className="landing-page-block center-block">
					<h3 className="landing-step">Step 3</h3>
					<h4>Watch your progress</h4>
					<p>{instructionsText}</p>
					<div className="center-block" style={{maxWidth: "350px", paddingTop: "20px", marginBottom: "20px"}}>
						{hubIndexListItemDisplay}
						{speedBar}
					</div>
				</div>
				<div className="landing-page-block center-block align-center">
					<h3 className="landing-step">Step 4</h3>
					<h4>Enjoy!</h4>
					<p>Join the community of users creating timelesslapses.</p>
				</div>
			
				<div className="button-container center-block">
					<div className="button button-create button-landing-width hand-on-hover button-height-large" onClick={this.navigateToSignUp}>Sign Up Now!</div>
					<p>or</p>
					<div className="button button-create button-landing-width hand-on-hover button-height-large" onClick={this.handleGuestLogin}>Guest Login</div>
				</div>

			</div>
		)
	}
}

export default Home;