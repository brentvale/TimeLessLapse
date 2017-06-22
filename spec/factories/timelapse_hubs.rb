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

FactoryGirl.define do
  factory :timelapse_hub do
    
  end
end
