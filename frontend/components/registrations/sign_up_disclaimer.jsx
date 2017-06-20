import React from 'react';
import { Link } from 'react-router';


class SignUpDisclaimer extends React.Component {
	render(){
		return(
				<p className="terms-agreement">
					By signing up I agree to Stank Or Dank&#39;s&nbsp;
					<a href="#/terms_of_service" >
						Terms of Service
					</a> and&nbsp;
					<a href="#/payment_terms_of_service">
						Payments Terms of Service
					</a>
				</p>
		)
	}
}

export default SignUpDisclaimer;

