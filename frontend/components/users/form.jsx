import React from 'react';

import {Link} from 'react-router';
import { hashHistory } from 'react-router';

class UserForm extends React.Component{
	constructor(){
		super();
		this.state = {
			
		}
		this.handleChangePhoto = this.handleChangePhoto.bind(this);
		this.navigateToHome = this.navigateToHome.bind(this);
	}
	
	componentDidMount(){
		
	}
	
	handleChangePhoto(){
		alert("launch modal to change photo");
	}
	
	navigateToHome(){
		hashHistory.goBack();
	}
	
	render(){
		let {currentUser} = this.props;
		if(!currentUser){
			return <div>Fetching User Info</div>
		}
		const imageDisplay = (currentUser.thumbnail_avatar) ? <img src={currentUser.thumbnail_avatar} /> : <i className="fa fa-user-circle-o large hand-on-hover" aria-hidden="true"></i>;
		const nameDisplay = (currentUser.name) ? <p>{currentUser.name}</p> : <p className="unfilled">Click to add name</p>;
		const emailDisplay = (currentUser.email) ? <p>{currentUser.email}</p> : <p className="unfilled">Click to add email</p>;
		const websiteDisplay = (currentUser.website_url) ? <p>{currentUser.website_url}</p> : <p className="unfilled">Click to add website</p>;
		const tagLineDisplay = (currentUser.tag_line) ? <p>{currentUser.tag_line}</p> : <p className="unfilled">Add your bio in under 255 characters</p>;
		return(
			<div>
				<div className="page-block page-block-border center-block">
			
					<div className="nav-block" >
						<div onClick={this.navigateToHome} className="hand-on-hover">
							Cancel
						</div>
						<div><h3>Edit Profile</h3></div>
						<div onClick={this.navigateToHome} className="hand-on-hover">
							Done
						</div>
					</div>
					<div className="edit-block-header">
						<div onClick={this.handleChangePhoto} className="hand-on-hover center-block" style={{width: "150px"}}>
							{imageDisplay}
							<p style={{marginTop: "15px"}}>Change Profile Photo</p>
						</div>
							
					</div>
					
					<div className="edit-block-content-border">
						<div className="center-block edit-block-content">
							<div>
								<div>
									<i className="fa fa-user" aria-hidden="true"></i>
								</div>
								
								{nameDisplay}
							</div>
							<div>
								<div>
									<i className="fa fa-id-badge" aria-hidden="true"></i>
								</div>
								{emailDisplay}
							</div>
							<div>
								<div>
									<i className="fa fa-ravelry" aria-hidden="true"></i>
								</div>
								{websiteDisplay}
							</div>
							<div>
								<div>
									<i className="fa fa-info-circle" aria-hidden="true"></i>
								</div>
								{tagLineDisplay}
							</div>
						</div>
							
					</div>
							
				</div>
			</div>
		)
	}
}
export default UserForm;