import { connect } from 'react-redux';
import * as UserActions from '../../actions/user_actions';
import { getCurrentUser } from '../../reducers/selectors';

import LanguageSelection from './language_selection';


const mapStateToProps = state => ({
	currentUser: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
	requestCurrentUser: () => dispatch(UserActions.requestCurrentUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelection);