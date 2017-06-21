class Api::TimelapseHubsController < ApplicationController
  def index
    @hubs = current_user.timelapse_hubs.includes(:photographs)
    @photographs = {}
    @hubs.each do |hub|
      @photographs[hub.id] = hub.photographs
    end
    render :index
  end
  
  def show
    @hub = TimelapseHub.includes(:photographs).find(params[:id])
    @photographs = @hub.photographs
    render :show
  end
  
  private
  
  def timelapse_hub_params
    params.require(:timelapse_hub).permit(:latitude, :longitude, :hub_name, :user_id)
  end
end
