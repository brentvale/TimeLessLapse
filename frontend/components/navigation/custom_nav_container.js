import { connect } from 'react-redux';

import { getCurrentUser } from '../../reducers/selectors';
import CustomNav from './custom_nav';
import * as UserActions from '../../actions/user_actions';



const mapStateToProps = state => ({
	currentUser: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
	requestCurrentUser: () => dispatch(UserActions.requestCurrentUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomNav);