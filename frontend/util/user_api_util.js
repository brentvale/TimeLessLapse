import {
  receiveCurrentUser
} from '../actions/user_actions';

export const fetchCurrentUser = () => (
  $.ajax({
    method: 'GET',
    url: `/api/users/current_user`
  })
);

export const updateCurrentUser = (formData, userIdObj, avatarBool) => {
	if(avatarBool){
		return(
		  $.ajax({
		    method: 'PATCH',
		    url: `/api/users/${userIdObj.userId}`,
	      processData: false,
	      contentType: false,
				dataType: 'json',
				data: formData
		  })
		)
		      
	} else {
		return(
		  $.ajax({
		    method: 'PATCH',
		    url: `/api/users/${userIdObj.userId}`,
				data: formData
		  })
		)
	}  
};