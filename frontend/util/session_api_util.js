import {
  receiveCurrentUser,
  receiveErrors
} from '../actions/session_actions';

export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/users/sign_in.json',
    data: user
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/users.json',
    data: user
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/users/sign_out.json'
  })
);

export const facebookLogin = () => {

	
	$.ajax({
		url: "#{window.location.protocol}//connect.facebook.net/en_US/all.js",
    dataType: 'script',
    cache: true
	})
}
	
