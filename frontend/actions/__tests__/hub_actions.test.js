import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../hub_actions';
import nock from 'nock';
import expect from 'expect';
import sinon from 'sinon';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const hubs = {
								1: {id: 1, latitude: "37.4190166", longitude: "-121.7834331", hub_name: "Sunset Hub", user_id: 1, public: true},
								2: {id: 2, latitude: "37.4190166", longitude: "-121.7834331", hub_name: "SecondHub", user_id: 1, public: true},
						 };
						 
// describe('async actions', () => {
//   afterEach(() => {
//     nock.cleanAll();
// 		$.ajax.restore();
//   })
//
//   it('makes a GET request for hubs', () => {
// 		sinon.stub($, 'ajax');
// 		actions.fetchHubs(sinon.spy());
//
// 		expect($.ajax.calledWithMatch({ url: 'api/timelapse_hubs'}));
//   })
// })

describe('sync actions', () => {
	it('should create an action to receive a hub', () => {
		const hub = {id: 1, latitude: "37.4190166", longitude: "-121.7834331", hub_name: "Sunset Hub", user_id: 1, public: true};
		const expectedAction = {
			type: actions.RECEIVE_HUB,
			hub: hub
		}
		expect(actions.receiveHub(hub)).toEqual(expectedAction);
	});
	
	it('should create an action to receive multiple hubs', () => {
		const expectedAction = {
			type: actions.RECEIVE_HUBS,
			hubs: hubs
		}
		expect(actions.receiveHubs(hubs)).toEqual(expectedAction);
	});
});