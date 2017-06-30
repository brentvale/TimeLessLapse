import {
  receiveCurrentUser
} from '../actions/user_actions';

export const fetchCurrentUser = () => (
  $.ajax({
    method: 'GET',
    url: `/api/users/current_user`
  })
);