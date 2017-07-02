import React from 'react';

//COMPONENTS
import { Link } from 'react-router';


class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			hub: null
		}
	}
	
	componentDidMount(){
		let that = this;
		$.ajax({
			url: "/static_pages/fetch_landing_hub",
			method: "get",
			success: (resp) => {
				that.setState({hub: resp})
			}
		})
	}
	
	render(){
		if(!this.state.hub){
			return <div style={{marginTop: "70px", textAlign:"center"}}>fetching hub...</div>;
		}
		return(
			<div style={{width: "100%", textAlign: "center"}}>
				<HubIndexListItem hub={this.state.hub} homePage={true}/>
			</div>
		)
	}
}

export default Home;