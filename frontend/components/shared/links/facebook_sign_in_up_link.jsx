import React from 'react';

const FacebookSignInUpLink = ({ handleSignUpWithFacebook }) => {
  return (
	  <a onClick={handleSignUpWithFacebook} alt="Facebook Login" >Facebook</a>
  );
}

export default FacebookSignInUpLink;