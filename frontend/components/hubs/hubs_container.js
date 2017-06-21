import { connect } from 'react-redux';
import * as HubActions from '../../actions/hub_actions';
import { getAllHubs } from '../../reducers/selectors';

import HubIndex from './hub_index';


const mapStateToProps = state => ({
	hubs: getAllHubs(state)
});

const mapDispatchToProps = dispatch => ({
  requestHubs: () => dispatch(HubActions.requestHubs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HubIndex);