import React from 'react';

//COMPONENTS
import {Modal, Button} from 'react-bootstrap';
import FacebookSignInUp from '../shared/buttons/facebook_sign_in_up';
import EmailSignInUp from '../shared/buttons/email_sign_in_up';
import SessionFormFields from './form_fields';

//GLOBAL VARIABLES
import { tabletBreakPoint } from '../../util/global_variables';

class NewSessionForm extends React.Component{
	constructor(){
		super();
		this.state = {
			showModal: true,
			lessThanTabletBreakSize: window.innerWidth < tabletBreakPoint
		};
		this.changeStateSizeIfBreakpointReached = this.changeStateSizeIfBreakpointReached.bind(this);
		this.navigateToSignUp = this.navigateToSignUp.bind(this);
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}
	
	changeStateSizeIfBreakpointReached(){
		if(window.innerWidth < tabletBreakPoint){
			this.setState({lessThanTabletBreakSize: true});
		} else {
			this.setState({lessThanTabletBreakSize: false});
		}
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.changeStateSizeIfBreakpointReached);
	}
	
	navigateToSignUp(){
		//change the state in parent element 
		this.props.setUserSigningInOrUp("signUp");
	}
	
	render(){
		const { closeModals, setUserSigningInOrUp, longLivedAccessTokenObj,fb, checkLoginState } = this.props;
		//#454545 = scss $tundora
		//#f9f9f9 = scss $alabaster
		const modalHeader = (this.state.lessThanTabletBreakSize) ?  <Modal.Header style={{backgroundColor: "#f9f9f9", color: "#454545"}} closeButton>
																											            <Modal.Title style={{textAlign: "center", fontSize: "1em"}}>Log In</Modal.Title>
																											          </Modal.Header> :
			 																													"";
		
		return(
				<Modal show={this.state.showModal} 
							 onHide={closeModals}
							 dialogClassName="custom-modal"
							 id="logInModal">
					{ modalHeader }
          <Modal.Body id="logInForms" className="center-block col-xs-12" style={{backgroundColor: "#fff"}}>
					
            <FacebookSignInUp fbId="facebookLogIn" 
														 klass="log-in-with-btn" 
														 buttonText="Log in with Facebook"
						 								 closeModals={closeModals}
														 longLivedAccessTokenObj={longLivedAccessTokenObj}
														 fb={fb}
														 checkLoginState={checkLoginState}/>
							 
						<div style={{position: "relative", textAlign: "center", marginTop: "1em"}}>
							 <span style={{padding:"1em", backgroundColor: "#fff", marginTop: "10px"}}>or</span>
							 <hr style={{marginBottom: "1.8em", marginTop: "-0.8em"}}></hr>
						</div>
							 
            <SessionFormFields closeModals={closeModals} 
															 setUserSigningInOrUp={setUserSigningInOrUp}/>
					
						<hr></hr>
							
						<div>
							<div style={{display: "inline-block", width:"59%"}}>
								<p style={{width: "100%"}}>Don&#39;t have an account?</p>
							</div>
							
							<div style={{display: "inline-block", textAlign:"right", width: "39%"}}>
		            <Button bsSize="large" style={{height: "3em", width:"100px" , fontSize: "1em", backgroundColor: "#fff"}} onClick={this.navigateToSignUp}>
									 Sign up
								</Button>
							</div>
						</div>
						
          </Modal.Body>
        </Modal>
		)
	}
};

export default NewSessionForm;
