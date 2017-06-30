import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import hubsReducer from './hubs_reducer';
import usersReducer from './users_reducer';

const RootReducer = combineReducers({
  session: sessionReducer,
	hubs: hubsReducer,
	users: usersReducer
});

export default RootReducer;