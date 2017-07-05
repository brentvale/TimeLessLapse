import React from 'react';

//COMPONENTS
import { Link } from 'react-router';
import HubIndexListItem from '../hubs/hub_index_list_item';


class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			hub: null,
			landingPageImages: null,
			//image has 6 column and 5 rows, total of 30 images 
			imageIndex: 0
		}
		this.handleSpriteAnimation = this.handleSpriteAnimation.bind(this);
		this.calculateBackgroundPositionFromStateImageIndex = this.calculateBackgroundPositionFromStateImageIndex.bind(this);
		this.navigateToSignUp = this.navigateToSignUp.bind(this);
		this.handleGuestLogin = this.handleGuestLogin.bind(this);
	}
	
	componentDidMount(){
		this.props.requestHomeHub();
		this.props.requestHomeTimelapseSprite();
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.homeHub){
			this.setState({hub: nextProps.homeHub});
		}
		if(nextProps.landingPageImages){
			this.handleSpriteAnimation();
			this.setState({landingPageImages: nextProps.landingPageImages})
		}
	}
	
	componentWillUnmount(){
		clearInterval(this.interval);
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
		},200);
	}
	
	handleGuestLogin(){
		alert("Guest Login Coming Soon!");
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
	
	navigateToSignUp(){
		window.location.replace('/users/sign_up');
	}
	
	render(){
		if(!this.state.hub || !this.state.landingPageImages){
			return <div style={{marginTop: "70px", textAlign:"center"}}>fetching hub...</div>;
		}
		
		let landingSpriteStyle;
		if(this.state.imageIndex === 0){
			landingSpriteStyle = "0px 0px"
		} else {
			landingSpriteStyle = this.calculateBackgroundPositionFromStateImageIndex();
		}
		
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
					<img className="mountain" src={this.state.landingPageImages.mountain_silhouette_url} alt="Mountains" />
					<img className="tripod" src={this.state.landingPageImages.camera_url} alt="Camera Silhouette" />
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
					<p>Enjoy the compiled timelapse by hovering over the photo, or tapping if you&#39;re on your phone.</p>
					<div className="center-block" style={{maxWidth: "300px", paddingTop: "20px", marginBottom: "20px"}}>
						<HubIndexListItem hub={this.state.hub} homePage={true}/>
					</div>
				</div>
				<div className="landing-page-block center-block align-center">
					<h3 className="landing-step">Step 4</h3>
					<h4>Enjoy!</h4>
					<p>Join the community of users creating timelesslapses.</p>
				</div>
			
				<div className="button-container center-block">
					<div className="button button-create button-width-full hand-on-hover button-height-large" onClick={this.navigateToSignUp}>Sign Up Now!</div>
					<p>or</p>
					<div className="button button-create button-width-full hand-on-hover button-height-large" onClick={this.handleGuestLogin}>Guest Login</div>
				</div>

				
			</div>
		)
	}
}

export default Home;