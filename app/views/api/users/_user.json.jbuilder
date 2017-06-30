json.extract! user, :id, :email, :first_name, :last_name

json.total_hubs user.timelapse_hubs.length
json.total_photos user.photographs.length 