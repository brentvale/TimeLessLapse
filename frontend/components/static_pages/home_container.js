import { connect } from 'react-redux';

import {getHomeHub, getLandingPageSprite} from '../../reducers/selectors';
import * as HubActions from '../../actions/hub_actions';

import Home from './home';


const mapStateToProps = state => ({
	homeHub: getHomeHub(state),
	landingPageSprite: getLandingPageSprite(state)
});

const mapDispatchToProps = dispatch => ({
	requestHomeHub: () => dispatch(HubActions.requestHomeHub()),
	requestHomeTimelapseSprite: () => dispatch(HubActions.requestHomeTimelapseSprite())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);