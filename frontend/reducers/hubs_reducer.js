import * as HubActions from '../actions/hub_actions';
import merge from 'lodash/merge';

const hubsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case HubActions.RECEIVE_HUBS:
			newState = action.hubs;
			return newState;
    case HubActions.RECEIVE_HUB:
			newState[action.hub.id] = action.hub;
			return newState;
    default:
      return state;
  }
};

export default hubsReducer;