import { connect } from 'react-redux';
import * as UserActions from '../../actions/user_actions';
import { getCurrentUser } from '../../reducers/selectors';

import UserForm from './form';


const mapStateToProps = state => ({
	currentUser: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
	requestCurrentUser: () => dispatch(UserActions.requestCurrentUser()),
	updateCurrentUser: (formData, userId, avatarBool) => dispatch(UserActions.updateCurrentUser(formData, userId, avatarBool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);