class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: [:home, :fetch_landing_hub]
  
  def home
  end
  
  def fetch_landing_hub
    @hub = TimelapseHub.find(5)
    @photographs = @hub.photographs.sort_by {|x| x.order_number}
    render 'api/timelapse_hubs/show'
  end
  
  def new_hub_instructions
  end
  
  def fetch_map_image
    render json: {image_url: ActionController::Base.helpers.asset_path('camera_image_32x32.png')}
  end
  
end

