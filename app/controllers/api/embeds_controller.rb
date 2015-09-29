class Api::EmbedsController < ApplicationController
  before_filter :set_cache_control_headers, only: :show
  before_action :authenticate_user!
  after_filter :set_csrf_cookie, except: :show

  def new
  end

  def create
    @embed = Embed.create({
      code: params[:code],
      user_id: current_user.id
    })
    render json: @embed.to_json
  end

  def index
  end

  def show
    @embed = Embed.find(params[:id])
    respond_to do |format|
      format.json { render json: @embed.to_json }
      format.html
    end
  end
end
