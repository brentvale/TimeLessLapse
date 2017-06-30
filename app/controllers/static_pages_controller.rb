class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: [:home]
  def home
    # @hub = TimelapseHub.find(5) #garden timelapse 2017
#     @photographs = @hub.photographs.sort_by {|x| x.order_number}
#     respond_to :html, :json
  end
  
  def new_hub_instructions
  end
  
  def fetch_map_image
    render json: {image_url: ActionController::Base.helpers.asset_path('camera_image_32x32.png')}
  end
end
