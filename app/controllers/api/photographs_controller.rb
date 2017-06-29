class Api::PhotographsController < ApplicationController
  before_action :authenticate_user!
  def index 
    @photographs = Photograph.all
    render :index
  end
  
  def create
    @photograph = Photograph.new(photograph_params)
    @photograph.user_id = current_user.id
    
    unless params[:photograph][:datetime_digitized] == "unknown"
      @photograph.datetime_digitized = DateTime.strptime(params[:photograph][:datetime_digitized], "%Y:%m:%d %H:%M:%S")
    end
    
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
  
  def destroy
    photograph = Photograph.find(params[:id])
    photograph.destroy
    render json: {photograph: photograph}
  end
  
  private
  
  def photograph_params
    params.require(:photograph).permit(:image, :timelapse_hub_id, :latitude, :longitude, :datetime_digitized, :altitude, :image_direction)
  end
end
