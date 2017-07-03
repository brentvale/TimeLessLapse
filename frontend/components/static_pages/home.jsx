import React from 'react';

//COMPONENTS
import { Link } from 'react-router';
import HubIndexListItem from '../hubs/hub_index_list_item';


class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			hub: null
		}
	}
	
	componentDidMount(){
		this.props.requestHomeHub();
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.homeHub){
			this.setState({hub: nextProps.homeHub});
		}
	}
	
	render(){
		if(!this.state.hub){
			return <div style={{marginTop: "70px", textAlign:"center"}}>fetching hub...</div>;
		}
		return(
			<div className="page-block page-block-border center-block">
				<HubIndexListItem hub={this.state.hub} homePage={true}/>
			</div>
		)
	}
}

export default Home;