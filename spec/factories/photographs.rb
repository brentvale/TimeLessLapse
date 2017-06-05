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
#

FactoryGirl.define do
  factory :photograph do
    
  end
end
