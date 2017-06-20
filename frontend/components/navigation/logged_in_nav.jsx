import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import NavHeader from './nav_header.js';

class LoggedInNav extends React.Component {
	//workaround to issue:
	constructor(){
		super();
		this.state = {
			
		}
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(e) {
	  if (this.props.disabled) {
	    e.preventDefault();
	  } else {
	    if (this.props.onSelect) {
	      this.props.onSelect(this.props.eventKey, e);
	    }      
	  }
	}
	
	render(){
		let { currentUser, toggleCurrentUser, logOutFacebook } = this.props;
		
		return(
	    <Navbar collapseOnSelect style={{borderRadius: "0px"}}>
				
				<NavHeader/>
    
	      <Navbar.Collapse>
					<Nav pullRight>
						<NavDropdown eventKey={1} title="Settings" id="basic-nav-dropdown">
							<MenuItem eventKey={1.1} onClick={logOutFacebook}>Log Out of Facebook (and app)</MenuItem>
			        <MenuItem eventKey={1.2}>Log Out of App ONLY</MenuItem>
			      </NavDropdown>
					</Nav>
		
	      </Navbar.Collapse>
	    </Navbar>
		)
	}
}

export default LoggedInNav;