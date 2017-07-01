import React from 'react';

import {Link} from 'react-router';
import { hashHistory } from 'react-router';
import InputField from './input_field';

class UserForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			focused: null,
			name: null,
			email: null,
			websiteUrl: null,
			tagLine: null
		}
		this.handleChangePhoto = this.handleChangePhoto.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.navigateToHome = this.navigateToHome.bind(this);
		this.update = this.update.bind(this);
		this.updateFocusedElement = this.updateFocusedElement.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}
	
	componentDidMount(){
		this.props.requestCurrentUser();
	}
	
	componentWillReceiveProps(nextProps){
		const name = (nextProps.currentUser.name) ? nextProps.currentUser.name : "";
		const email = (nextProps.currentUser.email) ? nextProps.currentUser.email : "";
		const websiteUrl = (nextProps.currentUser.website_url) ? nextProps.currentUser.website_url : "";
		const tagLine = (nextProps.currentUser.tag_line) ? nextProps.currentUser.tag_line : "";
		
		this.setState({	name: name,
										email: email,
										websiteUrl: websiteUrl,
										tagLine: tagLine
									});
	}
	
	handleChangePhoto(){
		alert("launch modal to change photo");
	}
	
	handleKeyPress(e){
		if(e.keyCode == 13){
			this.updateUser();
		}
	}
	
	navigateToHome(e){
		if(e.currentTarget.id === "done"){
			this.updateUser();
		} else if(e.currentTarget.id === "cancel"){
			hashHistory.goBack();
		}
	}
	
	updateUser(){
		this.props.updateCurrentUser({userId: this.props.currentUser.id,
																	name: this.state.name,
																	email: this.state.email,
																	websiteUrl: this.state.websiteUrl,
																	tagLine: this.state.tagLine}).then(hashHistory.goBack());
	}
	
	update(field) {
		return e => {
			if(!e.currentTarget.value){
				this.setState({
							[field]: ""
						});
			} else {
				this.setState({
							[field]: e.currentTarget.value
						});
			}
			
		}
	}
	
	updateFocusedElement(e){
		this.setState({focused: e.currentTarget.id});
	}
	
	render(){
		let {currentUser} = this.props;
		if(!currentUser){
			return <div>Fetching User Info</div>
		}
		
		const imageDisplay = (currentUser.thumbnail_avatar) ? <img src={currentUser.thumbnail_avatar} /> : <i className="fa fa-user-circle-o large hand-on-hover" aria-hidden="true"></i>;
		
		return(
			<div>
				<div className="page-block page-block-border center-block">
			
					<div className="nav-block" >
						<div onClick={this.navigateToHome} id="cancel" className="hand-on-hover">
							Cancel
						</div>
						<div><h3>Edit Profile</h3></div>
						<div onClick={this.navigateToHome} onFocus={this.updateFocusedElement} onKeyDown={this.handleKeyPress} id="done" className="hand-on-hover" tabIndex="5">
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
							
								<InputField fieldId="name" 
														attribute={this.state.name} 
														emptyFieldInstructions="Click to add name" 
														focused={this.state.focused === "name"} 
														updateFocusedElement={this.updateFocusedElement}
														update={this.update}
														tabIndex="1"/>
							
							</div>
							
							<div>
								<div>
									<i className="fa fa-id-badge" aria-hidden="true"></i>
								</div>
							
								<InputField fieldId="email" 
														attribute={this.state.email} 
														emptyFieldInstructions="Click to add email" 
														focused={this.state.focused === "email"} 
														updateFocusedElement={this.updateFocusedElement}
														update={this.update}
														tabIndex="2"/>
							
							</div>
							
							<div>
								<div>
									<i className="fa fa-ravelry" aria-hidden="true"></i>
								</div>
							
								<InputField fieldId="websiteUrl" 
														attribute={this.state.websiteUrl} 
														emptyFieldInstructions="Click to add website" 
														focused={this.state.focused === "websiteUrl"} 
														updateFocusedElement={this.updateFocusedElement}
														update={this.update}
														tabIndex="3"/>
							
							</div>
								
							<div>
								<div>
									<i className="fa fa-info-circle" aria-hidden="true"></i>
								</div>
							
								<InputField fieldId="tagLine" 
														attribute={this.state.tagLine} 
														emptyFieldInstructions="Add your bio in under 255 characters" 
														focused={this.state.focused === "tagLine"}  
														updateFocusedElement={this.updateFocusedElement}
														update={this.update}
														tabIndex="4"/>
						
							</div>
								
						</div>
					</div>
														
					<div className="edit-block-footer"></div>
							
				</div>
			</div>
		)
	}
}
export default UserForm;