const getAllHubs = ({ hubs }) => {
	if(Object.keys(hubs).length === 0){
		return [];
	} else {
		return Object.keys(hubs).map(id => hubs[id]);
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

const getLandingPageImages = ({ hubs }) => {
	return hubs["landingPageImages"];
}

export { getAllHubs, getSingleHub, getCurrentUser, getHomeHub, getLandingPageImages};