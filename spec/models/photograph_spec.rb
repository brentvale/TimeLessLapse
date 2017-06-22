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

require 'rails_helper'

RSpec.describe Photograph, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
