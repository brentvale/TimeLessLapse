import React, { Component } from 'react';

import ReactSlider from 'react-slider';

export default class SpeedControlsBlock extends Component{
	render(){
		return(
			<div id="sliderContainer" className="center-block">
				<div id="tortoise"></div>
				<ReactSlider  defaultValue={2} 
											max={10} 
											orientation='horizontal'
											withBars={true}
											className='horizontal-slider'
											pearling={true}
											value={this.props.sliderValue}
											onChange={this.props.updateSliderValue}/>	
				<div id="hare"></div>
			</div>
			
		)
	}
}