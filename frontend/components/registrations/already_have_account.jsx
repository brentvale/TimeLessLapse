import React from 'react';
import { Button } from 'react-bootstrap';

class AlreadyHaveAccount extends React.Component{
	constructor(){
		super();
		this.handleNavigateToLogIn = this.handleNavigateToLogIn.bind(this);
	}
	
	handleNavigateToLogIn(){
		this.props.setUserSigningInOrUp("logIn");
	}
	
	render(){
		return(
			<div style={{height: "100px"}}>
				<div style={{display: "inline-block", width:"59%"}}>
					<p style={{width: "100%"}}>Already have an account?</p>
				</div>

				<div style={{display: "inline-block", textAlign:"right", width: "39%"}}>
		      <Button bsSize="large" style={{height: "3em", width:"100px" , fontSize: "1em", backgroundColor: "#fff"}} onClick={this.handleNavigateToLogIn}>
						 Log in
					</Button>
				</div>
			</div>
		)
	}
}

export default AlreadyHaveAccount;				