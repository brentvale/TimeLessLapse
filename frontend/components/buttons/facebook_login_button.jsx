// import React from 'react';
//
// class FacebookLoginButton extends React.Component{
// 	constructor(){
// 		super();
// 		this.state = {
// 			facebookMessage: ""
// 		}
// 		this.statusChangeCallback = this.statusChangeCallback.bind(this);
// 		this.testAPI = this.testAPI.bind(this);
// 		this.checkLoginState = this.checkLoginState.bind(this);
// 		this.logOutFacebook = this.logOutFacebook.bind(this);
//
// 	}
//
// 	componentDidMount(){
// 		let that = this;
// 	  window.fbAsyncInit = function() {
// 	    FB.init({
// 	      appId      : '2297916030433483',
// 	      cookie     : true,  // enable cookies to allow the server to access
// 	                        // the session
// 	      xfbml      : true,  // parse social plugins on this page
// 	      version    : 'v2.9' // use version 2.1
// 	    });
//
// 	    // Now that we've initialized the JavaScript SDK, we call
// 	    // FB.getLoginStatus().  This function gets the state of the
// 	    // person visiting this page and can return one of three states to
// 	    // the callback you provide.  They can be:
// 	    //
// 	    // 1. Logged into your app ('connected')
// 	    // 2. Logged into Facebook, but not your app ('not_authorized')
// 	    // 3. Not logged into Facebook and can't tell if they are logged into
// 	    //    your app or not.
// 	    //
// 	    // These three cases are handled in the callback function.
// 	    that.setState({fb: FB});
// 			that.checkLoginState();
// 	  }.bind(this);
//
// 	  // Load the SDK asynchronously
// 	  (function(d, s, id) {
// 	    var js, fjs = d.getElementsByTagName(s)[0];
// 	    if (d.getElementById(id)) return;
// 	    js = d.createElement(s); js.id = id;
// 	    js.src = "//connect.facebook.net/en_US/sdk.js";
// 	    fjs.parentNode.insertBefore(js, fjs);
// 	  }(document, 'script', 'facebook-jssdk'));
// 	}
//
// 	// Here we run a very simple test of the Graph API after login is
// 	// successful.  See statusChangeCallback() for when this call is made.
// 	testAPI() {
// 		let that = this;
// 	  console.log('Welcome!  Fetching your information.... ');
// 	  this.state.fb.api('/me', function(response) {
// 	  	console.log('Successful login for: ' + response.name);
// 	 		that.setState({facebookMessage: "Welcome!"});
// 			that.props.updateCurrentUser({currentUser: response});
// 	  });
// 	}
//
// 	// This is called with the results from from FB.getLoginStatus().
// 	statusChangeCallback(response) {
// 	  let that = this;
// 	  if (response.status === 'connected') {
// 	    // Logged into your app and Facebook.
// 	    this.testAPI();
// 	  } else if (response.status === 'not_authorized') {
// 	    // The person is logged into Facebook, but not your app.
// 	    this.setState({facebookMessage: "Please log in to this app.",
// 											currentUser: null});
// 			this.state.fb.login(function(resp){
// 				that.statusChangeCallback(resp);
// 			},{scope: 'public_profile,email'});
// 	  } else {
// 	    // The person is not logged into Facebook, so we're not sure if
// 	    // they are logged into this app or not.
// 	    this.setState({facebookMessage: "Please log in to facebook.",
// 										currentUser: null});
// 			this.state.fb.login(function(resp){
// 				that.statusChangeCallback(resp);
// 			},{scope: 'public_profile,email'});
// 	  }
// 	}
//
// 	// This function is called when someone finishes with the Login
// 	// Button.  See the onlogin handler attached to it in the sample
// 	// code below.
// 	checkLoginState() {
// 		var that = this;
// 	  this.state.fb.getLoginStatus(function(response) {
// 	    that.statusChangeCallback(response);
// 	  });
// 	}
//
// 	logOutFacebook(){
// 		let that = this;
// 		this.state.fb.logout(function(){
// 			that.setState({facebookMessage: "Please log in to facebook."});
// 			that.props.updateCurrentUser(null);
// 		});
// 	}
//
// 	handleFacebookLogin(){
// 		debugger
// 		$.ajax({
// 			url: "/users/auth/facebook/callback",
// 			method: "POST",
// 			success: function(resp){
// 				debugger
// 			},
// 			error: function(resp){
// 				debugger
// 			}
// 		})
// 	}
//
// 	render(){
// 		let {currentUser} = this.props;
// 		let facebookLoginButton, facebookLogoutButton;
// 		if(currentUser){
// 			facebookLoginButton = "";
// 			facebookLogoutButton = <div style={{color: "white", backgroundColor: "blue", display: "inline-block"}}
// 																	onClick={this.logOutFacebook}>LOG OUT</div>;
// 		}else {
// 			// facebookLoginButton = <div style={{color: "white", backgroundColor: "blue", display: "inline-block"}}
// // 																 onClick={this.checkLoginState}>FACEBOOK LOGIN</div>;
//  			facebookLoginButton = <div style={{color: "white", backgroundColor: "blue", display: "inline-block"}}
//  																 onClick={this.handleFacebookLogin}>FACEBOOK LOGIN</div>;
// 			facebookLogoutButton = "";
// 		}
// 		return(
//
// 			<div>
// 				{facebookLoginButton}
// 				<div id="status">
// 					{this.state.facebookMessage}
// 				</div>
// 				{facebookLogoutButton}
// 			</div>
//
// 		)
// 	}
// }
//
// export default FacebookLoginButton;