class Api::TimelapseHubsController < ApplicationController
  before_action :authenticate_user!
  def index
    @hubs = current_user.timelapse_hubs.includes(:photographs)
    @photographs = {}
    @hubs.each do |hub|
      @photographs[hub.id] = hub.photographs.sort_by {|x| x.order_number}
    end
    render :index
  end
  
  def create
    @hub = TimelapseHub.new(timelapse_hub_params)
    @hub.user_id = current_user.id
    if @hub.save
      @hub.save_first_photograph(params[:timelapse_hub][:first_photograph_id])
      render json: @hub.id
    else
      render json: {message: "something went wrong server side creating a hub", errors: @hub.errors.full_messages}
    end
  end
  
  def show
    @hub = TimelapseHub.includes(:photographs).find(params[:id])
    @photographs = @hub.photographs.sort_by {|x| x.order_number}
    render :show
  end
  
  def update
    @hub = TimelapseHub.find(params[:id])
    if @hub.update_attributes(timelapse_hub_params)
      @photographs = @hub.photographs.sort_by {|x| x.order_number}
      render :show
    else
      render json: {message: "something went wrong server side updating a hub", errors: @hub.errors.full_messages}
    end
  end
  
  private
  
  def timelapse_hub_params
    params.require(:timelapse_hub).permit(:latitude, :longitude, :hub_name, :user_id, :first_photograph_id)
  end
end
