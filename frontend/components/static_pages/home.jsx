import React from 'react';

//COMPONENTS
import {Link, Route} from 'react-router-dom';

import TimelapseIndex from '../timelapse/index.jsx';

class Home extends React.Component{
	constructor(){
		super();
	}
	
	render(){
		return(
			<div style={{width: "100%", textAlign: "center"}}>
				<Link to="/take_photo">
					<div className="text-3d heading" >
						Take Photo >>
					</div>
				</Link>
				<Link to="/create_hub">
					<div className="text-3d heading" >
						Create Hub >>
					</div>
				</Link>
				
				<div>SHOW USER THEY CAN SET UP Places to timelapse from</div>
				<TimelapseIndex />
				
			</div>
		)
	}
}

export default Home;