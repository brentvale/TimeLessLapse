import { connect } from 'react-redux';

import {getHomeHub, getLandingPageImages} from '../../reducers/selectors';
import * as HubActions from '../../actions/hub_actions';

import Home from './home';


const mapStateToProps = state => ({
	homeHub: getHomeHub(state),
	landingPageImages: getLandingPageImages(state)
});

const mapDispatchToProps = dispatch => ({
	requestHomeHub: () => dispatch(HubActions.requestHomeHub()),
	requestHomeTimelapseSprite: () => dispatch(HubActions.requestHomeTimelapseSprite())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);