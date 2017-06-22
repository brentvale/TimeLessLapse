import React from 'react';
import {Link} from 'react-router';

const TakePhotoLink = () => (
	<Link to="/take_photo">
		<div className="text-3d heading" >
			Take Photo >>
		</div>
	</Link>
);
export default TakePhotoLink;