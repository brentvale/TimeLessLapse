import React from 'react';

//COMPONENTS
import { Link } from 'react-router';
import HubIndexListItem from '../hubs/hub_index_list_item';


class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			hub: null,
			landingPageSprite: null,
			//image has 6 column and 5 rows, total of 30 images 
			imageIndex: 0
		}
		this.handleSpriteAnimation = this.handleSpriteAnimation.bind(this);
		this.calculateBackgroundPositionFromStateImageIndex = this.calculateBackgroundPositionFromStateImageIndex.bind(this);
	}
	
	componentDidMount(){
		this.props.requestHomeHub();
		this.props.requestHomeTimelapseSprite();
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.homeHub){
			this.setState({hub: nextProps.homeHub});
		}
		if(nextProps.landingPageSprite){
			this.handleSpriteAnimation();
			this.setState({landingPageSprite: nextProps.landingPageSprite})
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
	
	render(){
		if(!this.state.hub){
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
					<h2>Watch daily photos become life&#39;s timeless events.</h2>
				</div>
			
				<HubIndexListItem hub={this.state.hub} homePage={true}/>
			</div>
		)
	}
}

export default Home;