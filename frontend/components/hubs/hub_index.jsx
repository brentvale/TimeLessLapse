import React from 'react';
import TakePhotoLink from '../shared/links/take_photo_link';

//COMPONENTS
import HubIndexListItem from './hub_index_list_item';

class HubIndex extends React.Component{
	constructor(){
		super();
	}
	componentDidMount(){
		this.props.requestHubs()
	}
	render(){
		let {hubs} = this.props;
		console.log(`hubs.length is ${hubs.length}`)
		if(hubs.length === 0){
			return (<div>
									<p>No Hubs Have Been Created Yet, Take a photo to create your first hub.</p>
									<TakePhotoLink />
				</div>);
		} else {
			return(
				<div>
					<TakePhotoLink />
					{hubs.map((hub) => {
						return <HubIndexListItem key={hub.id} hub={hub} klass="col-xs-12 col-md-6 align-center" onIndexView={true}/>
					})}
				</div>
			);
		}
	}
};

export default HubIndex;