class Api::GoalsController < ApplicationController
  def index
    Quarter.initiate_quarters
    @quarters = Quarter.all
    render json: @quarters
  end

  def show
    puts params
    @goals = QuarterlyGoal.by_site_and_quarter(
      params[:site_id], params[:id]
    )
    render json: @goals
    # render json: ["hi", "bye"].to_json
  end

  def create
    puts params
    @goal = QuarterlyGoal.create_from_params(params)
    render json: @goal
  end
end

