import React from 'react';
import {Button} from 'react-bootstrap';


class FacebookSignInUp extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}
	
	
	render(){
		if(!this.props.fb){
			return <div>Loading...</div>;
		}
		
		const {buttonText, fbId, klass} = this.props;
	  return (
		  <Button bsSize="large"  className={klass} id={fbId} block onClick={this.props.checkLoginState}>
				 <p className="center-block">
				 	<i className="fa fa-facebook" aria-hidden="true" style={{float:"left", fontSize:"1.5em"}}></i>
					{buttonText}
				 </p>
			</Button>
		)
	}
}

export default FacebookSignInUp;