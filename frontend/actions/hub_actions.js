import * as util from '../util/hub_api_util';

export const RECEIVE_HUBS = "RECEIVE_HUBS";
export const RECEIVE_HUB = "RECEIVE_HUB";

//async actions
export function requestHubs(){
	return(dispatch) => {
		return util.fetchHubs().then(obj => dispatch(receiveHubs(obj)) );
	};
}

export function requestHub(id){
	return(dispatch) => {
		return util.fetchHub(id).then(obj => dispatch(receiveHub(obj)) );
	};
}

export function updateHub(hubObj){
	return(dispatch) => {
		return util.updateHub(hubObj).then(obj => dispatch(receiveHub(obj)) );
	}
}

export function requestHomeHub(){
	return(dispatch) => {
		return util.fetchLandingHub().then(obj => dispatch(receiveHub(obj)) );
	}
}

export function createNewHub(formData){
	return(dispatch) => {
		return util.createNewHub(formData).then(obj => dispatch(receiveHub(obj)) );
	}
}

//sync actions
export const receiveHubs = (obj) => ({
  type: RECEIVE_HUBS,
  hubs: obj
}); 

export const receiveHub = (obj) => ({
  type: RECEIVE_HUB,
  hub: obj
}); 