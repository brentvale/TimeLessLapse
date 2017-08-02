import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router';

import language from '../../util/language';

class CustomNav extends React.Component {
	constructor(){
		super();
		this.navigateToSignIn = this.navigateToSignIn.bind(this);
	}
	
	componentDidMount(){
		this.props.requestCurrentUser();
	}
	
	navigateToSignIn(){
		window.location.replace('/users/sign_in');
	}
	
	render(){
	  const {currentUser, selectedLanguage} = this.props;
		
		let navItemSignIn, navItemSignUp, navItemSignOut, brandContent, hubsLink, profileLink;
		
		
		if(currentUser){
			navItemSignIn = "";
			navItemSignUp = "";
    	navItemSignOut =  <NavItem  href="/users/sign_out"
                      								rel="nofollow" 
                      								data-method="delete">{language.navigation.sign_out[selectedLanguage]}</NavItem>
			brandContent = <Link to={"/take_photo"}>
												<i className="fa fa-camera" aria-hidden="true"></i>
										 </Link>;
			hubsLink = <NavItem href={"/"}>
									 {language.navigation.hubs[selectedLanguage]}
								 </NavItem>;
			profileLink = <NavItem href={"#/edit_user"}>
											{language.navigation.profile[selectedLanguage]}
									 	</NavItem>;
		} else {
    	navItemSignIn =  <NavItem  href={`/users/sign_in?langId=${selectedLanguage}`}
																			onClick={this.navigateToSignIn}>{language.navigation.log_in[selectedLanguage]}</NavItem>
    	navItemSignUp =  <NavItem  href={`/users/sign_up?langId=${selectedLanguage}`}
																			onClick={this.navigateToSignIn}>{language.navigation.sign_up[selectedLanguage]}</NavItem>
			navItemSignOut = "";
			brandContent = <a href={`?langId=${selectedLanguage}`}>TimeLessLapse</a>;
			hubsLink = "";
			profileLink = "";
		}
  
	  return(
	    <Navbar fixedTop style={{borderRadius: "0px", marginBottom: "0px"}}>
	      <Navbar.Header>
	        <Navbar.Brand>
						{brandContent}
	        </Navbar.Brand>
	        <Navbar.Toggle />
	      </Navbar.Header>
    
	      <Navbar.Collapse>
	        <Nav>
	          
	        </Nav>
    
	        <Nav pullRight>
						{profileLink}
						{hubsLink}
						{navItemSignIn}
						{navItemSignUp}
						{navItemSignOut}
	        </Nav>
	      </Navbar.Collapse>
	    </Navbar>
	  );
	}
}

export default CustomNav;