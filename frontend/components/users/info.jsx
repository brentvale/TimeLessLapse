import React from 'react';

import { Link } from 'react-router';

const UserInfo = ({currentUser}) => {
	
	const userNameDisplay = (currentUser.name) ? `${currentUser.name}`: currentUser.email;
	const tagLineDisplay = (currentUser.tag_line) ? currentUser.tag_line : "Add Tag Line";
	const websiteDisplay = (currentUser.website_url) ? <a target="_blank" href={currentUser.website_url}>{currentUser.website_url}</a> : "Add Website";
	
	return (
		<div className="page-block page-block-border page-block-padded center-block">
			<div style={{width: "420px"}} className="center-block">
		
				<div style={{marginBottom: "20px"}}>
					<div style={{display: "inline-block"}}>
						<Link to={'/edit_user'}>
							<i className="fa fa-user-circle-o hand-on-hover small" aria-hidden="true"></i>
						</Link>
					</div>
		
					<div style={{paddingTop: "20px", width: "250px", display: "inline-block", marginLeft: "50px"}}>
						<div style={{width: "50%", display: "inline-block", textAlign:"center"}}>
							<p className="heading" style={{fontWeight: "700", fontSize: "1.2em"}}>{currentUser.total_hubs}</p>
							<p style={{color: "#767676"}}>hubs</p>
						</div>
						<div style={{width: "50%", display: "inline-block", textAlign:"center"}}>
							<p className="heading" style={{fontWeight: "700", fontSize: "1.2em"}}>{currentUser.total_photos}</p>
							<p style={{color: "#767676"}}>photos</p>
						</div>
						<div style={{width: "100%"}}>
							<Link to={"/edit_user"}>
								<div className="button button-create button-width-full hand-on-hover" style={{margin: "0"}}>Edit Profile</div>
							</Link>
						</div>
					</div>
				</div>
		
				<p className="heading" style={{fontWeight: "700"}}>{userNameDisplay}</p>
				<p className="heading">{tagLineDisplay}</p>
				<p className="heading">{websiteDisplay}</p>
			</div>
		</div>
	)	
}

export default UserInfo;