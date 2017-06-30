import React from 'react';
import CustomNavContainer from './navigation/custom_nav_container';

const App = ({ children }) => (
  <div>
		<CustomNavContainer />
		<div style={{marginTop: "50px"}}>{children}</div>
    
  </div>
);

export default App;