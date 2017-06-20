import React from 'react';

//COMPONENTS
import {Modal, Button} from 'react-bootstrap';

//GLOBAL VARIABLES
import { tabletBreakPoint } from '../../util/global_variables';

class ResetPasswordForm extends React.Component{
	constructor(){
		super();
		this.state = {
			showModal: true,
			lessThanTabletBreakSize: window.innerWidth < tabletBreakPoint
		};
		this.changeStateSizeIfBreakpointReached = this.changeStateSizeIfBreakpointReached.bind(this);
		this.sendResetLink = this.sendResetLink.bind(this);
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}
	
	changeStateSizeIfBreakpointReached(){
		if(window.innerWidth < tabletBreakPoint){
			this.setState({lessThanTabletBreakSize: true});
		} else {
			this.setState({lessThanTabletBreakSize: false});
		}
	}
	
	sendResetLink(){
		alert("sending link to reset password.  Even if no email entered");
		this.props.closeModals();
	}
	
	render(){
		const { closeModals } = this.props;
		//#454545 = scss $tundora
		//#f9f9f9 = scss $alabaster
		const modalHeader = (this.state.lessThanTabletBreakSize) ?  <Modal.Header style={{backgroundColor: "#f9f9f9", color: "#454545"}} closeButton>
																											            <Modal.Title style={{textAlign: "center", fontSize: "1em"}}>Reset Password</Modal.Title>
																											          </Modal.Header> :
			 																													"";
		
		return(
				<Modal show={this.state.showModal} 
							 onHide={closeModals}
							 dialogClassName="custom-modal"
							 id="logInModal">
					<Modal.Header style={{backgroundColor: "#f9f9f9", color: "#454545"}} closeButton>
            <Modal.Title style={{textAlign: "center", fontSize: "1em"}}>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body id="logInForms" className="center-block" style={{minHeight:"800px", minHeight:"95vh"}}>
						<p style={{width: "100%", letterSpacing: "1.3px", marginBottom: "1em"}}>Enter the email address associated with your account, and we&#39;ll email you a link to reset your password.</p>
						<form id="signInForm">			
							<input type="text" 
										 style={{display:"none"}}
										 tabIndex="-1"
										 aria-hidden="true"/>
							<input id="emailAddress" 
											type="text" 
											className="registration-form" 
											onChange={this.handleChange} 
											value={this.state.emailAddress}
											placeholder="Enter Email Address"
											autoComplete="new-email"/>
						</form>	 
											
						<hr></hr>
						
            <Button bsSize="large" style={{height: "4em", fontSize: "1em", backgroundColor: "#fff"}} onClick={this.sendResetLink}>
							 Send Reset Link
						</Button>
						
          </Modal.Body>
        </Modal>
		)
	}
};

export default ResetPasswordForm;
