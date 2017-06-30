class Api::UsersController < ApplicationController
  def current_logged_in_user
    @current_user = current_user
    if @current_user.nil?
      render json: nil
    else
      render :show
    end
    
  end
end
