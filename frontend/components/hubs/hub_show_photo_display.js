import React, {Component} from 'react';

class HubShowPhotoDisplay extends Component{
	
	
	render(){
		let { photo, spanKlass, windowWidth } = this.props;
		
		let imageDisplay;
		if(windowWidth > 400){
			imageDisplay = <img src={photo.large_image} className="image-display drop-shadow"/>;
		} else {
			imageDisplay = <img src={photo.small_image} className="image-display drop-shadow"/>;
		}																			

	 	let takenAtBlock = (this.props.photo.datetime_digitized) ? <p style={{marginBottom: "0.2em", textAlign: "left", width: "300px"}} className="center-block">
	 																															<span className={spanKlass}>photo taken at:</span> 
	 																															{photo.datetime_digitized.slice(11,19)} 
																																<span className={spanKlass}>on</span> 
																																{photo.datetime_digitized.slice(0,10)} 
																															</p> : "";
		return(
			 <div style={{textAlign:"center", marginBottom: "4em"}}>
					{imageDisplay}
					<p style={{marginBottom: "0.2em", textAlign: "left", width: "300px", marginTop: "1em"}} className="center-block"><span className={spanKlass}>latitude:</span> {photo.latitude}</p>
					<p style={{marginBottom: "0.2em", textAlign: "left", width: "300px"}} className="center-block"><span className={spanKlass}>longitude:</span> {photo.longitude}</p>
					{ takenAtBlock }
					<p style={{marginBottom: "0.2em", textAlign: "left", width: "300px"}} className="center-block"><span className={spanKlass}>order:</span> {photo.order_number}</p>
			 </div>
		)
	}
}

export default HubShowPhotoDisplay;