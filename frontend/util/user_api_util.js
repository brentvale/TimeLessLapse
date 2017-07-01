import {
  receiveCurrentUser
} from '../actions/user_actions';

export const fetchCurrentUser = () => (
  $.ajax({
    method: 'GET',
    url: `/api/users/current_user`
  })
);

export const updateCurrentUser = (formData) => (
  $.ajax({
    method: 'POST',
    url: `/api/users/${formData.userId}`,
		data: {
			user: {
				website_url: formData.websiteUrl,
				tag_line: formData.tagLine,
				first_name: formData.firstName,
				last_name: formData.lastName
			}
		}
  })
);