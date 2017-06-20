class Api::PhotographsController < ApplicationController
  def index 
    @photographs = Photograph.all
    render json: {photographs: @photographs}
  end
  
  def create
    @photograph = Photograph.new(photograph_params)
    @photograph.user_id = current_user.id
  
    if @photograph.save
      render json: {photograph: @photograph}
    else
      flash[:errors] = "Unable to Save Photograph"
      render :new
    end
  end
  
  private
  
  def photograph_params
    params.require(:photograph).permit(:image)
  end
end
