import {receiveHubs, receiveHub} from '../actions/hub_actions';

export const fetchHubs = () => (
  $.ajax({
    method: 'GET',
    url: '/api/timelapse_hubs'
  })
);

export const fetchHub = (id) => (
  $.ajax({
    method: 'GET',
    url: `/api/timelapse_hubs/${id}`
  })
);

export const updateHub = ({hub, hubName}) => (
	$.ajax({
		url: `api/timelapse_hubs/${hub.id}`,
		method: 'PATCH',
		data: {
			timelapse_hub: {
				hub_name: hubName
			}
		}
	})
);
	


