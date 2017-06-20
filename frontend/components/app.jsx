import React from 'react';

//COMPONENTS
import CustomNav from './navigation/custom_nav';
import {Route, Link} from 'react-router-dom';
import Home from './static_pages/home';

class App extends React.Component{
	constructor(){
		super();
	}
	
	render(){

		const routePath = <Route path={`${this.props.match.path}/your_hubs`} component={Home} />;
		return(
			<div>
	 			<Home />
		  </div>)
	}
}

export default App;