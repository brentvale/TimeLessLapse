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

export const updateHub = ({hub, hubName}) => {
	return (
		$.ajax({
			url: `api/timelapse_hubs/${hub.id}`,
			method: 'PATCH',
			data: {
				timelapse_hub: {
					hub_name: hubName,
					public: hub.public
				}
			}
		})
	)
};

export const fetchLandingHub = () => (
  $.ajax({
    method: 'GET',
    url: '/static_pages/fetch_landing_hub'
  })
);
export const createNewHub = (formData) => (
	$.ajax({
		url: "api/timelapse_hubs",
		method: "POST",
		data: formData
	})
)
	

	

