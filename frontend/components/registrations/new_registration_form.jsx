import React from 'react';

//COMPONENTS
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import FacebookSignInUp from '../shared/buttons/facebook_sign_in_up';
import FacebookSignInUpLink from '../shared/links/facebook_sign_in_up_link';
import EmailSignInUp from '../shared/buttons/email_sign_in_up';
import RegistrationFormFields from './form_fields';
import SignUpDisclaimer from './sign_up_disclaimer';
import AlreadyHaveAccount from './already_have_account';


//GLOBAL VARIABLES
import { tabletBreakPoint, companyName } from '../../util/global_variables';

class NewRegistrationForm extends React.Component{
	constructor(){
		super();
		this.state = {
			showModal: true,
			lessThanTabletBreakSize: window.innerWidth < tabletBreakPoint,
			step: 1
		};
		this.changeStateSizeIfBreakpointReached = this.changeStateSizeIfBreakpointReached.bind(this);
		this.navigateToLogIn = this.navigateToLogIn.bind(this);
		this.sectionFromStateStep = this.sectionFromStateStep.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.handleSignUpWithFacebook = this.handleSignUpWithFacebook.bind(this);
	}
	
	changeStateSizeIfBreakpointReached(){
		if(window.innerWidth < tabletBreakPoint){
			this.setState({lessThanTabletBreakSize: true});
		} else {
			this.setState({lessThanTabletBreakSize: false});
		}
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}
	handleSignUpWithFacebook(){
		this.setState({step: 1})
	}
	navigateToLogIn(){
		//change the state in parent element 
		this.props.setUserSigningInOrUp("logIn");
	}
	
	nextStep(){
		const nextStepNum = this.state.step + 1;
		this.setState({step: nextStepNum});
	}
	
	sectionFromStateStep(){
		switch(this.state.step){
		case 1:
			return (<div>

			<FacebookSignInUp fbId="facebookSignUp" 
											 klass="sign-up-with-btn" 
											 buttonText="Sign up with Facebook"
			 								 closeModals={this.props.closeModals}
											 longLivedAccessTokenObj={this.props.longLivedAccessTokenObj}
											 fb={this.props.fb}
											 checkLoginState={this.props.checkLoginState}/>	    
			 
				<div style={{position: "relative", textAlign: "center", marginTop: "1em"}}>
					 <span style={{padding:"1em", backgroundColor: "#fff", marginTop: "10px"}}>or</span>
					 <hr style={{marginBottom: "1.8em", marginTop: "-0.8em"}}></hr>
				</div>
			 
		    <EmailSignInUp buttonText="Sign up with Email" nextStep={this.nextStep}/>
	
				<SignUpDisclaimer />
					
				<hr></hr>
			
				<AlreadyHaveAccount setUserSigningInOrUp={this.props.setUserSigningInOrUp}/>
				
			</div>);
		case 2:
			return (<div>
				<div style={{textAlign: "center"}}>
					<p style={{width:"100%"}}>Sign up with <FacebookSignInUpLink handleSignUpWithFacebook={this.handleSignUpWithFacebook}/></p>
				</div>
				
				<div style={{position: "relative", textAlign: "center", marginTop: "1em"}}>
					 <span style={{padding:"1em", backgroundColor: "#fff", marginTop: "10px"}}>or</span>
					 <hr style={{marginBottom: "1.8em", marginTop: "-0.8em"}}></hr>
				</div>
				
				<RegistrationFormFields closeModals={this.props.closeModals}/>
				
				<hr></hr>	
				
				<AlreadyHaveAccount setUserSigningInOrUp={this.props.setUserSigningInOrUp}/>
				
			</div>);
		}
	}
	
	render(){
		const { closeModals } = this.props;
		//#454545 = scss $tundora
		//#f9f9f9 = scss $alabaster
		const modalHeader = (this.state.lessThanTabletBreakSize) ?  <Modal.Header style={{backgroundColor: "#f9f9f9", color: "#454545"}} closeButton>
																											            <Modal.Title style={{textAlign: "center", fontSize: "1em"}}>Sign Up</Modal.Title>
																											          </Modal.Header> :
			 																													"";
		let stepDisplay = this.sectionFromStateStep();
		
		return(
				<Modal show={this.state.showModal} 
							 onHide={closeModals}
							 dialogClassName="custom-modal"
							 id="signUpModal">
					{ modalHeader }
          <Modal.Body id="signUpForms" className="center-block col-xs-12" style={{backgroundColor: "#fff"}}>
            <h2 className="small" style={{paddingBottom: "1em", letterSpacing:"1.3px"}}>Time to join the #1 rating site in the wolrd. Fasten your seatbelt.  Hold your face in place.  Lets rock n roll!</h2>
							 
						{stepDisplay}
						
          </Modal.Body>
        </Modal>
		)
	}
};

export default NewRegistrationForm;
