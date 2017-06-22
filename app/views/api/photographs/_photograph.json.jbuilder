json.extract! photograph, :id, :user_id, :created_at, :updated_at, :rotation, :latitude, :longitude, :altitude, :image_direction, :timelapse_hub_id 
json.datetime_digitized photograph.datetime_digitized.in_time_zone('Pacific Time (US & Canada)')
json.thumbnail_image photograph.image_url_thumb
json.small_image photograph.image_url_small
