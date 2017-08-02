import React, {Component} from 'react';

import language from '../../util/language';

const SPRITE_ANIMATION_TIME = 200;

class LandingHeader extends Component{
	constructor(){
		super();
		this.state = {
			//image has 6 column and 5 rows, total of 30 images 
			imageIndex: 0,
		};
		this.handleSpriteAnimation = this.handleSpriteAnimation.bind(this);
		this.calculateBackgroundPositionFromStateImageIndex = this.calculateBackgroundPositionFromStateImageIndex.bind(this);
	}
	
	componentDidMount(){
		this.handleSpriteAnimation();
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
	
	render(){
		const {selectedLanguage} = this.props;
		let landingSpriteStyle;
		if(this.state.imageIndex === 0){
			landingSpriteStyle = "0px 0px"
		} else {
			landingSpriteStyle = this.calculateBackgroundPositionFromStateImageIndex();
		}
		
		return(
				<div id="landingHeader">
					<div id="landingSprite" className="center-block" style={{backgroundPosition: landingSpriteStyle}}></div>
					<h1>Time<span>less</span>lapse</h1>
					<h2>{language.landing_header.caption[selectedLanguage]}</h2>
				</div>
		)
	}
}

export default LandingHeader;