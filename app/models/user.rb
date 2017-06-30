# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  first_name             :string
#  last_name              :string
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default("0"), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  website_url            :string
#  tag_line               :string
#  avatar_file_name       :string
#  avatar_content_type    :string
#  avatar_file_size       :integer
#  avatar_updated_at      :datetime
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  has_many :timelapse_hubs
  has_many :photographs
  
  has_attached_file :avatar, 
    styles: { thumb: {geometry: "200x150>", auto_orient: true},
              small: {geometry: "400x300>", auto_orient: true},
              large: {geometry: "800x600>", auto_orient: true}
            },
    :convert_options => {:thumb => "-gravity center -extent 200x150",
                        :small => "-gravity center -extent 400x300",
                        :large => "-gravity center -extent 800x600"}
      
  validates :avatar, 
    attachment_content_type: {:content_type => ["image/jpg", "image/jpeg", "image/png"]},
    attachment_size: {less_than: 10.megabytes}
    
  #after_image_post_process :load_exif
  
  def image_url_small
    self.image.url(:small)
  end
  
  def image_url_thumb
    self.image.url(:thumb)
  end
end
