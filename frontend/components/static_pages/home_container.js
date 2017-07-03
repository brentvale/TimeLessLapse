import { connect } from 'react-redux';

import {getHomeHub} from '../../reducers/selectors';
import * as HubActions from '../../actions/hub_actions';

import Home from './home';


const mapStateToProps = state => ({
	homeHub: getHomeHub(state)
});

const mapDispatchToProps = dispatch => ({
	requestHomeHub: () => dispatch(HubActions.requestHomeHub())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);