import { connect } from 'react-redux';

import { facebookLogin } from '../../actions/session_actions';
import FacebookLoginButton from './facebook_login_button';


const mapStateToProps = ({  }) => {
};

const mapDispatchToProps = dispatch => ({
	fbLogin: () => dispatch(facebookLogin())
});

export default connect(
  null,
  mapDispatchToProps
)(FacebookLoginButton);