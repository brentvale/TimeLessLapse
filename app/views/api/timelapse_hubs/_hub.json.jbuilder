json.extract! hub, :id, :latitude, :longitude, :hub_name, :user_id

json.photographs do 
	json.partial! 'api/photographs/photograph', collection: hub.photographs, as: :photograph
end