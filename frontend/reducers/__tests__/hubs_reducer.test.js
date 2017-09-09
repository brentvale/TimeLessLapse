import reducer from '../../reducers/hubs_reducer';
import * as types from '../../actions/hub_actions';

const hubs = {
								1: {id: 1, latitude: "37.4190166", longitude: "-121.7834331", hub_name: "Sunset Hub", user_id: 1, public: true},
								2: {id: 2, latitude: "37.4190166", longitude: "-121.7834331", hub_name: "SecondHub", user_id: 1, public: true},
						 };
const hub = {id: 1, latitude: "37.4190166", longitude: "-121.7834331", hub_name: "Sunset Hub", user_id: 1, public: true};
						 
describe('hubs reducer', () => {
  
  it('should handle RECEIVE_HUBS', () => {
    expect(
      reducer([], {
        type: types.RECEIVE_HUBS,
        hubs
      })
    ).toEqual(hubs)
  });
	
  it('should handle RECEIVE_HUB', () => {
		let expected = {1: hub};
    expect(
      reducer([], {
        type: types.RECEIVE_HUB,
        hub: hub
      })
    ).toEqual(expected)
  })
})