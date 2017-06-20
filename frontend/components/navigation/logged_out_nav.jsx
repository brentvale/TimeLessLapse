import React from 'react';

//COMPONENTS
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import NavHeader from './nav_header.js';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';

import NewSessionForm from '../sessions/new_session_form';
import ResetPasswordForm from '../sessions/reset_password_form';
import NewRegistrationForm from '../registrations/new_registration_form';

class LoggedOutNav extends React.Component{
	constructor(){
		super();
		this.state = {
			//values 
			//"none" => both modals are closed
			//"signUp" => signUp modal open
			//"logIn" => logIn modal open
			//"email" => send password reset modal open
			userLogInOrUp: "none"
		};
		this.launchModal = this.launchModal.bind(this);
		this.setUserSigningInOrUp = this.setUserSigningInOrUp.bind(this);
		this.modalDisplayFromState = this.modalDisplayFromState.bind(this);
		this.closeModals  = this.closeModals.bind(this);
	}
	//call by passing "none", "signUp", "logIn", "email"
	setUserSigningInOrUp(newStateString){
		this.setState({userLogInOrUp: newStateString});
	}
	
	closeModals(){
		this.setState({
			userLogInOrUp: "none"
		});
	}
	
	launchModal(e){
		switch($(e.currentTarget).attr("id")){
		case "logIn":
			this.setState({userLogInOrUp: "logIn"});
			break;
		case "signUp":
			this.setState({userLogInOrUp: "signUp"});
			break;
		}
	}
	
	modalDisplayFromState(){
		let {setUserSigningInOrUp, longLivedAccessTokenObj, fb, checkLoginState} = this.props;
		switch(this.state.userLogInOrUp){
		case "signUp":
			return <NewRegistrationForm closeModals={this.closeModals} 
																	setUserSigningInOrUp={this.setUserSigningInOrUp}
																	longLivedAccessTokenObj={longLivedAccessTokenObj}
																	fb={fb}
																	checkLoginState={checkLoginState}/>;
		case "logIn":
			return <NewSessionForm closeModals={this.closeModals} 
														 setUserSigningInOrUp={this.setUserSigningInOrUp}
														 longLivedAccessTokenObj={longLivedAccessTokenObj}
														 fb={fb}
														 checkLoginState={checkLoginState}/>;
 		case "email":
 			return <ResetPasswordForm closeModals={this.closeModals} 
 														 		setUserSigningInOrUp={this.setUserSigningInOrUp}
																longLivedAccessTokenObj={longLivedAccessTokenObj}
																fb={fb}
																checkLoginState={checkLoginState}/>;
		default :
			return "";
		}
	}
	
	render(){
		const { currentUser, toggleCurrentUser, longLivedAccessTokenObj} = this.props;
		
		let logInOrUpModal = this.modalDisplayFromState();
		
		let navRight;
		if(!currentUser){
		   navRight =	<Nav pullRight>
										<NavItem eventKey={1} onClick={this.launchModal} id="logIn">Log In</NavItem>
					
										<NavItem eventKey={2} onClick={this.launchModal} id="signUp">Sign Up</NavItem>
          
					        </Nav>
		} else {
			navRight = <p style={{width: "50px"}}>longLivedAccessTokenObj</p>
		}
		
	  return (
			<div>
		    <Navbar collapseOnSelect style={{borderRadius: "0px", marginBottom: "0px"}}>
			
		      <NavHeader/>
    
		      <Navbar.Collapse>
						{ navRight }
		      </Navbar.Collapse>
		    </Navbar>
				{logInOrUpModal}
			</div>
	  );
	}
}

export default LoggedOutNav;