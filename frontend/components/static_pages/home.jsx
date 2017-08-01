import React from 'react';

//COMPONENTS
import { Link } from 'react-router';
import HubIndexListItem from '../hubs/hub_index_list_item';
import SpeedControlsBlock from '../hubs/speed_controls_block';

const SPRITE_ANIMATION_TIME = 200;

class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			hub: null,
			mainImages: null,
			//image has 6 column and 5 rows, total of 30 images 
			imageIndex: 0,
			timeInterval: 500,
			//value of 1 thru 10 represents frames per second value
			//calculation of timeInterval = sliderValue / 1000 to get miliseconds
			sliderValue: 2
		}
		this.handleSpriteAnimation = this.handleSpriteAnimation.bind(this);
		this.calculateBackgroundPositionFromStateImageIndex = this.calculateBackgroundPositionFromStateImageIndex.bind(this);
		this.navigateToSignUp = this.navigateToSignUp.bind(this);
		this.handleGuestLogin = this.handleGuestLogin.bind(this);
		this.updateSliderValue = this.updateSliderValue.bind(this);
	}
	
	componentDidMount(){
		this.props.requestHomeHub();
		this.props.requestMainImages();
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.homeHub){
			this.setState({hub: nextProps.homeHub});
		}
		if(nextProps.mainImages){
			this.handleSpriteAnimation();
			this.setState({mainImages: nextProps.mainImages})
		}
	}
	
	componentWillUnmount(){
		clearInterval(this.interval);
	}
	
	calculateBackgroundPositionFromStateImageIndex(){
		//image dimensions = 1200 x 920 => height: 184px; width: 200px;
		if(this.state.imageIndex === 0){
			return "0px 0px";
		} else if(this.state.imageIndex >= 30){
			return "-1000px -736px";
		} else {
			const col = this.state.imageIndex % 6;
			const row = Math.floor(this.state.imageIndex / 6);
			
			const xPixels = col * 200;
			const yPixels = row * 184;
			
			return `-${xPixels}px -${yPixels}px`;
		}
	}
	
	handleGuestLogin(){
		window.location.replace('/welcome_guest_user');
	}
	
	handleSpriteAnimation(){
		clearInterval(this.interval);
		this.interval = setInterval(() => {
			//39 total images with 0 indexing
			if(this.state.imageIndex < 50){
				this.setState({imageIndex: this.state.imageIndex + 1})
			} else {
				this.setState({imageIndex: 0});
			}
		},SPRITE_ANIMATION_TIME);
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
		let hubIndexListItemDisplay, mountainImageDisplay, cameraImageDisplay;
		if(!this.state.hub || !this.state.mainImages){
			hubIndexListItemDisplay = "";
			mountainImageDisplay = "";
			cameraImageDisplay = "";
		} else {
			hubIndexListItemDisplay = <HubIndexListItem hub={this.state.hub} homePage={true} mainImages={this.state.mainImages} timeInterval={this.state.timeInterval}/>;
			mountainImageDisplay = <img className="mountain" src={this.state.mainImages.mountain_silhouette_url} alt="Mountains" />;
			cameraImageDisplay = <img className="tripod" src={this.state.mainImages.camera_url} alt="Camera Silhouette" />;
		}
		
		let landingSpriteStyle;
		if(this.state.imageIndex === 0){
			landingSpriteStyle = "0px 0px"
		} else {
			landingSpriteStyle = this.calculateBackgroundPositionFromStateImageIndex();
		}
		
		let instructionsText = (USER_IS_MOBILE) ? "Enjoy the compiled timelapse by placing your finger on top of the pink fingerprint.":"Enjoy the compiled timelapse by hovering over the photo with your mouse.";
		
		const speedBar = (this.state.hub && this.state.hub.photographs.length > 1) ? <SpeedControlsBlock sliderValue={this.state.sliderValue} updateSliderValue={this.updateSliderValue}/>
																																														 : "";
		return(
			<div className="page-block page-block-border center-block">
				
				<div id="landingHeader">
					<div id="landingSprite" className="center-block" style={{backgroundPosition: landingSpriteStyle}}></div>
					<h1>Time<span>less</span>lapse</h1>
					<h2>Watch daily photos become life&#39;s timeless&nbsp;events.</h2>
				</div>
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