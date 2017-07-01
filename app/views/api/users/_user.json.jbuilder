json.extract! user, :id, :email, :name

json.total_hubs user.timelapse_hubs.length
json.total_photos user.photographs.length 
json.small_avatar user.avatar_url_small
json.thumbnail_avatar user.avatar_url_thumb