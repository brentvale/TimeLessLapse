# == Schema Information
#
# Table name: timelapse_hubs
#
#  id         :integer          not null, primary key
#  latitude   :string(15)       not null
#  longitude  :string(15)       not null
#  hub_name   :string
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TimelapseHub < ActiveRecord::Base
  has_many :photographs
  belongs_to :user
end
