import React from 'react';
import HubIndexListItem from './hub_index_list_item';

class HubShow extends React.Component{
	componentDidMount(){
		this.props.requestHub(this.props.hubId);
	}
	
	render(){
		let { hub } = this.props;
		
		if(!hub){
			return <div>Fetching Hub</div>
		}
		
		return(
			<div>
				<div className="col-xs-12" style={{paddingBottom: "2em", marginBottom: "4em", borderBottom: "1px solid #d3d3d3"}}>
					<HubIndexListItem hub={hub} klass="col-xs-12"/>
				</div>
				<div className="col-xs-12">
					{hub.photographs.map((photo) => {
						return <div className="col-xs-12" key={photo.id} style={{textAlign:"center", marginBottom: "4em"}}>
											<img src={photo.image} style={{height:"300px", width:"400px"}} className="drop-shadow"/>
											<p style={{marginTop: "1em"}}>latitude: {photo.latitude}</p>
											<p>longitude: {photo.longitude}</p>
											<p>rotation: {photo.rotation}</p>
											<p>created date: {photo.created_at.slice(0,10)}</p>
									 </div>
					})}
				</div>
			</div>)
	}
}

export default HubShow;