class Api::GoalsController < ApplicationController
  after_filter :set_csrf_cookie, except: :show
  before_filter :is_manager, only: [:approve, :reject]
  before_filter :is_senior
  before_filter :is_editor, only: [:create, :update]

  def index
    Quarter.initiate_quarters
    @quarters = Quarter.all
    render json: @quarters
  end

  def show_quarter
    @goals = QuarterlyGoal.by_site_and_quarter(
      params[:site_name], params[:quarter_id]
    )
    render json: @goals
  end

  def show
    @goal = QuarterlyGoal.find(params[:id])
    render json: @goal
  end

  def create
    @goal = QuarterlyGoal.create_from_params(params)
    render json: @goal
  end

  def update
    @goal = QuarterlyGoal.find(params[:id])
    @goal.update_with_params(params)
    render json: @goal
  end

  def approve
    @goal = QuarterlyGoal.find(params[:id])
    @goal.approve(current_user)
    render json: @goal
  end

  def reject
    @goal = QuarterlyGoal.find(params[:id])
    @goal.reject(current_user, params[:message])
    render json: @goal
  end
end
