class UsersController < ApplicationController
  def logout
    reset_session
    redirect_to :root
  end
end
