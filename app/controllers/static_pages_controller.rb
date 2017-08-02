class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: [:home, 
                                              :fetch_landing_hub, 
                                              :fetch_main_images, 
                                              :demonstration, 
                                              :terms_of_service, 
                                              :payment_terms_of_service,
                                              :update_session_language_id]
  
  def home
  end
  
  def fetch_landing_hub
    @hub = TimelapseHub.find(14)
    @photographs = @hub.photographs.sort_by {|x| x.order_number}
    render 'api/timelapse_hubs/show'
  end
  
  def new_hub_instructions
  end
  
  def fetch_map_image
    render json: {image_url: ActionController::Base.helpers.asset_path('camera_image_32x32.png')}
  end
  
  def demonstration
    user_to_sign_in = User.where(email: "guest@example.com").first
    sign_in(:user, user_to_sign_in)
    redirect_to root_url
  end
  
  def terms_of_service
  end
  
  def payment_terms_of_service
  end
  
  def update_session_language_id
    session[:language_id] = strong_params
    render json: {language_id: session[:language_id][:language_id]}
  end
  
  private
  
  def strong_params
    params.require(:static_pages).permit(:language_id)
  end
  
end

