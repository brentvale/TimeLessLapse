class TimelapseHubsController < ApplicationController
  def index
  end

  def new
  end

  def create
  end

  def show
    @hub = TimelapseHub.find(params[:id])
    @photographs = @hub.photographs
    respond_to :html, :json
  end
  
  def destroy
  end
  
  private
  
  def timelapse_hub_params
    params.require(:timelapse_hub).permit(:latitude, :longitude, :hub_name, :user_id)
  end

end
