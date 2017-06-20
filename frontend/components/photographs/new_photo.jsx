import React from 'react';
import FileInput from 'react-file-input';
import {Layer, Rect, Stage, Group} from 'react-konva';
import * as ReactKonva from 'react-konva';

class NewPhoto extends React.Component{
	constructor(){
		super();
		this.state = {
			uploadedFile: null,
			step: 1,
			imagePreview: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
					that.setState({step: 2})
				},
				error: (resp) => {
					debugger
				}
			});
    }

    if (this.state.uploadedFile) {
      reader.readAsDataURL(this.state.uploadedFile);
    } 
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
	
	stepFromState(){
		let display;
		switch(this.state.step){
		case 1:
			let imagePreview = (this.state.imagePreview) ? <ReactKonva.Stage width={200} height={200}>
			        																				<ReactKonva.Layer>
																												<ReactKonva.Image image={this.state.imagePreview} height={150} width={200}/>
																							        </ReactKonva.Layer>
																										</ReactKonva.Stage>:
																										"";
			display = <form onSubmit={this.handleSubmit} style={{marginTop: "30px"}}>
									{imagePreview}
				          <FileInput name="companyDocument"
				                     accept=".jpg,.jpeg,.pdf"
				                     className="image-upload"
				                     onChange={this.handleChange}/>
									
				          <input type="submit" className="btn btn-default" value="Upload" style={{width: "100px"}}/>
				        </form>
			break;
		case 2:
			display = <div>SELECT WHICH TIMELAPSE THIS GOES TO</div>
			break;
		}
		return display;
	}
	
	render(){
		let display = this.stepFromState();
		
		return(
			<div>
				
				{display}
			</div>
		)
	}
}

export default NewPhoto;