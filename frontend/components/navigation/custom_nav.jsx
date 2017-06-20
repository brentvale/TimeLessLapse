import React from 'react';

import LoggedInNav from './logged_in_nav';
import LoggedOutNav from './logged_out_nav';

class CustomNav extends React.Component{
	constructor(){
		super();
		this.state = {
			currentUser: null,
			facebookMessage: "",
			longLivedAccessTokenObj: null,
			userLogInOrUp: ""
		};
		//allow for toggling current User in development
		this.toggleCurrentUser = this.toggleCurrentUser.bind(this);
		this.statusChangeCallback = this.statusChangeCallback.bind(this);
		this.testAPI = this.testAPI.bind(this);
		this.checkLoginState = this.checkLoginState.bind(this);
		this.tempCheckStatus = this.tempCheckStatus.bind(this);
		this.logOutFacebook = this.logOutFacebook.bind(this);
		this.logOutOfApp = this.logOutOfApp.bind(this);
	}
	
	componentDidMount(){
		let that = this;
	  window.fbAsyncInit = function() {
			FB.init({
			      appId      : '2297916030433483',
			      xfbml      : true,
			      version    : 'v2.9'
			    });
			FB.AppEvents.logPageView();

			let updateState = new Promise((resolve, reject) => {
				that.setState({fb:FB});
				resolve();
			});
			updateState.then(() => {
				that.tempCheckStatus();
			});
	  }.bind(this);

	  // Load the SDK asynchronously
	  (function(d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	    js = d.createElement(s); js.id = id;
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));
	}

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	testAPI() {
		let that = this;
	  this.state.fb.api('/me', function(response) {
	 		that.setState({facebookMessage: "Welcome!"});
	  });
	}
	
	logOutOfApp(){
		alert("Loggin out of app! (routes need to be set up)");
	}
	
	logOutFacebook(){
		let that = this;
		this.state.fb.getLoginStatus(function(response) {
			that.state.fb.logout(function(){
				that.setState({longLivedAccessTokenObj:null, currentUser:null});
				console.log("need to pass in that.props.updateCurrentUser to NULL");
			});
		});
	}
	
	// This is called with the results from from FB.getLoginStatus().
	statusChangeCallback(response, justChecking) {
	  let that = this;
	  if (response.status === 'connected') {
			console.log("connected");
	    // Logged into your app and Facebook.
			$.ajax({
				url: "/api/facebook/exchange_token",
				method: "POST",
				data: {
					facebook: {
						access_token: response.authResponse.accessToken
					}
				},
				success: function(resp){
					that.setState({longLivedAccessTokenObj: resp.long_token_info, userLogInOrUp: "none", currentUser: resp.long_token_info});
				},
				error: function(resp){
					console.log("error exchanging short access token for long term access token.  returns from api/facebook controller");
				}
			})
	  } else if (response.status === 'not_authorized') {
	    // The person is logged into Facebook, but not your app.
			
	    this.setState({facebookMessage: "Please log in to this app.",
											currentUser: null});
			if(justChecking){
				console.log("response.status === " + response.status);
			} else {
				this.state.fb.login(function(resp){
					that.statusChangeCallback(resp, true);
				},{scope: 'public_profile,email'});
			}
	  } else {
	    // The person is not logged into Facebook, so we're not sure if
	    // they are logged into this app or not.
	    this.setState({facebookMessage: "Please log in to facebook.",
										currentUser: null});
			if(justChecking){
				console.log("response.status === " + response.status);
			} else {
				this.state.fb.login(function(resp){
					that.statusChangeCallback(resp, true);
				},{scope: 'public_profile,email'});
			}
	  }
	}

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	checkLoginState() {
		var that = this;
	  this.state.fb.getLoginStatus(function(response) {
	    that.statusChangeCallback(response, false);
	  });
	}
	
	tempCheckStatus(){
		var that = this;
	  this.state.fb.getLoginStatus(function(response) {
	    that.statusChangeCallback(response, true);
	  });
	}
	
	toggleCurrentUser(){
		if(this.state.currentUser){
			this.setState({currentUser: null});
		} else {
			this.setState({currentUser: {id: 1, first_name: "brent", last_name: "vale"} });
		}
	}
	
	render(){
		if(this.state.currentUser){
			return <LoggedInNav checkLoginState={this.checkLoginState}
													currentUser={this.state.currentUser}
													handleSetState={this.handleSetState}
													logOutFacebook={this.logOutFacebook}
													logOutOfApp={this.logOutOfApp}
													longLivedAccessTokenObj={this.state.longLivedAccessTokenObj}
													toggleCurrentUser={this.toggleCurrentUser} 
													fb={this.state.fb} />;
		} else {
			return <LoggedOutNav checkLoginState={this.checkLoginState}
													 currentUser={null}
													 handleSetState={this.handleSetState}
													 longLivedAccessTokenObj={this.state.longLivedAccessTokenObj}
													 toggleCurrentUser={this.toggleCurrentUser} 
													 fb={this.state.fb} />;
		}
	}
}

export default CustomNav;