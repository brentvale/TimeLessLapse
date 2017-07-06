class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: [:home, :fetch_landing_hub, :fetch_main_images]
  
  def home
  end
  
  def fetch_landing_hub
    @hub = TimelapseHub.find(5)
    @photographs = @hub.photographs.sort_by {|x| x.order_number}
    render 'api/timelapse_hubs/show'
  end
  
  def fetch_main_images
    render json: {mountain_silhouette_url: ActionController::Base.helpers.asset_path('mountain_silhouette.png'),
                  camera_url: ActionController::Base.helpers.asset_path('tripod_with_camera_silhouette.png'),
                  finger_print_url: ActionController::Base.helpers.asset_path('finger_print.png')}
  end
  
  def new_hub_instructions
  end
  
  def fetch_map_image
    render json: {image_url: ActionController::Base.helpers.asset_path('camera_image_32x32.png')}
  end
  
end

