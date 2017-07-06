const getAllHubs = ({ hubs }) => {
	if(Object.keys(hubs).length === 0){
		return [];
	} else {
		let arrayedHubs = [];
		for(let i = 0; i < Object.keys(hubs).length; i ++){
			if(Object.keys(hubs)[i] !== "mainImages"){
				arrayedHubs.push(hubs[Object.keys(hubs)[i]])
			}
		}
		return arrayedHubs;
	}
};

const getSingleHub = ({ hubs }, hubId) => {
	return hubs[hubId];
}

const getCurrentUser = ({ users }) => {
	return users.currentUser;
}

const getHomeHub = ({ hubs }) => {
	return hubs[5];
}

const getMainImages = ({ hubs }) => {
	return hubs["mainImages"];
}

export { getAllHubs, getSingleHub, getCurrentUser, getHomeHub, getMainImages};