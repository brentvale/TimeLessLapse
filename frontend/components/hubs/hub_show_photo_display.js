import React, {Component} from 'react';

class HubShowPhotoDisplay extends Component{
	
	
	render(){
		let { photo, spanKlass, lessThanTabletBreakSize } = this.props;
		let imageDisplay = (lessThanTabletBreakSize) ? <img src={photo.thumbnail_image} style={{height:"150px", width:"200px"}} className="drop-shadow"/> :
																										<img src={photo.small_image} style={{height:"300px", width:"400px"}} className="drop-shadow"/>
		return(
			 <div className="col-xs-12" style={{textAlign:"center", marginBottom: "4em"}}>
					{imageDisplay}
					<p style={{marginTop: "1em"}}><span className={spanKlass}>latitude:</span> {photo.latitude}</p>
					<p><span className={spanKlass}>longitude:</span> {photo.longitude}</p>
					<p><span className={spanKlass}>photo taken at:</span> {photo.datetime_digitized.slice(11,19)} <span className={spanKlass}>on</span> {photo.datetime_digitized.slice(0,10)} </p>
			 </div>
		)
	}
}

export default HubShowPhotoDisplay;