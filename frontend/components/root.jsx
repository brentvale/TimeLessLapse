import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Home from './static_pages/home';
import SettingsContainer from './static_pages/settings_container';
import App from './app';
import CustomNav from './navigation/custom_nav';

import HubsContainer from './hubs/hubs_container.js';
import NewPhoto from './photographs/new_photo.jsx';

const Root = ({ store }) => {

	let customNav = <CustomNav />;
	return(
    <Provider store={store}>
      <BrowserRouter>
				<div>
					
					<Route exact path="/" component={App} />
          <Route path="/your_hubs" component={HubsContainer} />
					<Route path="/take_photo" component={NewPhoto} />

				</div>
      </BrowserRouter>
    </Provider>
	);
};

export default Root;