import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router';

const NavHeader = () => (
  <Navbar.Header>
    <Navbar.Brand>
			<Link to="/" className="text-3d navbar" style={{paddingBottom: "0px", marginBottom: "0px"}}>
				Stank <span>or</span> Dank
			</Link>
      
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
)
export default NavHeader;