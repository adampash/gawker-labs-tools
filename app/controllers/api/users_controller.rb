class Api::UsersController < ApplicationController
  after_filter :set_csrf_cookie

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

