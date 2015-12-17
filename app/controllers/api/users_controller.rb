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

  def check_for_goal
    @goal = QuarterlyGoal.find_by(
      person_id: params[:id],
      quarter_id: params[:quarter_id],
     )
    render json: @goal
  end

  def prev_quarter
    @user = User.find(params[:id])
    @goal = @user.previous_goal(params[:quarter_id].to_i)
    render json: @goal
  end
end

