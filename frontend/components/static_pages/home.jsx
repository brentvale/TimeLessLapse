import React from 'react';

//COMPONENTS
import { Link } from 'react-router';

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
				<Link to="/your_hubs">
					<div className="text-3d heading" >
						Your Hubs >>
					</div>
				</Link>

			</div>
		)
	}
}

export default Home;