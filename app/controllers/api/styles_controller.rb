class Api::StylesController < ApplicationController
  before_filter :set_cache_control_headers, only: :show
  before_action :authenticate_user!, except: :show
  after_filter :set_csrf_cookie, except: :show

  def index
    @styles = Style.all
    render json: @styles.to_json
  end

  def show
    @style = Style.find(params[:id])
    render json: @style.to_json
  end

  def create
    render nothing: true unless current_user.editor?
    @style = Style.create({
      rule: params[:rule],
      details: params[:details],
      keywords: params[:keywords],
      user_id: current_user.id,
    })
    render json: @style.to_json
  end

  def update
    @style = Style.find(params[:id])
    @style.update_attributes(
      rule: params[:rule],
      details: params[:details],
      keywords: params[:keywords],
    )
    render json: { success: true }
  end
end

