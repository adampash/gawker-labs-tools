class Api::UsersController < ApplicationController
  def autocomplete
    if params[:query] == ''
      @users = []
    else
      @users = User.where("email LIKE ?", "%#{params[:siteName]}.com")
        .where("LOWER(name) LIKE ?", "%#{params[:query].downcase}%")
    end
    render json: @users
  end
end

