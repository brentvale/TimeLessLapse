import { connect } from 'react-redux';
import * as HubActions from '../../actions/hub_actions';
import { getSingleHub } from '../../reducers/selectors';

import HubShow from './hub_show';


const mapStateToProps = (state, { params }) => {
	const hubId = parseInt(params.hubId)
	const hub = getSingleHub(state, hubId);
	return {
		hubId,
		hub
	};
};

const mapDispatchToProps = dispatch => ({
	requestHub: (id) => dispatch(HubActions.requestHub(id)),
	updateHub: (obj) => dispatch(HubActions.updateHub(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HubShow);