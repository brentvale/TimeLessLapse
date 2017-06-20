import { connect } from 'react-redux';

import HubIndex from './hub_index.jsx';


const mapStateToProps = ({ session }) => {
  // return {
  //   loggedIn: Boolean(session.currentUser),
  //   errors: session.errors
  // }
};

const mapDispatchToProps = (dispatch, { location }) => {
	//   const formType = location.pathname.slice(1);
	// const processForm = (formType === 'login') ? login : signup;
	//   return {
	//     processForm: user => dispatch(processForm(user)),
	// 	fbLogin: () => dispatch(facebookLogin()),
	//     formType
	//   };
};

export default connect(
  null,
  null
)(HubIndex);