import React from 'react';

import { withRouter } from 'react-router';
import ReactDOM from 'react-dom';

import {Button, Modal} from 'react-bootstrap';

import FileInput from 'react-file-input';
import * as ReactKonva from 'react-konva';
import SelectHub from './select_hub';
import YourHubsLink from '../shared/links/your_hubs_link';

class NewPhoto extends React.Component{
	constructor(){
		super();
		this.state = {
			uploadedFile: null,
			step: 1,
			imagePreview: null,
			photograph: null,
			showModal: false,
			selectedHubId: null,
			spinning: false
		};
		this.close = this.close.bind(this);
		this.createNewHub = this.createNewHub.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleConfirmed = this.handleConfirmed.bind(this);
		this.handleUnConfirmed = this.handleUnConfirmed.bind(this);
		this.handleSelectHub = this.handleSelectHub.bind(this);
		this.navigateToTimelapseHub = this.navigateToTimelapseHub.bind(this);
		this.navigateToTimelapseHubs = this.navigateToTimelapseHub.bind(this);
		this.open = this.open.bind(this);
		this.updatePhotographWithHubId = this.updatePhotographWithHubId.bind(this);
	}
	
	close() {
		this.setState({ showModal: false });
	}

  open() {
  	this.setState({ showModal: true });
  }
	
  navigateToTimelapseHub(hubId) {
    this.props.router.push(`hubs/${hubId}`);
  }
	
	createNewHub(e){
		let that = this;
		$.ajax({
			url: "api/timelapse_hubs",
			method: "POST",
			data: {
				timelapse_hub: {
					latitude: this.state.photograph.latitude.slice(0,13),
					longitude: this.state.photograph.longitude.slice(0,13),
					hub_name: "Click to Add Hub Name",
					first_photograph_id: this.state.photograph.id
				}
			},
			success: (resp) => {	
			  that.navigateToTimelapseHub(resp);
			},
			error: (resp) => {
				
			}
		});
		alert(`creating new hub and using photograph with id: ${this.state.photograph.id}
																							  latitude: ${this.state.photograph.latitude}
																							 longitude: ${this.state.photograph.longitude}`);
	}
	
  handleChange(e){
		let that = this;
		let uploadedFile = e.target.files[0];

		let reader = new FileReader();
		
		reader.onload = function(e) {
			const image = new window.Image();
			image.src = e.target.result;
			that.setState({ uploadedFile: uploadedFile, imagePreview: image });
		}
		reader.readAsDataURL(e.target.files[0]);
  }
	
	handleConfirmed(){
		this.updatePhotographWithHubId();
	}
	
	handleUnConfirmed(){
		this.setState({selectedHub: null, showModal: false})
	}
	
	handleSelectHub(obj){
		const targetHubId = $(obj.e.currentTarget).data("hub-id");
		console.log(targetHubId);
		obj.callback();
		this.setState({selectedHubId: targetHubId, showModal: true});
	}
	
  handleSubmit(e) {
    e.preventDefault();
    var reader = new FileReader();
    var that = this;

    reader.onloadend = function() {
      var formData = new FormData();

      formData.append("photograph[image]", that.state.uploadedFile);

			//CREATE IMAGE
			$.ajax({
				url: "api/photographs",
	      method: "POST",
	      data: formData,
	      processData: false,
	      contentType: false,
	      dataType: 'json',
				success: (resp) => {
					that.setState({step: 2, photograph: resp, spinning: false})
				},
				error: (resp) => {
					console.log("errored out creating the photo")
				}
			});
    }

    if (this.state.uploadedFile) {
      reader.readAsDataURL(this.state.uploadedFile);
    } 
		this.setState({spinning: true});
  }
	
  navigateToTimelapseHubs() {
    this.props.router.push("/");
  }
	
	stepFromState(){
		let display;
		switch(this.state.step){
		case 1:
			const imageHeight = 150;
			const imageWidth = 200;
			let imagePreview = (this.state.imagePreview) ? <div style={{width: "100%", textAlign: "center", marginBottom: "1em"}}>
																											<ReactKonva.Stage height={imageHeight} width={imageWidth} >
				        																				<ReactKonva.Layer style={{textAlign:"center"}}>
																													<ReactKonva.Image image={this.state.imagePreview} height={imageHeight} width={imageWidth}/>
																								        </ReactKonva.Layer>
																											</ReactKonva.Stage>
																										 </div>:
																										<div style={{height: imageHeight, width: imageWidth, marginBottom: "1em"}} className="center-block"></div>;
																										
			let submitButton = (this.state.uploadedFile) ? <input type="submit" className="btn btn-default" value="Save" style={{width: "12em", marginTop: "2em"}}/> : <div className="button button-med button-unclickable" style={{marginTop: "2em"}} onClick={() => alert("Upload Photograph First")}>Save</div>;																					
			display = <form onSubmit={this.handleSubmit} className="center-block" style={{marginTop: "3em", width: imageWidth}}>
									{imagePreview}
				          <FileInput name="companyDocument"
				                     accept=".jpg,.jpeg,.pdf"
				                     className="image-upload hand-on-hover"
				                     onChange={this.handleChange}
														 placeholder="Upload Photograph"/>
									
				         { submitButton }
				        </form>
			break;
		case 2:
			display = <SelectHub handleSelectHub={this.handleSelectHub}/>
			break;
		}
		return display;
	}
	
	updatePhotographWithHubId(){
		let that = this;
		$.ajax({
			url: `api/photographs/${this.state.photograph.id}` ,
      method: "PATCH",
      data: {
      	photograph: {
      		timelapse_hub_id: this.state.selectedHubId
      	}
      },
			success: (resp) => {
				that.navigateToTimelapseHub(resp.timelapse_hub_id);
			},
			error: (resp) => {
				console.log(resp.message);
			}
		});
	}
	
	render(){
		let display = this.stepFromState();
		let marginTop, photographDisplay;
		if(this.state.photograph){
			photographDisplay = <div className="photo-container" style={{}}>
														<img src={this.state.photograph.image} 
															 alt="Newly Uploaded Image" 
															 style={{height:"150px", width:"200px"}}/>
														<div style={{marginTop: "0.5em"}}>
															<p>Select the timelapse hub this photo goes with or...</p>
															<hr style={{marginTop: 0, marginBottom: 0}}/>
															<div className="button button-med button-create hand-on-hover" onClick={this.createNewHub}>Create New Hub</div>
														</div>
													</div>;
			marginTop = "18em";
		} else {
			photographDisplay = "";
			marginTop = "0em";
		}
		let yourHubsLink = (this.state.step === 1) ? <YourHubsLink /> : ""
		
		let spinnerUploadDisplay = (this.state.spinning) ? <div style={{padding:"1em"}}>
																													<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
																													<span className="sr-only">Uploading Image...</span>
																											</div>: "";
		return(
			<div>
				<div style={{textAlign:"left"}}>
					{yourHubsLink}
				</div>
				<div style={{textAlign:"center", paddingTop: "3em"}}>
			
					{photographDisplay}
					
					<div style={{marginTop: marginTop}}>
						{display}
						{spinnerUploadDisplay}
					</div>
			
					<Modal show={this.state.showModal} onHide={this.close}>
		        <Modal.Header closeButton>
		          <Modal.Title style={{textAlign:"center"}}>Are you sure this picture goes with this hub?</Modal.Title>
		        </Modal.Header>
		        <Modal.Body style={{height: "10em"}}>
							<div className="col-xs-12">
								<div className="col-xs-6" style={{textAlign: "center"}}>
									<div className="button button-med button-create" onClick={this.handleConfirmed}>Yes</div>
								</div>
								<div className="col-xs-6" style={{textAlign: "center"}}>
									<div className="button button-med button-undo" onClick={this.handleUnConfirmed}>No</div>
								</div>
							</div>
		        </Modal.Body>
		      </Modal>
			
				</div>
						
			</div>
		)
	}
}

export default withRouter(NewPhoto);