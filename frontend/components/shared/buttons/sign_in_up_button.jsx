import React from 'react';
import {Button} from 'react-bootstrap';

const SignInUpButton = ({ buttonText, clickFunction, icon }) => {
	let displayIcon = (icon) ? icon : "";

  return (
	  <Button bsSize="large" style={{height: "5em", fontSize: "1em", backgroundColor: "#fff"}} block onClick={clickFunction}>
			 <p className="center-block">
			 	{buttonText}
				{displayIcon}
			 </p>
		</Button>
  );
}

export default SignInUpButton;


