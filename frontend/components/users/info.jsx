import React from 'react';

const UserInfo = ({currentUser}) => {
	
	const userNameDisplay = (currentUser.first_name && currentUser.last_name) ? `${currentUser.first_name} ${currentUser.last_name}`: currentUser.email;
	const tagLineDisplay = (currentUser.tag_line) ? currentUser.tag_line : "Add Tag Line";
	const websiteDisplay = (currentUser.website_url) ? <a href={currentUser.website_url}>{currentUser.website_url}</a> : "Add Website";
	
	return (
		<div className="page-block page-block-border page-block-padded center-block">
			<div style={{width: "500px"}} className="center-block">
		
				<div style={{marginBottom: "20px"}}>
					<div style={{display: "inline-block"}}>
						<i className="fa fa-user-circle-o hand-on-hover" aria-hidden="true"></i>
					</div>
		
					<div style={{paddingTop: "20px", width: "250px", display: "inline-block", marginLeft: "80px"}}>
						<div style={{width: "50%", display: "inline-block", textAlign:"center"}}>
							<p className="heading" style={{fontWeight: "700", fontSize: "1.2em"}}>{currentUser.total_hubs}</p>
							<p style={{color: "#767676"}}>hubs</p>
						</div>
						<div style={{width: "50%", display: "inline-block", textAlign:"center"}}>
							<p className="heading" style={{fontWeight: "700", fontSize: "1.2em"}}>{currentUser.total_photos}</p>
							<p style={{color: "#767676"}}>photos</p>
						</div>
						<div style={{width: "100%"}}>
							<button style={{width: "100%", textAlign: "center"}}>Edit Profile</button>
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