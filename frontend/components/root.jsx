import React from 'react';
import { Provider } from 'react-redux';

// react router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './static_pages/home';
import SettingsContainer from './static_pages/settings_container';
import App from './app';
import CustomNav from './navigation/custom_nav';

import HubsContainer from './hubs/hubs_container';
import HubShowContainer from './hubs/hub_show_container'
import NewPhoto from './photographs/new_photo';
import EditUserContainer from './users/edit_user_container';

const Root = ({ store }) => {

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={HubsContainer}/>
         
					<Route path="/take_photo" component={NewPhoto} />
					<Route path="/hubs/:hubId" component={HubShowContainer} />
					<Route path="/edit_user" component={EditUserContainer} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;