import { connect } from 'react-redux';
import * as HubActions from '../../actions/hub_actions';
import { getAllHubs } from '../../reducers/selectors';

import SelectHub from './select_hub';


const mapStateToProps = (state, ownProps) => {
	return {
		hubs: getAllHubs(state),
		selectedLanguage: ownProps.selectedLanguage,
		photograph: ownProps.photograph
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	createNewHub: (formData) => dispatch(HubActions.createNewHub(formData)),
	handleSelectHub: (obj) => ownProps.handleSelectHub(obj),
	requestHubs: () => dispatch(HubActions.requestHubs()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectHub);