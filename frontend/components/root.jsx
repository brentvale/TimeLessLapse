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

import SessionFormContainer from './session_form/session_form_container';

const Root = ({ store }) => {

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  }
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={HubsContainer} />
         
					<Route path="/take_photo" component={NewPhoto} />
					<Route path="/hubs/:hubId" component={HubShowContainer} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;