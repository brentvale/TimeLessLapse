class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: [:home]
  def home
    @hub = TimelapseHub.find(5) #garden timelapse 2017
    @photographs = @hub.photographs.sort_by {|x| x.order_number}
    respond_to :html, :json
  end
  
  def new_hub_instructions
  end
end
