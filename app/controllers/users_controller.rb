class UsersController < ApplicationController
  def switch

  end

  def logout
    reset_session
    redirect_to :root
  end
end
