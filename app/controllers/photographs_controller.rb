class PhotographsController < ApplicationController
  def new
    @photograph = Photograph.new
    @hubs = current_user.timelapse_hubs
  end

  def create
    @photograph = Photograph.new(photograph_params)
    @photograph.user_id = current_user.id

    photo = EXIFR::JPEG.new(photograph_params[:image])
    @photograph.latitude = photo.gps.latitude.to_s
    @photograph.longitude = photo.gps.longitutde.to_s
    
    if @photograph.save
      redirect_to set_location_photograph_path(@photograph)
    else
      flash[:errors] = "Unable to Save Photograph"
      render :new
    end
  end
  
  def set_location
      @photograph = Photograph.find(params[:id])
      @photograph_coords = @photograph.latitude.concat("***").concat(@photograph.longitude)
      @hubs = current_user.timelapse_hubs.map{|x| "#{x.hub_name}***#{x.latitude}***#{x.longitude}***#{x.id}"}
    end
  
  def update
    @photograph = Photograph.find(params[:id])
    if @photograph.update_attributes(photograph_params)
      render json: {photograph: @photograph}
    else
      render json: {message: "something went wrong"}
    end
  end
  
  private
  
  def photograph_params
    params.require(:photograph).permit(:timelapse_hub_id, :image)
  end

end
