import React, {Component} from 'react';

import CustomNavContainer from './navigation/custom_nav_container';
import LanguageContainer from './language/language_container';


class App extends Component{
	constructor(){
		super();
		this.state = {
			activeLanguage: window.LANG_SELECTED || 0
		};
		this.updateActiveLanguage = this.updateActiveLanguage.bind(this);
	}
	
	updateActiveLanguage(num){
		let that = this;
		$.ajax({
			url: '/static_pages/update_session_language_id',
			method: 'POST',
			data: {
				static_pages: {
					language_id: num
				}
			},
			success: (resp) => {
				const targetId = parseInt(resp.language_id);
				window.LANG_SELECTED = targetId;
				that.setState({activeLanguage: targetId});
			},
			error: () => {
				console.log("unable to update active language");
			}
		});
	}
	
	render(){
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				selectedLanguage: this.state.activeLanguage
			})
    );
		
		return(
		  <div>
				<LanguageContainer updateActiveLanguage={this.updateActiveLanguage} selectedLanguage={this.state.activeLanguage}/>
				<CustomNavContainer selectedLanguage={this.state.activeLanguage}/>
				<div style={{marginTop: "50px"}}>{childrenWithProps}</div>
		  </div>
		)
	}
}

export default App;