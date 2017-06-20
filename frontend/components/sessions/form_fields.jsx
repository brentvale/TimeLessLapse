import React from 'react';
import SignInUpButton from '../shared/buttons/sign_in_up_button';

class SessionFormFields extends React.Component{
	constructor(){
		super();
		this.state = {
			emailAddress: "",
			password: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.navigateToForgotEmail = this.navigateToForgotEmail.bind(this);
	}
	
	handleChange(e){
		const targetId = $(e.currentTarget).attr("id");
		const newValue = $(e.currentTarget).val();
		switch(targetId){
		case "emailAddress":
			this.setState({emailAddress: newValue});
			break;
		case "password":
			this.setState({password: newValue});
			break;
		}
	}
	
	navigateToForgotEmail(){
		this.props.setUserSigningInOrUp("email");
	}
	
	submitForm(){
		alert("signing in - even though you may have left all fields blank.  Check for checked 'remember me' box before submit");
		this.props.closeModals();
	}
	
	render(){																			 
		return(
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
								
				<input type="password" 
							 style={{display:"none"}}
							 tabIndex="-1"
							 aria-hidden="true"/>
				<input id="password" 
							 type="password" 
							 className="registration-form" 
							 onChange={this.handleChange} 
							 value={this.state.password}
							 placeholder="Enter Password"
							 aria-label="Enter Password"
							 autoComplete="new-password"/>
							 
				<div>
					<label>
							 <input type="checkbox" id="remember_me" />
							 <span style={{marginLeft: "0.5em"}}>Remember me</span>
					</label>
					<span id="forgotPasswordLink" 
							 	className="hand-on-hover"
							 	onClick={this.navigateToForgotEmail}>Forgot Password?</span>
				</div>
							 
				<div>
					<SignInUpButton buttonText="Sign In" clickFunction={this.submitForm}/>
				</div>
					 
							 
			</form>
		)
	}
}

export default SessionFormFields;