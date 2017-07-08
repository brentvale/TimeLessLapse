import React from 'react';

import {Link} from 'react-router';
import { hashHistory } from 'react-router';

import InputField from './input_field';
import FileInput from 'react-file-input';
import {Button, Modal} from 'react-bootstrap';
import * as ReactKonva from 'react-konva';

class UserForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email: null,
			focused: null,
			imageHeight: 400,
			imagePreview: null,
			imageWidth: 300,
			name: null,
			showModal: false,
			tagLine: null,
			thumbnailAvatar: null,
			uploadedFile: null,
			websiteUrl: null
		}
		this.close = this.close.bind(this);
		this.dataHasChanged = this.dataHasChanged.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.navigateToHome = this.navigateToHome.bind(this);
		this.open = this.open.bind(this);
		this.update = this.update.bind(this);
		this.updateFocusedElement = this.updateFocusedElement.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}
	
	close(){
		this.setState({showModal: false});
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
										tagLine: tagLine,
										thumbnailAvatar: nextProps.currentUser.thumbnail_avatar
									});
	}
	
	dataHasChanged(){
		if(this.props.currentUser.name !== this.state.name){
			return true;
		}
		if(this.props.currentUser.email !== this.state.email){
			return true;
		}
		if(this.props.currentUser.website_url !== this.state.websiteUrl){
			return true;
		}
		if(this.props.currentUser.tag_line !== this.state.tagLine){
			return true;
		}
		return false;
	}
	
  handleChange(e){
		let that = this;
		let uploadedFile = e.target.files[0];

		let reader = new FileReader();
		
		reader.onload = function(e) {
			const image = new window.Image();
			image.src = e.target.result;
			
			that.setState({ imagePreview: image, uploadedFile: uploadedFile});
		}
		reader.readAsDataURL(e.target.files[0]);
  }
	
  handleSubmit(e) {
    e.preventDefault();

    let reader = new FileReader();
    let that = this;

    reader.onloadend = function(e) {
				
      let formData = new FormData();

			let canvas = document.createElement("canvas");

			canvas.width = that.state.imageWidth;
			canvas.height = that.state.imageHeight;

			let ctx = canvas.getContext("2d");
			ctx.drawImage(that.state.imagePreview, 0, 0, that.state.imageWidth, that.state.imageHeight);

			let dataurl = canvas.toDataURL("image/jpeg");

      formData.append("user[avatar]", dataurl);

			that.props.updateCurrentUser(formData, {userId: that.props.currentUser.id}, true)
				.then(that.setState({showModal: false, uploadedFile: null, imagePreview: null}));
    }

    if (this.state.uploadedFile) {
      reader.readAsDataURL(this.state.uploadedFile);
    } 
		
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
	
	open(){
		this.setState({showModal: true});
	}
	
	updateUser(){
		if(this.props.currentUser.email === "guest@example.com"){
			if(this.dataHasChanged()){
				alert("Thanks for using TimeLessLapse! Look at you! already editing user profile info.  Unfortunately, I can't let ya do that yet because I haven't had time to create the form validations for a shared guest account.  Check back soon!");
			}
			hashHistory.goBack();
		} else {
			this.props.updateCurrentUser(	{user: 
																			{	
																				name: this.state.name,
																				email: this.state.email,
																				website_url: this.state.websiteUrl,
																				tag_line: this.state.tagLine
																			}
																		},
																		{ userId: this.props.currentUser.id },
																		false).then(hashHistory.goBack());
		}
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
		
		const imageDisplay = (this.state.thumbnailAvatar) ? <img src={this.state.thumbnailAvatar} id="profilePhoto"/> : <i className="fa fa-user-circle-o large hand-on-hover" aria-hidden="true"></i>;

		//MODAL
		const imageHeight = 150;
		const imageWidth = 200;
		let imagePreview, submitButton;
		
		if(this.state.imagePreview){
			imagePreview = <div style={{width: "100%", textAlign: "center", marginBottom: "1em"}}>
											 <ReactKonva.Stage height={imageHeight} width={imageWidth} >
												 <ReactKonva.Layer style={{textAlign:"center"}}>
													 <ReactKonva.Image image={this.state.imagePreview} height={imageHeight} width={imageWidth}/>
								         </ReactKonva.Layer>
											 </ReactKonva.Stage>
										 </div>;
			submitButton = <input type="submit" className="btn btn-default" value="Save" style={{width: "12em", marginTop: "2em"}}/>;
		} else {
			imagePreview = <div style={{height: imageHeight, width: imageWidth, marginBottom: "1em"}} className="center-block"></div>;
			submitButton =  <div className="button button-med button-unclickable" style={{marginTop: "2em"}} onClick={() => alert("Upload Photograph First")}>Save</div>;
		}			
																			
		let display = <form onSubmit={this.handleSubmit} className="center-block" style={{marginTop: "3em", width: imageWidth, textAlign:"center"}}>
										{imagePreview}
					          <FileInput name="profilePhoto"
					                     accept=".jpg,.jpeg,.pdf"
					                     className="image-upload hand-on-hover"
					                     onChange={this.handleChange}
															 placeholder="Upload Photo"
															 style={{zIndex: "10"}}/>
					         { submitButton }
									 </form>;
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
						
						<div className="hand-on-hover center-block" onClick={this.open}>
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
														
				<Modal show={this.state.showModal} onHide={this.close}>
	        <Modal.Header closeButton>
	          <Modal.Title style={{textAlign:"center"}}>Upload Photo</Modal.Title>
	        </Modal.Header>
	        <Modal.Body style={{height: "500px"}}>
						{ display }
	        </Modal.Body>
	      </Modal>
			</div>
		)
	}
}
export default UserForm;