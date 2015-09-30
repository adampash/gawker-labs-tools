class Api::EmbedsController < ApplicationController
  before_filter :set_cache_control_headers, only: :show
  before_action :authenticate_user!, except: :show
  after_filter :set_csrf_cookie, except: :show
  after_action :allow_iframe, only: :show
  layout 'iframe', only: :show

  def index
    @embeds = current_user.latest_embeds
    render json: @embeds.to_json
  end

  def new
  end

  def create
    puts params
    @embed = Embed.create({
      code: params[:code],
      name: params[:name],
      user_id: current_user.id
    })
    render json: @embed.to_json
  end

  def show
    @embed = Embed.find(params[:id])
    respond_to do |format|
      format.json { render json: @embed.to_json }
      format.html
    end
  end

  private
  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end
