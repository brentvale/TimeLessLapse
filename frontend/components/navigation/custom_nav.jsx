import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router';

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
	  const {currentUser} = this.props;
		
		let navItemSignInOrOut, brandContent, hubsLink, profileLink;
		if(currentUser){
    	navItemSignInOrOut =  <NavItem  href="/users/sign_out"
                      								rel="nofollow" 
                      								data-method="delete">Sign Out</NavItem>
			brandContent = <Link to={"/take_photo"}>
												<i className="fa fa-camera" aria-hidden="true"></i>
										 </Link>;
			hubsLink = <NavItem href={"/"}>
									 Hubs
								 </NavItem>;
			profileLink = <NavItem href={"#/edit_user"}>
											Profile
									 	</NavItem>;
		} else {
    	navItemSignInOrOut =  <NavItem  href="/users/sign_in"
                      								rel="nofollow"
																			onClick={this.navigateToSignIn}>Sign In</NavItem>
			brandContent = <a href="/">TimeLessLapse</a>;
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
						{navItemSignInOrOut}
	        </Nav>
	      </Navbar.Collapse>
	    </Navbar>
	  );
	}
}

export default CustomNav;