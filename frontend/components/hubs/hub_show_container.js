import { connect } from 'react-redux';
import * as HubActions from '../../actions/hub_actions';
import * as UserActions from '../../actions/user_actions';
import { getSingleHub, getCurrentUser, getMainImages } from '../../reducers/selectors';

import HubShow from './hub_show';

const mapStateToProps = (state, { params }) => {
	const hubId = parseInt(params.hubId)
	const hub = getSingleHub(state, hubId);
	const currentUser = getCurrentUser(state);
	const mainImages = getMainImages(state);
	return {
		hubId,
		hub,
		currentUser,
		mainImages
	};
};

const mapDispatchToProps = dispatch => ({
	requestCurrentUser: () => dispatch(UserActions.requestCurrentUser()),
	requestHub: (id) => dispatch(HubActions.requestHub(id)),
	updateHub: (obj) => dispatch(HubActions.updateHub(obj)),
	requestMainImages: () => dispatch(HubActions.requestMainImages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HubShow);