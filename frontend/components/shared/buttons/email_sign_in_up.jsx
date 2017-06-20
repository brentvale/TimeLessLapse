import React from 'react';
import {Button} from 'react-bootstrap';

const EmailSignInUp = ({ buttonText, nextStep }) => {
  return (
    <Button bsSize="large" style={{height: "5em", fontSize: "1em", backgroundColor: "#fff"}} block onClick={nextStep}>
			 <p className="center-block google">
			 	<i className="fa fa-envelope-o" aria-hidden="true" style={{float:"left", fontSize:"1.5em"}}></i>
				{buttonText}
			 </p>
		</Button>
  );
}

export default EmailSignInUp;