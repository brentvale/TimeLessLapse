import { connect } from 'react-redux';

import {getHomeHub, getMainImages} from '../../reducers/selectors';
import * as HubActions from '../../actions/hub_actions';

import Home from './home';


const mapStateToProps = (state, ownProps) => {
	return {
		homeHub: getHomeHub(state),
		mainImages: getMainImages(state),
		selectedLanguage: ownProps.selectedLanguage
	}
};

const mapDispatchToProps = dispatch => ({
	requestHomeHub: () => dispatch(HubActions.requestHomeHub())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);