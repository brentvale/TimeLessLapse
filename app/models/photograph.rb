# == Schema Information
#
# Table name: photographs
#
#  id                 :integer          not null, primary key
#  timelapse_hub_id   :integer          not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Photograph < ActiveRecord::Base
  belongs_to :timelapse_hub
  
  has_attached_file :image, 
    styles: { thumb: {geometry: "200x200>", auto_orient: true},
              small: {geometry: "400x400>", auto_orient: true},
              large: {geometry: "1000x1000>", auto_orient: true}
            },
    :convert_options => {:thumb => "-gravity center -extent 200x200",
                        :small => "-gravity center -extent 400x400",
                        :large => "-gravity center -extent 1000x1000"}
      
  validates_attachment :image, 
    content_type: { content_type: ["image/jpeg", "image/jpg"] },
    attachment_size: {less_than: 5.megabytes}
  
end
