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

export { getAllHubs, getSingleHub, getCurrentUser };