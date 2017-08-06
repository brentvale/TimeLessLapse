import { connect } from 'react-redux';
import * as HubActions from '../../actions/hub_actions';
import { getAllHubs, getCurrentUser } from '../../reducers/selectors';
import * as UserActions from '../../actions/user_actions';
 
import HubIndex from './hub_index';


const mapStateToProps = (state, ownProps) => {
	return {
		hubs: getAllHubs(state),
		currentUser: getCurrentUser(state),
		selectedLanguage: ownProps.selectedLanguage
	}
}

const mapDispatchToProps = dispatch => ({
  requestHubs: () => dispatch(HubActions.requestHubs()),
	requestCurrentUser: () => dispatch(UserActions.requestCurrentUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HubIndex);