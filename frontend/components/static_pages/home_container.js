import { connect } from 'react-redux';

import {getHomeHub, getMainImages} from '../../reducers/selectors';
import * as HubActions from '../../actions/hub_actions';

import Home from './home';


const mapStateToProps = state => ({
	homeHub: getHomeHub(state),
	mainImages: getMainImages(state)
});

const mapDispatchToProps = dispatch => ({
	requestHomeHub: () => dispatch(HubActions.requestHomeHub()),
	requestMainImages: () => dispatch(HubActions.requestMainImages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);