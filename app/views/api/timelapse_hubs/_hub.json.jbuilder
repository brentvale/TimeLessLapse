json.extract! hub, :id, :latitude, :longitude, :hub_name, :user_id, :public

json.photographs do 
	json.partial! 'api/photographs/photograph', collection: photographs, as: :photograph
end