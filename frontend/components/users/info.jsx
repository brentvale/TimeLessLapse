import React from 'react';

const UserInfo = ({currentUser}) => {
	return (
		<div className="page-block page-block-border center-block">
			<div></div>
			<i className="fa fa-user-circle-o" aria-hidden="true"></i>
			{currentUser.email}
		</div>
	)	
}

export default UserInfo;