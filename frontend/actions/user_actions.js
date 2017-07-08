import * as APIUtil from '../util/user_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

//async actions
export function requestCurrentUser(){
	return(dispatch) => {
		return APIUtil.fetchCurrentUser().then(obj => dispatch(receiveCurrentUser(obj)) );
	};
}

export function updateCurrentUser(formData, userIdObj, avatarBool){
	return(dispatch) => {
		return APIUtil.updateCurrentUser(formData, userIdObj, avatarBool).then(obj => dispatch(receiveCurrentUser(obj)) );
	};
}

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: currentUser
});

// export const signup = user => dispatch => (
//   APIUtil.signup(user).then(function(user){
// 		dispatch(receiveCurrentUser(user))
//   }, err => (
//     dispatch(receiveErrors(err.responseJSON))
//   ))
// );
//
// export const login = user => dispatch => (
//   APIUtil.login(user).then(user => (
//     dispatch(receiveCurrentUser(user))
//   ), err => (
//     dispatch(receiveErrors(err.responseJSON))
//   ))
// );
//
// export const logout = () => dispatch => (
//   APIUtil.logout().then(user => (
//     dispatch(receiveCurrentUser(null))
//   ))
// );