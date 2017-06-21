class Api::PhotographsController < ApplicationController
  def index 
    @photographs = Photograph.all
    render :index
  end
  
  def create
    @photograph = Photograph.new(photograph_params)
    @photograph.user_id = current_user.id
  
    if @photograph.save
      render :show
    else
      render json: {message: "Unable to Save Photograph"}
    end
  end
  
  def update
    @photograph = Photograph.find(params[:id])
    hub = TimelapseHub.includes(:photographs).find(params[:photograph][:timelapse_hub_id])
    photo_order_number = hub.photographs.length + 1
    @photograph.order_number = photo_order_number
    
    if @photograph.update_attributes(photograph_params)
      render :show
    else
      render json: {message: "Unable to Update Photograph"}
    end
  end
  
  private
  
  def photograph_params
    params.require(:photograph).permit(:image, :timelapse_hub_id)
  end
end
