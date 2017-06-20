import React from 'react';
import SignInUpButton from '../shared/buttons/sign_in_up_button';
import SignUpDisclaimer from './sign_up_disclaimer';

class RegistrationFormFields extends React.Component{
	constructor(){
		super();
		this.state = {
			firstName: "",
			lastName: "",
			emailAddress: "",
			password: "",
			confirmPassword: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	
	handleChange(e){
		const targetId = $(e.currentTarget).attr("id");
		const newValue = $(e.currentTarget).val();
		switch(targetId){
		case "firstName":
			this.setState({firstName: newValue});
			break;
		case "lastName":
			this.setState({lastName: newValue});
			break;
		case "emailAddress":
			this.setState({emailAddress: newValue});
			break;
		case "password":
			this.setState({password: newValue});
			break;
		case "confirmPassword":
			this.setState({confirmPassword: newValue});
			break;
		}
	}
	
	submitForm(){
		alert("signing up - even though you may have left all fields blank");
		this.props.closeModals();
	}
	
	render(){																						 
		return(
			<form id="signUpForm">			
				<input id="firstName" 
								type="text" 
								className="registration-form" 
								onChange={this.handleChange} 
								value={this.state.firstName}
								placeholder="First name"
								autoFocus={false}/>
				<input id="lastName" 
								type="text" 
								className="registration-form" 
								onChange={this.handleChange} 
								value={this.state.lastName}
								placeholder="Last name"
								autoFocus={false}/>
								
 				<input type="text" 
 							 style={{display:"none"}}
 							 tabIndex="-1"
 							 aria-hidden="true"/>
				<input id="emailAddress" 
								type="text" 
								className="registration-form" 
								onChange={this.handleChange} 
								value={this.state.emailAddress}
								placeholder="Email Address"
								autoComplete="new-email"
								autoFocus={false}/>
								
				<input type="password" 
							 style={{display:"none"}}
							 tabIndex="-1"
							 aria-hidden="true"/>
				<input id="password" 
							 type="password" 
							 className="registration-form" 
							 onChange={this.handleChange} 
							 value={this.state.password}
							 placeholder="Create a Password"
							 aria-label="Create a Password"
							 autoComplete="new-password"
							 autoFocus={false}/>
							 
				<input type="password" 
							 style={{display:"none"}}
							 tabIndex="-1"
							 aria-hidden="true"/>
				<input id="confirmPassword" 
							 type="password" 
							 className="registration-form" 
							 onChange={this.handleChange} 
							 value={this.state.confirmPassword}
							 placeholder="Re-type Password"
							 aria-label="Re-type Password"
							 autoComplete="new-password"
							 autoFocus={false}/>
							 
				<SignUpDisclaimer />
							 
				<SignInUpButton buttonText="Sign Up" clickFunction={this.submitForm}/>	 
							 
			</form>
		)
	}
}

export default RegistrationFormFields;