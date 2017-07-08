import React from 'react';

import { withRouter } from 'react-router';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import Exif from 'exif-js';
window.EXIF_IMAGE = Exif;

import {Button, Modal} from 'react-bootstrap';
import FileInput from 'react-file-input';
import * as ReactKonva from 'react-konva';
import SelectHub from './select_hub';

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
			spinning: false,
			targetHubName: null
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
					latitude: that.state.photograph.latitude.slice(0,13),
					longitude: that.state.photograph.longitude.slice(0,13),
					hub_name: "Unnamed",
					first_photograph_id: that.state.photograph.id
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
		this.setState({selectedHubId: null, showModal: false, selectedHubName: null})
	}
	
	handleSelectHub(obj){
		const targetHubId = $(obj.e.currentTarget).data("hub-id");
		const targetHubName = $(obj.e.currentTarget).data("hub-name");
		
		obj.callback();
		this.setState({selectedHubId: targetHubId, showModal: true, selectedHubName: targetHubName});
	}
	
  handleSubmit(e) {
    e.preventDefault();
		
    let reader = new FileReader();
    let that = this;

    reader.onloadend = function(e) {
			
			EXIF_IMAGE.getData(that.state.uploadedFile, function() {
	      let lat = EXIF_IMAGE.getTag(this, "GPSLatitude");
	      let lng = EXIF_IMAGE.getTag(this, "GPSLongitude");
				let imgDir = EXIF_IMAGE.getTag(this, "GPSImgDirection");
				let altitude = EXIF_IMAGE.getTag(this, "GPSAltitude");
				let dateTimeDigitized = EXIF_IMAGE.getTag(this, "DateTimeDigitized");

				//uploading last years timelapses to production, use default values that don't require exif data
				let latDegrees, lngDegrees;
				if(typeof lat === "undefined"){
					//if image comes from storage (no exif data present)
					latDegrees = "37.42144722";
					lngDegrees = "-121.7606277";
					altitude = "745.5679012345679";
					imgDir = "237.6705882352941";
					dateTimeDigitized = "unknown";
				} else {
					//convert array of 3 numbers into decimal degrees
					latDegrees = lat[0] + lat[1]/60 + lat[2]/3600;
					lngDegrees = lng[0] + lng[1]/60 + lng[2]/3600;

					//if N, positive number
					//if S, negative
					let latRef = EXIF_IMAGE.getTag(this, "GPSLatitudeRef");
					if(latRef === "S"){
						latDegrees = "-" + latDegrees;
					}
				
					//if E, positive number
					//if W, negative
					let lngRef = EXIF_IMAGE.getTag(this, "GPSLongitudeRef");
					if(lngRef === "W"){
						lngDegrees = "-" + lngDegrees;
					}
				}
			
	      let formData = new FormData();

				let canvas = document.createElement("canvas");
				
				let reduceByFactorOf;
				switch(that.state.imagePreview.width){
				case 1000:
					reduceByFactorOf = 1;
					break;
				case 4032:
					reduceByFactorOf = 5;
					break;
				default: 
					reduceByFactorOf = 1;
				}
				
				let height = that.state.imagePreview.height/reduceByFactorOf;
				let width = that.state.imagePreview.width/reduceByFactorOf;

				canvas.width = width;
				canvas.height = height;

				let ctx = canvas.getContext("2d");
				ctx.drawImage(that.state.imagePreview, 0, 0, width, height);

				let dataurl = canvas.toDataURL("image/jpeg");

	      formData.append("photograph[image]", dataurl);

				formData.append("photograph[latitude]", latDegrees);
				formData.append("photograph[longitude]", lngDegrees);
				formData.append("photograph[image_direction]", imgDir);
				formData.append("photograph[altitude]", altitude);
				formData.append("photograph[datetime_digitized]", dateTimeDigitized);

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
			});
    }

    if (this.state.uploadedFile) {
      reader.readAsArrayBuffer(this.state.uploadedFile);
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
			display = <form onSubmit={this.handleSubmit} className="center-block" style={{marginTop: "3em", width: imageWidth, zIndex: "10"}}>
									{imagePreview}
				          <FileInput name="companyDocument"
				                     accept=".jpg,.jpeg,.pdf"
				                     className="image-upload hand-on-hover"
				                     onChange={this.handleChange}
														 placeholder="Upload Photo"/>
									
				         { submitButton }
				        </form>
			break;
		case 2:
			display = <SelectHub handleSelectHub={this.handleSelectHub} createNewHub={this.createNewHub}/>
			break;
		}
		return display;
	}
	
	updatePhotographWithHubId(){
		let that = this;
		$.ajax({
			url: `api/photographs/${that.state.photograph.id}` ,
      method: "PATCH",
      data: {
      	photograph: {
      		timelapse_hub_id: that.state.selectedHubId
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
			let takenAtBlock = (this.state.photograph.datetime_digitized) ? <p style={{marginBottom: "0.2em", textAlign: "left", width: "300px"}} className="center-block">
																																				<span className="bold">photograph taken at: </span> 
																																				{this.state.photograph.datetime_digitized.slice(11,19)} 
																																				<span className="bold"> on </span> 
																																				{this.state.photograph.datetime_digitized.slice(0,10)} 
																																			</p> : "";
			let imageSrc = (window.innerWidth > 400) ? this.state.photograph.large_image : this.state.photograph.small_image;																														
			photographDisplay = <div>
														<img src={imageSrc} 
															 alt="Newly Uploaded Image" 
															 className="image-display drop-shadow"/>
															<p style={{marginBottom: "0.2em", textAlign: "left", width: "300px", marginTop: "1em"}} className="center-block"><span className="bold">latitude:</span> {this.state.photograph.latitude}</p>
															<p style={{marginBottom: "0.2em", textAlign: "left", width: "300px"}} className="center-block"><span className="bold">longitude:</span> {this.state.photograph.longitude}</p>
															{takenAtBlock}
													</div>;
			marginTop = "8em";
		} else {
			photographDisplay = "";
			marginTop = "0em";
		}
		
		let spinnerUploadDisplay = (this.state.spinning) ? <div style={{padding:"1em"}}>
																													<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br/>
																													<span>Uploading Image...</span><br/>
																													<span>This can take a while...sometimes as long as 30 seconds...</span>
																													<span className="sr-only">Uploading Image...</span>
																											</div>: "";
																											
		let headingDisplay = (this.state.step === 1) ? <div className="heading-block-container heading-block-container-border">
																											<Link to={"/"}>
																												<i className="fa fa-home hand-on-hover" aria-hidden="true"></i>
																											</Link>
																											<h2 className="heading-block center-block">Take photo or select from photo library</h2>
																										</div> : 
 																										<div className="heading-block-container heading-block-container-border">
																											<h2 className="heading-block center-block">Assign photo to hub.</h2>
																										</div>;
																														
		let createNewHubButton = (this.state.step === 2) ? <div style={{marginTop: "0.5em"}}>
																												<p>Select the timelapse hub this photo goes with or...</p>
																												<div className="button button-med button-create hand-on-hover" onClick={this.createNewHub}>Create New Hub</div>
																											</div>: "";
		return(
			<div className="page-block page-block-border center-block">
			
				{ headingDisplay }
				
				{ photographDisplay }
				
				<i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{display: "none"}}></i>
				
				<div style={{marginTop: marginTop, marginBottom: "100px", textAlign:"center"}}>
					{display}
					{spinnerUploadDisplay}
				</div>	
					
				<Modal show={this.state.showModal} onHide={this.close}>
	        <Modal.Header closeButton>
	          <Modal.Title style={{textAlign:"center"}}>Are you sure this photo goes with {this.state.selectedHubName} Timelapse?</Modal.Title>
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
		)
	}
}

export default withRouter(NewPhoto);