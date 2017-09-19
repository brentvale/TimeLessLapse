# == Schema Information
#
# Table name: photographs
#
#  id                 :integer          not null, primary key
#  timelapse_hub_id   :integer
#  user_id            :integer          not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  rotation           :integer          default("0"), not null
#  latitude           :string
#  longitude          :string
#  altitude           :string
#  image_direction    :string
#  order_number       :integer
#  datetime_digitized :datetime
#

class Photograph < ActiveRecord::Base
  belongs_to :timelapse_hub
  
  has_attached_file :image, 
    styles: { thumb: {geometry: "200x150>", auto_orient: true},
              small: {geometry: "400x300>", auto_orient: true},
              large: {geometry: "800x600>", auto_orient: true}
            },
    :convert_options => {:thumb => "-gravity center -extent 200x150 -quality 50",
                        :small => "-gravity center -extent 400x300 -quality 50",
                        :large => "-gravity center -extent 800x600 -quality 50"}
      
  validates :image, 
    attachment_content_type: {:content_type => ["image/jpg", "image/jpeg", "image/png"]},
    attachment_size: {less_than: 10.megabytes}
    
  #after_image_post_process :load_exif
  
  def image_url_large
    self.image.url(:large)
  end
  
  def image_url_small
    self.image.url(:small)
  end
  
  def image_url_thumb
    self.image.url(:thumb)
  end
  
  def load_exif
    exif = EXIFR::JPEG.new(self.image.queued_for_write[:original])
    if exif.nil?
      return
    end

    self.latitude = exif.exif.gps.latitude.to_s
    self.longitude = exif.exif.gps.longitude.to_s
    self.altitude = exif.exif.gps.altitude.to_s
    self.image_direction = exif.exif.gps.image_direction.to_s
    self.datetime_digitized = exif.exif.date_time_digitized.to_datetime
    
    #EXIF DATA
# {
# :make => "Apple",
# :model => "iPhone 6s Plus",
# :orientation => #<EXIFR::TIFF::Orientation:TopLeft(1)>,
# :x_resolution => 72/1,
# :y_resolution => 72/1,
# :resolution_unit => 2,
# :software => "10.3.2",
# :date_time => 2017-06-01 10:00:39 -0700,
# :ycb_cr_positioning => 1,
# :exposure_time => 1/1399,
# :f_number => 11/5,
# :exposure_program => 2,
# :iso_speed_ratings => 25,
# :date_time_original => 2017-06-01 10:00:39 -0700,
# :date_time_digitized => 2017-06-01 10:00:39 -0700,
# :shutter_speed_value => 1/1398,
# :aperture_value => 2.2,
# :brightness_value => 982/95,
# :exposure_bias_value => 0/1,
# :metering_mode => 5,
# :flash => 24,
# :focal_length => 83/20,
# :subject_area => [
# [0] 2015,
# [1] 1511,
# [2] 2217,
# [3] 1330
# ],
# :subsec_time_original => "777",
# :subsec_time_digitized => "777",
# :color_space => 1,
# :pixel_x_dimension => 4032,
# :pixel_y_dimension => 3024,
# :sensing_method => 2,
# :exposure_mode => 0,
# :white_balance => 0,
# :focal_length_in_35mm_film => 29,
# :scene_capture_type => 0,
# :gps_latitude_ref => "N",
# :gps_latitude => [
# [0] 37/1,
# [1] 25/1,
# [2] 1731/100
# ],
# :gps_longitude_ref => "W",
# :gps_longitude => [
# [0] 121/1,
# [1] 45/1,
# [2] 1917/50
# ],
# :gps_altitude_ref => "\x00",
# :gps_altitude => 459345/626,
# :gps_time_stamp => [
# [0] 17/1,
# [1] 0/1,
# [2] 39/1
# ],
# :gps_speed_ref => "K",
# :gps_speed => 0/1,
# :gps_img_direction_ref => "T",
# :gps_img_direction => 50178/215,
# :gps_dest_bearing_ref => "T",
# :gps_dest_bearing => 50178/215,
# :gps_date_stamp => "2017:06:01"
# }
  end

end
