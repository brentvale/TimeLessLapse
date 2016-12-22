class TimelapseHubsController < ApplicationController
  def index
  end

  def new
    @hub = TimelapseHub.new(timelapse_hub_params)
  end

  def create
    @hub = TimelapseHub.new(timelapse_hub_params)
    @hub.user_id = current_user.id
    if @hub.save
      last_photo = current_user.photographs.last
      last_photo.timelapse_hub_id = @hub.id
      last_photo.save
      
      redirect_to timelapse_hub_path(@hub)
    else
      flash[:errors] = "unable to save hub"
      render :new
    end
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
