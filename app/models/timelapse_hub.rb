# == Schema Information
#
# Table name: timelapse_hubs
#
#  id                  :integer          not null, primary key
#  latitude            :string(15)       not null
#  longitude           :string(15)       not null
#  hub_name            :string
#  user_id             :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  first_photograph_id :integer
#

class TimelapseHub < ActiveRecord::Base
  has_many :photographs, dependent: :destroy
  belongs_to :user
  
  validates :hub_name, :longitude, :latitude, presence: true
  
  def save_first_photograph(photo_id)
    photo = Photograph.find(photo_id)
    photo.timelapse_hub_id = self.id
    photo.order_number = 1
    photo.save
  end
end
