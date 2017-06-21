import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import hubsReducer from './hubs_reducer';

const RootReducer = combineReducers({
  session: sessionReducer,
	hubs: hubsReducer
});

export default RootReducer;